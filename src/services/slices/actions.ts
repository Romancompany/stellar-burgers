import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  getIngredientsApi,
  getFeedsApi,
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  orderBurgerApi,
  getOrdersApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { setIsAuthChecked, setUser } from './userSlice';
import { clearIngredient } from './burgerConstructorSlice';

export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  async () => getIngredientsApi()
);

export const fetchOrdersAll = createAsyncThunk(
  'burger/fetchFeedsAll',
  async () => getFeedsApi()
);

export const fetchOrders = createAsyncThunk('burger/fetchOrders', async () =>
  getOrdersApi()
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (login: TLoginData, thunkAPI) => {
    const data = await loginUserApi(login);
    if (!data?.success) {
      return thunkAPI.rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (register: TRegisterData, thunkAPI) => {
    const data = await registerUserApi(register);
    if (!data?.success) {
      return thunkAPI.rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    const data = await logoutApi();
    if (!data?.success) {
      return thunkAPI.rejectWithValue(data);
    }
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      getUserApi()
        .then((data) => dispatch(setUser(data.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const orderBurger = createAsyncThunk(
  'user/orderBurger',
  async (id: string[], { dispatch }) => {
    const data = await orderBurgerApi(id);
    if (!data?.success) {
      return null;
    }
    dispatch(clearIngredient());
    return data.order;
  }
);
