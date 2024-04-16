import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedDateTime {
  date: string | null;
  time: string | null;
  timeZone: string | null;
}

const initialState: SelectedDateTime = {
  date: null,
  time: null,
  timeZone: null,
};

const selectedDateTimeSlice = createSlice({
  name: "selectedDateTime",
  initialState,
  reducers: {
    setSelectedDateTime: (state, action: PayloadAction<SelectedDateTime>) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
      state.timeZone = action.payload.timeZone;
    },
  },
});

export const { setSelectedDateTime } = selectedDateTimeSlice.actions;
export default selectedDateTimeSlice.reducer;
