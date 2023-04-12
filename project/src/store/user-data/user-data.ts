import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, ReducerName} from '../../utils/constants';
import { UserAuthStatus, UserData } from '../../types/user-auth-data';
import { checkAuth, login, logout } from './api-actions';

type InitialState = {
 authStatus: UserAuthStatus;
 userData: UserData | null;
}

const initialState:InitialState = {
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
