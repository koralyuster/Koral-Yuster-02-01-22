import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: { items: [], },
  reducers: {
    addToFavorite(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.city === newItem.city);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          key: newItem.key,
          city: newItem.city,
          temp: newItem.temp,
          tempNight: newItem.tempNight,
          buttonText: newItem.buttonText
        })
        toast.success("Success! added to favorite");
      }
      else {
        state.items = state.items.filter(item => item.city !== newItem.city)
        toast.warn("Removed from favorite");
      }
    },
    removeFromFavorite(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id)
      toast.warn("Removed from the favorite");
    }
  }
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice;