import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
}

const initialState: AuthState = {
  accessToken: Cookies.get('access_token') || null,
  refreshToken: Cookies.get('refresh_token') || null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: any }>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      
      Cookies.set('access_token', action.payload.accessToken, { expires: 1 });
      Cookies.set('refresh_token', action.payload.refreshToken, { expires: 7 });
    },

    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;

      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
