import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { StoreData } from "../../types/types";
import fetchData from "../../services/data";
import preFetchPage from "../../services/preFetch";
import searchPeopleName from "../../services/searchName";
import transformData from "../../services/data - Copy";

const initialState: StoreData = {
  state: "idle",
  currentPage: 1,
  data: {},
  searchResults: [],
};

const getData = createAsyncThunk("people/getData", async (page: number) => {
  const response = await fetchData(page);
  if (page + 1 <= 9) preFetchPage(page + 1);
  return {
    page: String(page),
    data: response,
  };
});

const searchName = createAsyncThunk(
  "people/searchTerm",
  async (search: string) => {
    const response = await searchPeopleName(search);
    const output = await transformData(response);
    return output;
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.state = "idle";
        state.data[action.payload.page] = action.payload.data;
      })
      .addCase(getData.pending, (state) => {
        state.state = "loading";
      })
      .addCase(getData.rejected, (state) => {
        state.state = "failed";
      })
      .addCase(searchName.fulfilled, (state, action) => {
        state.state = "idle";
        state.searchResults = action.payload;
      })
      .addCase(searchName.pending, (state) => {
        state.state = "loading";
      })
      .addCase(searchName.rejected, (state) => {
        state.state = "failed";
      });
  },
});

export { getData, searchName };

export const { setCurrentPage } = peopleSlice.actions;

export default peopleSlice.reducer;
