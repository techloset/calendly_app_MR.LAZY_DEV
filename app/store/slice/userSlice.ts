import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

export interface UserData {
  id: string;
  image: string;
  createdAt: string;
  hashPassword: string;
  updatedAt: string;
  userName: string;
  fullName: string;
  email: string;
  welcomeMessage: string;
  language: string;
  dateFormat: string;
  country: string;
  timeFormat: string;
  timeZone: string;
}

export interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const response = await axios.get("/api/getProfileCollection");
      const result: UserData = response.data;
      return result;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default userSlice.reducer;
