import { createSlice } from '@reduxjs/toolkit';
import { TIngredientData } from '@utils-types';
import { fetchIngredients } from './actions';

export const initialState: TIngredientData = {
  ingredients: [],
  isIngredientsLoading: false
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    getIsIngredientsLoading: (state): boolean => state.isIngredientsLoading,
    getIngredients: (state) => state.ingredients
  },
  // pending/fulfilled/rejected = ожидающий/выполненный/отклоненный
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => ({
        isIngredientsLoading: false,
        ingredients: action.payload
      }))
      .addCase(fetchIngredients.pending, (state, action) => ({
        ...state,
        isIngredientsLoading: true
      }))
      .addCase(fetchIngredients.rejected, (state, action) => ({
        ...state,
        isIngredientsLoading: false
      }));
  }
});

// Action creators are generated for each case reducer function
//export const {} = ingredientSlice.actions;
export const { getIsIngredientsLoading, getIngredients } =
  ingredientSlice.selectors;
