import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, ReducerName} from '../../utils/constants';
import { checkAuth, login, logout } from './api-actions';
import { UserState } from '../../types/state';

const initialState:UserState = {
  authStatus:AuthStatus.Unknown,
  userData: null
};

export const userData = createSlice({
  name: ReducerName.Films,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userData = action.payload ?? null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userData = action.payload ?? null;
      })
      .addCase(login.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userData = null;
      });
  }
});
