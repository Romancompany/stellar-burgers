import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientSlice } from './slices/ingredientSlice';
import { feedSlice } from './slices/feedSlice';
import { userSlice } from './slices/userSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { orderBurgerSlice } from './slices/orderBurgerSlice';
import { orderSlice } from './slices/orderSlice';
import { orderByNumberSlice } from './slices/orderByNumberSlice';

const rootReducer = combineSlices(
  ingredientSlice,
  feedSlice,
  userSlice,
  burgerConstructorSlice,
  orderBurgerSlice,
  orderSlice,
  orderByNumberSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
