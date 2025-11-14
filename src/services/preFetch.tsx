import fetchData from "./data";

/*
Function to pre-fetch data for all pages from 1 to 9.
- Iterates from page 1 to 9.
- Calls fetchPeople for each page to cache the data.
- Logs a message indicating that pre-fetching is complete.
*/
export default function preFetchPage(page: number) {
  fetchData(page);
}
