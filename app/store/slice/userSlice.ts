import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

export interface UserData {
  id: string;
  image: string;
  name: string;
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
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserDataStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserDataSuccess: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchUserDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearUserData(state) {
      state.userData = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  clearUserData,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
