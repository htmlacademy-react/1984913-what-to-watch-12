import { ReducerName, AuthStatus } from '../../utils/constants';
import {State} from '../../types/state';
import { UserData } from '../../types/user-auth-data';

export const getIsAuthorized = (state: State): boolean => state[ReducerName.User].authStatus === AuthStatus.Auth;
export const getAuthCheckedStatus = (state: State): boolean => state[ReducerName.User].authStatus !== AuthStatus.Unknown;
export const getUserData = (state:State):UserData|null=>state[ReducerName.User].userData;
