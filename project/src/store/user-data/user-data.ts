import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, ReducerName} from '../../utils/constants';
import { UserAuthStatus } from '../../types/user-auth-data';
import { checkAuth, login, logout } from './api-actions';

type InitialState = {
 authStatus: UserAuthStatus;
}

const initialState:InitialState = {
  authStatus:AuthStatus.Unknown,
};

export const userData = createSlice({
  name: ReducerName.Films,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  }
});
