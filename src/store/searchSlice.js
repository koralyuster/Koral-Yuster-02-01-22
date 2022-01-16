import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: { chosenFavoriteCity: '', optionsSearch: [] },
  reducers: {
    searchWeather(state, action) {
      state.optionsSearch = action.payload.optionsSearch;
    },
    setChosenFavorite(state, action) {
      state.chosenFavoriteCity = action.payload;
    }
  }
});

export const searchActions = searchSlice.actions;

export default searchSlice;