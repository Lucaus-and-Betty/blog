import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface searchState {
  value: boolean;
}

const initialState: searchState = {
  value: false
};

export const searchSlice = createSlice({
  name: 'searcher',
  initialState,
  reducers: {
    show: state => {
      state.value = true;
    },
    hide: state => {
      state.value = false;
    }
  }
});

export const { show, hide } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.searcher.value;

export default searchSlice.reducer;
