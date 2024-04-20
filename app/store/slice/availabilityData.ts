import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AvailabilityData {
  selectedDays: string[];
  selectedHour1: string;
  selectedHour2: string;
}

interface SliceState {
  data: AvailabilityData | null;
  loading: boolean;
  error: string | null;
}

const initialState: SliceState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAvailabilityData = createAsyncThunk(
  "scheduleEventsData/fetchScheduleEvents",
  async () => {
    try {
      const response = await axios.get("/api/getAvailability");
      const result: AvailabilityData = response.data;
      return result;
    } catch (error) {
      throw error;
    }
  }
);

const fetchScheduleEventsSlice = createSlice({
  name: "availabilityData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailabilityData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailabilityData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAvailabilityData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default fetchScheduleEventsSlice.reducer;
