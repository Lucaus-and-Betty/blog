import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { CN, EN } from '@myConstants/index';
import localforage from 'localforage';

interface languageState {
  value: {
    LANGUAGE: {
      [key: string]: string;
    };
    languageType: string;
  };
}

const initialState: languageState = {
  value: {
    LANGUAGE: EN,
    languageType: 'EN'
  }
};

export const languageSlice = createSlice({
  name: 'languager',
  initialState,
  reducers: {
    changeToEN: state => {
      localforage.setItem('language', 'EN');
      state.value = {
        LANGUAGE: EN,
        languageType: 'EN'
      };
    },
    changeToCN: state => {
      localforage.setItem('language', 'CN');
      state.value = {
        LANGUAGE: CN,
        languageType: 'CN'
      };
    }
  }
});

export const { changeToCN, changeToEN } = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.languager.value;

export default languageSlice.reducer;
