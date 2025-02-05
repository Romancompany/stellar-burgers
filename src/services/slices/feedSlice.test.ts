import { configureStore } from '@reduxjs/toolkit';
import { expect, test, describe } from '@jest/globals';
import {
  getFeedOrdersAll,
  getFeedTotal,
  getFeedTotalToday,
  feedSlice,
  initialState
} from './feedSlice';
import { TOrder } from '@utils-types';
import { fetchOrdersAll } from './actions';

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
  const mockTotalToday = 2;
  // создаем начальный стор, из которого будет получать данные
  const store = configureStore({
    reducer: { feed: feedSlice.reducer },
    // указываем начальное состояние стора
    preloadedState: {
      feed: {
        ...initialState,
        orders: mockOrders,
        total: mockOrders.length,
        totalToday: mockTotalToday
      }
    }
  });

  // проверка правильной инициализации
  test('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  // тест селектора getFeedOrdersAll
  test('получить список заказов', () => {
    // вызов селектора getFeedOrdersAll
    const orders = getFeedOrdersAll(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(orders).toEqual(mockOrders);
  });

  // тест селектора getFeedTotal
  test('получить количество заказов', () => {
    // вызов селектора getFeedTotal
    const total = getFeedTotal(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(total).toEqual(mockOrders.length);
  });

  // тест селектора getFeedTotalToday
  test('получить количество заказов', () => {
    // вызов селектора getFeedTotalToday
    const totalToday = getFeedTotalToday(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(totalToday).toEqual(mockTotalToday);
  });
});

describe('Список заказов, тесты  extraReducers', () => {
  test('fetchOrdersAll.fulfilled', () => {
    expect(
      feedSlice.reducer(undefined, {
        type: fetchOrdersAll.fulfilled.type,
        payload: { ...initialState, success: true }
      })
    ).toEqual({ ...initialState, success: true });
  });
});
