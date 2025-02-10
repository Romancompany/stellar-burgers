import { configureStore } from '@reduxjs/toolkit';
import { expect, test, describe } from '@jest/globals';
import {
  getOrder,
  orderByNumberSlice,
  initialState
} from './orderByNumberSlice';
import { TOrder } from '@utils-types';
import { fetchOrderByNumber } from './actions';

const mockOrder: TOrder = {
  _id: '67879dc8133acd001be4a690',
  ingredients: ['643d69a5c3f7b9001cfa093e'],
  status: 'done',
  name: 'Люминесцентный бургер',
  createdAt: '2025-01-15T11:36:40.350Z',
  updatedAt: '2025-01-15T11:36:41.230Z',
  number: 65541
};

describe('Заказ по номеру, тесты селекторов', () => {
  // создаем начальный стор, из которого будет получать данные
  const store = configureStore({
    reducer: { orderByNumber: orderByNumberSlice.reducer },
    // указываем начальное состояние стора
    preloadedState: {
      orderByNumber: {
        ...initialState,
        order: mockOrder
      }
    }
  });

  // тест селектора getOrder
  test('получить заказ', () => {
    // вызов селектора getOrder
    const order = getOrder(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(order).toEqual(mockOrder);
  });
});

describe('Заказ по номеру, тесты extraReducers', () => {
  test('fetchOrderByNumber.fulfilled', () => {
    expect(
      orderByNumberSlice.reducer(undefined, {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      })
    ).toEqual({
      ...initialState,
      order: mockOrder
    });
  });
  
  test('fetchOrderByNumber.pending', () => {
    expect(
      orderByNumberSlice.reducer(undefined, {
        type: fetchOrderByNumber.pending.type
      })
    ).toEqual(initialState);
  });

  test('fetchOrderByNumber.rejected', () => {
    expect(
      orderByNumberSlice.reducer(undefined, {
        type: fetchOrderByNumber.rejected.type
      })
    ).toEqual(initialState);
  });
});
