import { configureStore } from '@reduxjs/toolkit';
import { expect, test, describe } from '@jest/globals';
import {
  getIsIngredientsLoading,
  getIngredients,
  ingredientSlice,
  initialState
} from './ingredientSlice';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './actions';

const mockIngredientMain: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockIngredientBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockIngredients = [mockIngredientMain, mockIngredientBun];

describe('База инградиентов, тесты селекторов', () => {
  // создаем начальный стор, из которого будет получать данные
  const store = configureStore({
    reducer: { ingredient: ingredientSlice.reducer },
    // указываем начальное состояние стора
    preloadedState: {
      ingredient: {
        ...initialState,
        ingredients: mockIngredients,
        isIngredientsLoading: true
      }
    }
  });

  // проверка правильной инициализации
  test('should return the initial state', () => {
    expect(
      ingredientSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  // тест селектора getIsIngredientsLoading
  test('статус загрузки инградиентов', () => {
    // вызов селектора getIsIngredientsLoading
    const isIngredientsLoading = getIsIngredientsLoading(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(isIngredientsLoading).toEqual(true);
  });

  // тест селектора getIngredients
  test('статус загрузки инградиентов', () => {
    // вызов селектора getIngredients
    const ingredients = getIngredients(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(ingredients).toEqual(mockIngredients);
  });
});

describe('Список заказов, тесты  extraReducers', () => {
  test('fetchIngredients.fulfilled', () => {
    expect(
      ingredientSlice.reducer(undefined, {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      })
    ).toEqual({
      ...initialState,
      isIngredientsLoading: false,
      ingredients: mockIngredients
    });
  });

  test('fetchIngredients.pending', () => {
    expect(
      ingredientSlice.reducer(undefined, {
        type: fetchIngredients.pending.type
      })
    ).toEqual({
      ...initialState,
      isIngredientsLoading: true
    });
  });

  test('fetchIngredients.rejected', () => {
    expect(
      ingredientSlice.reducer(undefined, {
        type: fetchIngredients.rejected.type
      })
    ).toEqual({
      ...initialState,
      isIngredientsLoading: false
    });
  });
});
