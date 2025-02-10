import { configureStore } from '@reduxjs/toolkit';
import { expect, test, describe } from '@jest/globals';
import { getOrders, orderSlice, initialState } from './orderSlice';
import { TOrder } from '@utils-types';
import { fetchOrders } from './actions';

const mockOrders: TOrder[] = [
  {
    _id: '67879dc8133acd001be4a690',
    ingredients: ['643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Люминесцентный бургер',
    createdAt: '2025-01-15T11:36:40.350Z',
    updatedAt: '2025-01-15T11:36:41.230Z',
    number: 65541
  },
  {
    _id: '67879e25133acd001be4a691',
    ingredients: ['643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Био-марсианский метеоритный бургер',
    createdAt: '2025-01-15T11:38:13.081Z',
    updatedAt: '2025-01-15T11:38:13.931Z',
    number: 65542
  }
];

describe('Список заказов, тесты селекторов', () => {
  // создаем начальный стор, из которого будет получать данные
  const store = configureStore({
    reducer: { order: orderSlice.reducer },
    // указываем начальное состояние стора
    preloadedState: {
      order: {
        ...initialState,
        orders: mockOrders
      }
    }
  });

  // тест селектора getOrders
  test('получить заказ', () => {
    // вызов селектора getOrders
    const orders = getOrders(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(orders).toEqual(mockOrders);
  });
});

describe('Список заказов, тесты extraReducers', () => {
  test('fetchOrders.fulfilled', () => {
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrders.fulfilled.type,
        payload: mockOrders
      })
    ).toEqual({
      ...initialState,
      orders: mockOrders
    });
  });

  test('fetchOrders.pending', () => {
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrders.pending.type
      })
    ).toEqual(initialState);
  });

  test('fetchOrders.rejected', () => {
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrders.rejected.type
      })
    ).toEqual(initialState);
  });
});
