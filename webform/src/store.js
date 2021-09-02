import { configureStore } from "@reduxjs/toolkit";
import tagController from "../src/actions/TagController";
import GoogleMapController from "./actions/GoogleMapController";

export default configureStore({
  reducer: {
    tag: tagController,
    googleMap: GoogleMapController,
  },
});
