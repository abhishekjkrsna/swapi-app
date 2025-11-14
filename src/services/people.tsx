import axios from "axios";
import { swapiBaseUrl } from "../config/config";

// Create a cache outside the function scope
const cache = new Map<string, any>();

/*
Function to fetch people data from SWAPI with caching mechanism.
- Checks if the requested page data is already in the cache.
- If cached, returns the cached data.
- If not cached, fetches from the API, stores it in the cache, and then returns it.
Parameters:
- page (number): The page number to fetch (default is 1).
Returns:
- Promise<any>: A promise that resolves to the people data.
*/
export default async function fetchPeople(page: number = 1) {
  try {
    const url = `${swapiBaseUrl}/people/?page=${page}`;

    if (cache.has(url)) {
      return cache.get(url);
    }

    const response = await axios.get(url);

    cache.set(url, response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching people data:", error);
    return { results: [] };
  }
}
