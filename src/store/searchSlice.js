import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const searchSlice = createSlice({
  name: 'search',
  initialState: { cityName: '', key: 0, chosenFavoriteCity: '' },
  reducers: {
    searchWeather(state, action) {
      return {
        ...state, ...action.payload
      }

    },
    setChosenFavorite(state, action) {
      return {
        ...state, ...{ chosenFavoriteCity: action.payload }
      }
    },
    errorNotification() {
      toast.error("Oops! city not found, try again please");
    }
  }
});

export const searchActions = searchSlice.actions;

export default searchSlice;