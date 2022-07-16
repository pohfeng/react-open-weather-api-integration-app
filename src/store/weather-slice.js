import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weatherInfo: {},
  hasError: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    SET_WEATHER_INFO(state, action) {
      state.weatherInfo = action.payload;
    },
    SET_HAS_ERROR(state, action) {
      state.hasError = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
