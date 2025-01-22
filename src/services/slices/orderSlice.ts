import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrders } from './actions';

export type TOrdersState = {
  orders: TOrder[];
};

export const initialState: TOrdersState = {
  orders: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state): TOrder[] => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => ({
        orders: action.payload
      }))
      .addCase(fetchOrders.pending, (state, action) => initialState)
      .addCase(fetchOrders.rejected, (state, action) => initialState);
  }
});

export const { getOrders } = orderSlice.selectors;
