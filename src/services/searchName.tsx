import axios from "axios";
import { swapiBaseUrl } from "../config/config";

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
export default async function searchPeopleName(name: string) {
  try {
    const url = `${swapiBaseUrl}people/?search=${name}`;
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error searching people data:", error);
    return { results: [] };
  }
}
