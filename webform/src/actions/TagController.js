import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const api_url = process.env.REACT_APP_API_URL;

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    selectedTag: 0,
  },
  reducers: {
    setSelectedTag: (state, payload) => {
      state.selectedTag = payload.payload;
    },
    getSelectedTag: (state) => {
      return state.selectedTag;
    },
  },
});

export const { setSelectedTag, getSelectedTag } = tagSlice.actions;

export default tagSlice.reducer;
