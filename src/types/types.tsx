interface People {
  name: string;
  height: string;
  mass: string;
  dateAdded: string;
  numberOfFilms: string;
  birthYear: string;
  homeworld: string;
  gender: string;
  species: string;
  bgColor: string;
}

interface Homeworld {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

interface CardData {
  people: People;
  homeworld: Homeworld;
}

interface StoreData {
  state: "loading" | "idle" | "failed";
  currentPage: number;
  data: {
    [page: string]: CardData[];
  };
  searchResults?: CardData[];
}

export type { People, Homeworld, CardData, StoreData };
