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

const testOrders: TOrder[] = [
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

afterEach(() => {
  jest.clearAllMocks();
});

describe('Список заказов, тесты селекторов', () => {
  //const testOrders: TOrder[] = [];
  const testTotalToday = 2;
  // создаем начальный стор, из которого будет получать данные
  const store = configureStore({
    reducer: { feed: feedSlice.reducer },
    // указываем начальное состояние стора
    preloadedState: {
      feed: {
        ...initialState,
        orders: testOrders,
        total: testOrders.length,
        totalToday: testTotalToday
      }
    }
  });

  // тест селектора getFeedOrdersAll
  test('получить список заказов', () => {
    // вызов селектора getFeedOrdersAll
    const orders = getFeedOrdersAll(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(orders).toEqual(testOrders);
  });

  // тест селектора getFeedTotal
  test('получить количество заказов', () => {
    // вызов селектора getFeedTotal
    const total = getFeedTotal(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(total).toEqual(testOrders.length);
  });

  // тест селектора getFeedTotalToday
  test('получить количество заказов', () => {
    // вызов селектора getFeedTotalToday
    const totalToday = getFeedTotalToday(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(totalToday).toEqual(testTotalToday);
  });
});
