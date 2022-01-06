import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import currentSlice from './currentSlice';
import favoriteSlice from './favoriteSlice';

const store = configureStore({
  reducer: { search: searchSlice.reducer, current: currentSlice.reducer, favorite: favoriteSlice.reducer }
});

export default store;