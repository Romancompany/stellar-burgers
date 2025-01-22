import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

export type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBunIngredient: (state, action: PayloadAction<TIngredient | null>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    delIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearIngredient: (state) => initialState,
    downIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const item = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = item;
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const item = state.ingredients[index - 1];
      state.ingredients[index - 1] = state.ingredients[index];
      state.ingredients[index] = item;
    }
  },
  selectors: {
    getBunIngredient: (state) => state.bun,
    getIngredients: (state) => state.ingredients
  }
});

export const {
  setBunIngredient,
  addIngredient,
  delIngredient,
  clearIngredient,
  downIngredient,
  upIngredient
} = burgerConstructorSlice.actions;
export const { getBunIngredient, getIngredients } =
  burgerConstructorSlice.selectors;
