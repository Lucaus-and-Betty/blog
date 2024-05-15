import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { themeType } from '@myTypes/index';
import localforage from 'localforage';

interface themeState {
  value: themeType;
}

const initialState: themeState = {
  value: 'system'
};

export const themeSlice = createSlice({
  name: 'themer',
  initialState,
  reducers: {
    changeToSystem: state => {
      state.value = 'system';
      localforage.setItem('theme', 'system');
    },
    changeToLight: state => {
      state.value = 'light';
      localforage.setItem('theme', 'light');
    },
    changeToDark: state => {
      state.value = 'dark';
      localforage.setItem('theme', 'dark');
    }
  }
});

export const { changeToDark, changeToLight, changeToSystem } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.themer.value;

export default themeSlice.reducer;
