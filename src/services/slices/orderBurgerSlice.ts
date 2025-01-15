import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurger } from './actions';

export type TOrderBurgerState = {
  data: { order: TOrder | null; name: string };
  isOrderLoading: boolean;
};

export const initialState: TOrderBurgerState = {
  data: { order: null, name: '' },
  isOrderLoading: false
};

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: (state) => initialState
  },
  selectors: {
    getOrderData: (state) => state.data,
    getIsOrderLoading: (state) => state.isOrderLoading
  },
  // pending/fulfilled/rejected = ожидающий/выполненный/отклоненный
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.fulfilled, (state, action) => ({
        data: action.payload,
        isOrderLoading: false
      }))
      .addCase(orderBurger.pending, (state, action) => ({
        ...state,
        isOrderLoading: true
      }))
      .addCase(orderBurger.rejected, (state, action) => ({
        ...state,
        isOrderLoading: false
      }));
  }
});

export const { clearOrder } = orderBurgerSlice.actions;
export const { getOrderData, getIsOrderLoading } = orderBurgerSlice.selectors;
