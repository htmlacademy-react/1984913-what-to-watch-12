import { Reviews } from '../../types/review';
import { State } from '../../types/state';
import { ReducerName } from '../../utils/constants';

export const getComments = (state:State):Reviews => state[ReducerName.Comments].comments;
export const getCommentsStatus = (state:State):boolean => state[ReducerName.Comments].isCommentsLoading;
