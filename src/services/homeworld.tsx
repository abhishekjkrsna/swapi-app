import axios from "axios";

// Create a cache outside the function scope
const cache = new Map<string, any>();

export default async function fetchHome(homeWorldUrl: string) {
  try {
    const url = `${homeWorldUrl}`;

    // if empty url, return null
    if (!url) {
      return {};
    }

    // 1. Check if the data is already in the cache
    if (cache.has(url)) {
      return cache.get(url);
    }

    // 2. If not in cache, fetch from API
    const response = await axios.get(url);

    // 3. Store the new data in the cache
    cache.set(url, response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching people data:", error);
    return {};
  }
}
