import { configureStore } from '@reduxjs/toolkit';
import countSlice from './slices/countSlice.ts';
import searchSlice from './slices/searchSlice.ts';

const store = configureStore({
  reducer: {
    counter: countSlice,
    searcher: searchSlice
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
