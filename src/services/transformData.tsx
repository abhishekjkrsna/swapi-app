import fetchSpecies from "./species";
import fetchHome from "./homeworld";
import type { People, Homeworld, CardData } from "../types/types";
import getBackgroundColor from "./color";

/**
 * Formats a date string into "dd-MM-yyyy"
 */
function formatDate(dateString: string): string {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-GB").replace(/\//g, "-");
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return "N/A";
  }
}

/**
 * Extracts the species ID from a SWAPI person object.
 * Returns 1 if no species URL is found.
 */
function getSpeciesId(species: string[]): number {
  // 1. Check if the 'species' array exists and has at least one entry.
  if (species && species.length > 0) {
    const speciesUrl = species[0];

    try {
      // 2. Split the URL by '/' and remove empty strings
      const parts = speciesUrl.split("/").filter(Boolean);

      // 3. Get the last part of the URL, which is the ID.
      const idStr = parts[parts.length - 1];

      // 4. Convert the ID to a number
      const id = parseInt(idStr, 10);

      // 5. Check if the conversion was successful (not NaN)
      if (!isNaN(id)) {
        return id;
      }
    } catch (error) {
      // If any part of the process fails, fall through to the default.
      console.error("Could not parse species URL:", error);
    }
  }
  // 6. Default: If any check fails, return 1.
  return 1;
}

/**
 * Transforms the raw person data from the API into our clean People type
 */
function transformPerson(person: any, species: string): People {
  const speciesId = getSpeciesId(person.species ?? []);
  // Fixed bug: 'gender' variable was declared but not used.
  const gender = ["male", "female"].includes(person.gender)
    ? person.gender
    : "unknown";

  return {
    name: person.name ?? "N/A",
    height: person.height ?? "N/A",
    mass: person.mass ?? "N/A",
    dateAdded: formatDate(person.created),
    numberOfFilms: (person.films?.length ?? 0).toString(),
    birthYear: person.birth_year ?? "N/A",
    homeworld: person.homeworld ?? "N/A",
    gender: gender,
    species: species,
    bgColor: getBackgroundColor(speciesId),
  };
}

// Define a default/error state for homeworld
const defaultHomeworld: Homeworld = {
  name: "Unknown",
  climate: "N/A",
  terrain: "N/A",
  population: "N/A",
};

export default async function transformData(
  peopleResults: any[]
): Promise<CardData[]> {
  // 3. Create arrays of promises for *all* external data
  const homeworldPromises = peopleResults.map((person) =>
    fetchHome(person.homeworld)
  );

  const speciesPromises = peopleResults.map((person) => {
    if (person.species && person.species.length > 0) {
      return fetchSpecies(person.species[0]);
    }
    // Return a promise that resolves to a default species "object"
    return Promise.resolve({ name: "Unknown" });
  });

  // 4. Wait for all promises to settle in parallel
  const [homeworldSettledResults, speciesSettledResults] = await Promise.all([
    Promise.allSettled(homeworldPromises),
    Promise.allSettled(speciesPromises),
  ]);

  // 5. Process the results by mapping over the original people list
  const output: CardData[] = await Promise.all(
    peopleResults.map(async (personResult, index) => {
      // Get species name from settled result
      const speciesResult = speciesSettledResults[index];
      let speciesName = "Unknown";
      if (speciesResult.status === "fulfilled" && speciesResult.value) {
        speciesName = speciesResult.value.name ?? "Unknown";
      } else if (speciesResult.status === "rejected") {
        console.error(
          `Failed to fetch species for ${personResult.name}:`,
          speciesResult.reason
        );
      }

      // Transform person
      const people = transformPerson(personResult, speciesName);

      // Get homeworld from settled result
      const homeworldResult = homeworldSettledResults[index];
      let homeworld: Homeworld;

      if (homeworldResult.status === "fulfilled") {
        const data = homeworldResult.value;
        homeworld = {
          name: data.name ?? "N/A",
          climate: data.climate ?? "N/A",
          terrain: data.terrain ?? "N/A",
          population: data.population ?? "N/A",
        };
      } else {
        console.error(
          `Failed to fetch homeworld for ${people.name}:`,
          homeworldResult.reason
        );
        homeworld = defaultHomeworld;
      }

      // Combine into the final CardData object
      return {
        people: people,
        homeworld: homeworld,
      };
    })
  );

  return output;
}
