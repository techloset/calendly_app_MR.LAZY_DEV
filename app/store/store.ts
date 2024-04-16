import { configureStore } from "@reduxjs/toolkit";
import selectedDateTimeSliceReducer from "./slice/selectedDateTimeSlice";
import userReducer from "./slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    selectedDateTime: selectedDateTimeSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
