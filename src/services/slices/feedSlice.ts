import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { fetchFeeds } from './actions';

export const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state = action.payload;
    });
  }
});
