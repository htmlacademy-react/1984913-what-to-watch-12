import { createAction } from '@reduxjs/toolkit';
// import { AuthStatus } from '../../utils/constants';


export const requireAuth = createAction<string>('user/requireAuth');
