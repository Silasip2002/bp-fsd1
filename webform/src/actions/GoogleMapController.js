import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const GoogleMapSlice = createSlice({
  name: "googleMap",
  initialState: {
    mapCenter: {},
  },
  reducers: {
    setMapCenter: (state, payload) => {
      console.log("In the map controller  ");
      console.log(payload.payload);
      state.mapCenter = payload.payload;
    },
    getMapCenter: (state) => {
      return state.mapCenter;
    },
  },
});

export const { setMapCenter, getMapCenter } = GoogleMapSlice.actions;

export default GoogleMapSlice.reducer;
