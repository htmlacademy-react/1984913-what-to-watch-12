import { ReducerName, AuthStatus } from '../../utils/constants';
import {State} from '../../types/state';

export const getIsAuthorized = (state: State): boolean => state[ReducerName.User].authStatus === AuthStatus.Auth;
export const getAuthCheckedStatus = (state: State): boolean => state[ReducerName.User].authStatus !== AuthStatus.Unknown;
