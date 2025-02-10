import { configureStore } from '@reduxjs/toolkit';
import { expect, test, describe } from '@jest/globals';
import {
  clearOrder,
  getOrder,
  getIsOrderLoading,
  orderBurgerSlice,
  initialState
} from './orderBurgerSlice';
import { TOrder } from '@utils-types';
import { orderBurger } from './actions';

const mockOrder: TOrder = {
  _id: '67879dc8133acd001be4a690',
  ingredients: ['643d69a5c3f7b9001cfa093e'],
  status: 'done',
  name: 'Люминесцентный бургер',
  createdAt: '2025-01-15T11:36:40.350Z',
  updatedAt: '2025-01-15T11:36:41.230Z',
  number: 65541
};

describe('Заказ гамбургера, тесты редьюсеров', () => {
  // проверка правильной инициализации
  test('should return the initial state', () => {
    expect(
      orderBurgerSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  // тест редьюсера clearOrder
  test('полная очистка', () => {
    // начальное состояние
    const prevState = {
      ...initialState,
      order: mockOrder,
      isOrderLoading: true
    };
    // вызов редьюсера clearOrder
    const newState = orderBurgerSlice.reducer(prevState, clearOrder());
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual(initialState);
  });
});

describe('Заказ гамбургера, тесты селекторов', () => {
  // создаем начальный стор, из которого будет получать данные
  const store = configureStore({
    reducer: { orderBurger: orderBurgerSlice.reducer },
    // указываем начальное состояние стора
    preloadedState: {
      orderBurger: {
        ...initialState,
        order: mockOrder,
        isOrderLoading: false
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

  // тест селектора getIsOrderLoading
  test('получить статус заказа', () => {
    // вызов селектора getIsOrderLoading
    const isOrderLoading = getIsOrderLoading(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(isOrderLoading).toEqual(false);
  });
});

describe('Заказ гамбургера, тесты  extraReducers', () => {
  test('orderBurger.fulfilled', () => {
    expect(
      orderBurgerSlice.reducer(undefined, {
        type: orderBurger.fulfilled.type,
        payload: mockOrder
      })
    ).toEqual({
      ...initialState,
      order: mockOrder,
      isOrderLoading: false
    });
  });

  test('orderBurger.pending', () => {
    expect(
      orderBurgerSlice.reducer(undefined, {
        type: orderBurger.pending.type
      })
    ).toEqual({
      ...initialState,
      isOrderLoading: true
    });
  });

  test('orderBurger.rejected', () => {
    expect(
      orderBurgerSlice.reducer(undefined, {
        type: orderBurger.rejected.type
      })
    ).toEqual({
      ...initialState,
      isOrderLoading: false
    });
  });
});
