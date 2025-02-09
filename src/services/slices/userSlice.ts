import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUser, registerUser, logoutUser } from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => initialState)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.error = action.error?.message ||'';
      })
      .addCase(loginUser.pending, (state, action) => initialState)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.error = action.error?.message ||'';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
      });
  }
});

export const { setIsAuthChecked, setError, setUser } = userSlice.actions;
export const { getUser, getIsAuthChecked, getUserError } = userSlice.selectors;
