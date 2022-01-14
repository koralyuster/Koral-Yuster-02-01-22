import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const searchSlice = createSlice({
  name: 'search',
  initialState: { chosenFavoriteCity: '', optionsSearch: [], key: 0 },
  reducers: {
    searchWeather(state, action) {
      //return {
      //  ...state, ...action.payload
      //}
      // state.cityName = action.payload.cityName;
      state.key = action.payload.key;
      state.optionsSearch = action.payload.optionsSearch;
    },
    setChosenFavorite(state, action) {
      //return {
      //  ...state, ...{ chosenFavoriteCity: action.payload }
      //}
      state.chosenFavoriteCity = action.payload;
    },
    errorNotification() {
      toast.error("Oops! city not found, try again please");
    }
  }
});

export const searchActions = searchSlice.actions;

export default searchSlice;