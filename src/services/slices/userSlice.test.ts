import { configureStore } from '@reduxjs/toolkit';
import { expect, test, describe } from '@jest/globals';
import {
  setIsAuthChecked,
  setError,
  setUser,
  getUser,
  getIsAuthChecked,
  getUserError,
  userSlice,
  initialState
} from './userSlice';
import { TUser } from '@utils-types';
import { registerUser, loginUser, logoutUser } from './actions';

const mockUser: TUser = {
  email: 'ivan@mail.ru',
  name: 'Иван'
};

describe('Пользователь, тесты редьюсеров', () => {
  // проверка правильной инициализации
  test('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  // тест редьюсера setIsAuthChecked
  test('пройден процесс авторизации', () => {
    // начальное состояние
    const prevState = initialState;
    // вызов редьюсера setIsAuthChecked
    const newState = userSlice.reducer(prevState, setIsAuthChecked(true));
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual({
      ...prevState,
      isAuthChecked: true
    });
  });

  // тест редьюсера setError
  test('записан текст ошибки', () => {
    // начальное состояние
    const prevState = initialState;
    // вызов редьюсера setError
    const newState = userSlice.reducer(prevState, setError('test'));
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual({
      ...prevState,
      error: 'test'
    });
  });

  // тест редьюсера setUser
  test('записан текст ошибки', () => {
    // начальное состояние
    const prevState = initialState;
    // вызов редьюсера setUser
    const newState = userSlice.reducer(prevState, setUser(mockUser));
    // сравниваем результат с ожидаемым результатом
    expect(newState).toEqual({
      ...prevState,
      user: mockUser
    });
  });
});

describe('Пользователь, тесты селекторов', () => {
  // тест селектора getUser
  test('получить пользователя', () => {
    // создаем начальный стор, из которого будет получать данные
    const store = configureStore({
      reducer: { user: userSlice.reducer },
      // указываем начальное состояние стора
      preloadedState: {
        user: { ...initialState, user: mockUser }
      }
    });
    // вызов селектора getUser
    const user = getUser(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(user).toEqual(mockUser);
  });

  // тест селектора getIsAuthChecked
  test('получить статус авторизации', () => {
    // создаем начальный стор, из которого будет получать данные
    const store = configureStore({
      reducer: { user: userSlice.reducer },
      // указываем начальное состояние стора
      preloadedState: {
        user: { ...initialState, isAuthChecked: true }
      }
    });
    // вызов селектора getIsAuthChecked
    const isAuthChecked = getIsAuthChecked(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(isAuthChecked).toEqual(true);
  });

  // тест селектора getUserError
  test('получить статус авторизации', () => {
    // создаем начальный стор, из которого будет получать данные
    const store = configureStore({
      reducer: { user: userSlice.reducer },
      // указываем начальное состояние стора
      preloadedState: {
        user: { ...initialState, error: 'тест' }
      }
    });
    // вызов селектора getUserError
    const error = getUserError(store.getState());
    // сравниваем результат с ожидаемым результатом
    expect(error).toEqual('тест');
  });
});

describe('Пользователь, тесты extraReducers', () => {
  test('registerUser.fulfilled', () => {
    expect(
      userSlice.reducer(undefined, {
        type: registerUser.fulfilled.type,
        payload: mockUser
      })
    ).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });

  test('registerUser.pending', () => {
    expect(
      userSlice.reducer(undefined, {
        type: registerUser.pending.type
      })
    ).toEqual(initialState);
  });

  test('registerUser.rejected', () => {
    expect(
      userSlice.reducer(undefined, {
        type: registerUser.rejected.type,
        payload: { error: '' }
      })
    ).toEqual({
      ...initialState,
      user: null,
      isAuthChecked: true,
      error: ''
    });
  });

  test('loginUser.fulfilled', () => {
    expect(
      userSlice.reducer(undefined, {
        type: loginUser.fulfilled.type,
        payload: mockUser
      })
    ).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });

  test('loginUser.pending', () => {
    expect(
      userSlice.reducer(undefined, {
        type: loginUser.pending.type
      })
    ).toEqual(initialState);
  });

  test('loginUser.rejected', () => {
    expect(
      userSlice.reducer(undefined, {
        type: loginUser.rejected.type,
        payload: { error: '' }
      })
    ).toEqual({
      ...initialState,
      user: null,
      isAuthChecked: true,
      error: ''
    });
  });

  test('logoutUser.fulfilled', () => {
    expect(
      userSlice.reducer(undefined, {
        type: logoutUser.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      user: null
    });
  });
});
