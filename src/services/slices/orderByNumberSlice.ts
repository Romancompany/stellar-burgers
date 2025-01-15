import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrderByNumber } from './actions';

export type TOrderState = {
  order: TOrder | null;
};

export const initialState: TOrderState = {
  order: null
};

export const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => ({
        order: action.payload
      }))
      .addCase(fetchOrderByNumber.pending, (state, action) => initialState)
      .addCase(fetchOrderByNumber.rejected, (state, action) => initialState);
  }
});

export const { getOrder } = orderByNumberSlice.selectors;
