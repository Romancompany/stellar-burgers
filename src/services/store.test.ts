import { combineSlices } from '@reduxjs/toolkit';
import { expect, test } from '@jest/globals';
import { rootReducer } from './store';
import { ingredientSlice } from './slices/ingredientSlice';
import { feedSlice } from './slices/feedSlice';
import { userSlice } from './slices/userSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { orderBurgerSlice } from './slices/orderBurgerSlice';
import { orderSlice } from './slices/orderSlice';
import { orderByNumberSlice } from './slices/orderByNumberSlice';

// тест rootReducer
test('тест rootReducer', () => {
  // несуществующий Action
  const unknownAction = { type: 'UNKNOWN_ACTION' };
  // инициализация состояния
  const initState = rootReducer(undefined, unknownAction);
  // ожидаемое состояние
  const testState = {
    ingredient: ingredientSlice.reducer(undefined, unknownAction),
    feed: feedSlice.reducer(undefined, unknownAction),
    user: userSlice.reducer(undefined, unknownAction),
    burgerConstructor: burgerConstructorSlice.reducer(
      undefined,
      unknownAction
    ),
    orderBurger: orderBurgerSlice.reducer(undefined, unknownAction),
    order: orderSlice.reducer(undefined, unknownAction),
    orderByNumber: orderByNumberSlice.reducer(undefined, unknownAction)
  };
  // сравниваем результат с ожидаемым результатом
  expect(initState).toEqual(testState);
});
