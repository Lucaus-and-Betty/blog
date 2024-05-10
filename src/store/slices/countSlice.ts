import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface Count {
  value: number;
}

const initialState: Count = {
  value: 123
};

export const countSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = countSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default countSlice.reducer;
