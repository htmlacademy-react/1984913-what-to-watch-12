import { createAction } from '@reduxjs/toolkit';
import { UserAuthStatus } from '../../types/user-auth-data';

export const requireAuth = createAction<UserAuthStatus>('USER/requireAuth');
