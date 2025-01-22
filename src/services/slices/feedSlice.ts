import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '@utils-types';
import { fetchOrdersAll } from './actions';

export const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrdersAll: (state): TOrder[] => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAll.fulfilled, (state, action) => action.payload)
      .addCase(fetchOrdersAll.pending, (state, action) => initialState)
      .addCase(fetchOrdersAll.rejected, (state, action) => initialState);
  }
});

export const { getFeedOrdersAll, getFeedTotal, getFeedTotalToday } =
  feedSlice.selectors;
