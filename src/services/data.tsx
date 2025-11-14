import fetchPeople from "./people";
import transformData from "./data - Copy";
import type { CardData } from "../types/types";

// Create a cache outside the function scope
const cache = new Map<number, any>();

export default async function fetchData(pageNum: number): Promise<CardData[]> {
  // 1. Check if the data is already in the cache
  if (cache.has(pageNum)) {
    return cache.get(pageNum);
  }

  // 2. Fetch the list of people
  const peopleData = await fetchPeople(pageNum);
  const peopleResults: any[] = peopleData.results;

  const output = transformData(peopleResults);
  cache.set(pageNum, output);

  return output;
}
