import { configureStore } from '@reduxjs/toolkit';
import { expect, test, describe } from '@jest/globals';
import {
  setBunIngredient,
  addIngredient,
  delIngredient,
  clearIngredient,
  downIngredient,
  upIngredient,
  getBunIngredient,
  getIngredients,
  burgerConstructorSlice,
  initialState
} from './burgerConstructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

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

const mockIngredientSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0945',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
};

const mockConstructorIngredientMain: TConstructorIngredient = {
  ...mockIngredientMain,
  id: '1'
};
const mockConstructorIngredientBun: TConstructorIngredient = {
  ...mockIngredientBun,
  id: '2'
};
const mockConstructorIngredientSauce: TConstructorIngredient = {
  ...mockIngredientSauce,
  id: '3'
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('Конструктор гамбургера, тесты редьюсеров', () => {
  // тест редьюсера addIngredient
  test('добавить инградиент', () => {
    // начальное состояние
    const prevState = initialState;
    // вызов редьюсера addIngredient
    const newState = burgerConstructorSlice.reducer(
      prevState,
      addIngredient(mockConstructorIngredientMain)
    );
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual({
      ...prevState,
      ingredients: [mockConstructorIngredientMain]
    });
  });

  // тест редьюсера delIngredient
  test('удалить инградиент', () => {
    // начальное состояние
    const prevState = {
      ...initialState,
      ingredients: [mockConstructorIngredientMain, mockConstructorIngredientBun]
    };
    // вызов редьюсера delIngredient
    const newState = burgerConstructorSlice.reducer(
      prevState,
      delIngredient(mockConstructorIngredientBun.id)
    );
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual({
      ...prevState,
      ingredients: [mockConstructorIngredientMain]
    });
  });

  // тест редьюсера downIngredient
  test('изменения порядка инградиентов в начинке, DOWN', () => {
    // начальное состояние
    const prevState = {
      ...initialState,
      ingredients: [
        mockConstructorIngredientMain,
        mockConstructorIngredientSauce
      ]
    };
    // вызов редьюсера downIngredient
    const newState = burgerConstructorSlice.reducer(
      prevState,
      downIngredient(0)
    );
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual({
      ...prevState,
      ingredients: [
        mockConstructorIngredientSauce,
        mockConstructorIngredientMain
      ]
    });
  });

  // тест редьюсера upIngredient
  test('изменения порядка инградиентов в начинке, UP', () => {
    // начальное состояние
    const prevState = {
      ...initialState,
      ingredients: [
        mockConstructorIngredientMain,
        mockConstructorIngredientSauce
      ]
    };
    // вызов редьюсера upIngredient
    const newState = burgerConstructorSlice.reducer(prevState, upIngredient(1));
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual({
      ...initialState,
      ingredients: [
        mockConstructorIngredientSauce,
        mockConstructorIngredientMain
      ]
    });
  });

  // тест редьюсера setBunIngredient
  test('установка булки', () => {
    // начальное состояние
    const prevState = initialState;

    // вызов редьюсера setBunIngredient
    const newState = burgerConstructorSlice.reducer(
      prevState,
      setBunIngredient(mockIngredientBun)
    );
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual({
      ...initialState,
      bun: mockIngredientBun
    });
  });

  // тест редьюсера clearIngredient
  test('полная очистка', () => {
    // начальное состояние
    const prevState = {
      ...initialState,
      bun: mockIngredientBun,
      ingredients: [
        mockConstructorIngredientSauce,
        mockConstructorIngredientMain
      ]
    };
    // вызов редьюсера clearIngredient
    const newState = burgerConstructorSlice.reducer(
      prevState,
      clearIngredient()
    );
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual(initialState);
  });
});

describe('Конструктор гамбургера, тесты селекторов', () => {
  // тест селектора getBunIngredient
  test('получить булку', () => {
    // создаем начальный стор, из которого будет получать данные
    const store = configureStore({
      reducer: { burgerConstructor: burgerConstructorSlice.reducer },
      // указываем начальное состояние стора
      preloadedState: {
        burgerConstructor: { ...initialState, bun: mockIngredientBun }
      }
    });
    // вызов селектора getBunIngredient
    const bun = getBunIngredient(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(bun).toEqual(mockIngredientBun);
  });

  // тест селектора getIngredients
  test('получить инградиенты', () => {
    const onlyIngredients = [
      mockConstructorIngredientMain,
      mockConstructorIngredientSauce
    ];
    // создаем начальный стор, из которого будет получать данные
    const store = configureStore({
      reducer: { burgerConstructor: burgerConstructorSlice.reducer },
      // указываем начальное состояние стора
      preloadedState: {
        burgerConstructor: {
          ...initialState,
          ingredients: onlyIngredients
        }
      }
    });
    // вызов селектора getBunIngredient
    const ingredients = getIngredients(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(ingredients).toEqual(onlyIngredients);
  });
});
