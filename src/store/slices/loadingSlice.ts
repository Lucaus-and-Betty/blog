import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { FetchStatus } from '@myTypes/index';

interface loadingState {
  value: {
    status: FetchStatus;
    failMessage: string;
  };
}

const initialState: loadingState = {
  value: {
    status: FetchStatus.LOADING,
    failMessage: 'Loading'
  }
};

export const loadingSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.value = {
        status: FetchStatus.LOADING,
        failMessage: action.payload
      };
    },
    errorLoader: state => {
      state.value = {
        status: state.value.status,
        failMessage: state.value.failMessage
      };
    },
    hideLoader: state => {
      state.value = {
        status: FetchStatus.SUCCESS,
        failMessage: state.value.failMessage
      };
    }
  }
});

export const { showLoader, hideLoader, errorLoader } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loader.value;

export default loadingSlice.reducer;
