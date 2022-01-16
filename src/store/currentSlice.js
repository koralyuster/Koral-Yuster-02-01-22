import { createSlice } from '@reduxjs/toolkit';

const currentSlice = createSlice({
  name: 'current',
  initialState: { details: {}, five: [] },
  reducers: {
    currentWeather(state, action) {
      state.details = action.payload;
    },
    fiveDaysWeather(state, action) {
      state.five = action.payload;
    }
  }
});

export const currentActions = currentSlice.actions;

export default currentSlice;