import { configureStore } from "@reduxjs/toolkit";
import lettresReducer from "./lettres.slice.js";
export const store = configureStore({
  reducer: {
    lettres: lettresReducer,
  },
});
