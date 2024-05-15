import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface languageState {
  value: 'EN' | 'CN';
}

const initialState: languageState = {
  value: 'EN'
};

export const languageSlice = createSlice({
  name: 'languager',
  initialState,
  reducers: {
    changeToEN: state => {
      state.value = 'EN';
    },
    changeToCN: state => {
      state.value = 'CN';
    }
  }
});

export const { changeToCN, changeToEN } = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.languager.value;

export default languageSlice.reducer;
