import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { FetchStatus } from '@myTypes/index';

interface loadingState {
  value: {
    status: FetchStatus;
  };
}

const initialState: loadingState = {
  value: {
    status: FetchStatus.LOADING
  }
};

export const loadingSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: state => {
      state.value = {
        status: FetchStatus.LOADING
      };
    },
    errorLoader: state => {
      state.value = {
        status: FetchStatus.FAIL
      };
    },
    hideLoader: state => {
      state.value = {
        status: FetchStatus.SUCCESS
      };
    }
  }
});

export const { showLoader, hideLoader, errorLoader } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loader.value;

export default loadingSlice.reducer;
