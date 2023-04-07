import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, ReducerName} from '../../utils/constants';
import { UserAuthStatus } from '../../types/user-auth-data';
import { requireAuth } from './action';

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
    builder.addCase(requireAuth, (state,action) => {
      state.authStatus = action.payload;
    });
  }
});
