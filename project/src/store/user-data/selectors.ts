import { ReducerName, AuthStatus } from '../../utils/constants';
import {State} from '../../types/state';
import { UserAuthStatus } from '../../types/user-auth-data';

export const getAuthStatus = (state: State): UserAuthStatus => state[ReducerName.User].authStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[ReducerName.User].authStatus !== AuthStatus.Unknown;
