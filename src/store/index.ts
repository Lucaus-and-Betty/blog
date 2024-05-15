import { configureStore } from '@reduxjs/toolkit';
import countSlice from './slices/countSlice.ts';
import searchSlice from './slices/searchSlice.ts';
import themeSlice from './slices/themeSlice.ts';
import languageSlice from './slices/languageSlice.ts';

const store = configureStore({
  reducer: {
    counter: countSlice,
    searcher: searchSlice,
    themer: themeSlice,
    languager: languageSlice
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
