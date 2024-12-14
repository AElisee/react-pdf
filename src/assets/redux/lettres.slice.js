import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3005/lettres";

const initialState = {
  isloading: false,
  isError: false,
  errorMessage: "",
  lettresData: [],
};

export const lettresSlice = createSlice({
  name: "lettres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ajouterLettre.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(ajouterLettre.fulfilled, (state, { payload }) => {
        state.isloading = false;
        state.lettresData.push(payload);
      })
      .addCase(ajouterLettre.rejected, (state, { payload }) => {
        state.isloading = false;
        state.isError = true;
        state.errorMessage = payload || "Une erreur inconnue s'est produite";
      })
      .addCase(fetchLettre.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchLettre.fulfilled, (state, { payload }) => {
        state.isloading = false;
        state.lettresData = payload;
      })
      .addCase(fetchLettre.rejected, (state, { payload }) => {
        state.isloading = false;
        state.isError = true;
        state.errorMessage = payload || "Une erreur inconnue s'est produite";
      });
  },
});

// ajouter
export const ajouterLettre = createAsyncThunk(
  "lettre/ajout",
  async (newData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}`, newData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'enregistrement";
      console.error("Erreur ajouterLettre:", error.message);
      return rejectWithValue(errorMessage);
    }
  }
);

// fetch
export const fetchLettre = createAsyncThunk(
  "lettre/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la récupération des données";
      console.error("Erreur fetchLettre:", error.message);
      return rejectWithValue(errorMessage);
    }
  }
);

export default lettresSlice.reducer;
