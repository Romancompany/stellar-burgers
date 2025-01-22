import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurger } from './actions';

export type TOrderBurgerState = {
  order: TOrder | null;
  isOrderLoading: boolean;
};

export const initialState: TOrderBurgerState = {
  order: null,
  isOrderLoading: false
};

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: (state) => initialState
  },
  selectors: {
    getOrder: (state) => state.order,
    getIsOrderLoading: (state) => state.isOrderLoading
  },
  // pending/fulfilled/rejected = ожидающий/выполненный/отклоненный
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.fulfilled, (state, action) => ({
        order: action.payload,
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
export const { getOrder, getIsOrderLoading } = orderBurgerSlice.selectors;
