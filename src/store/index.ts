import { configureStore } from '@reduxjs/toolkit';
import countSlice from './slices/countSlice.ts';

const store = configureStore({
  reducer: {
    counter: countSlice
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
