import { Reviews } from '../../types/review';
import { State } from '../../types/state';
import { ReducerName } from '../../utils/constants';

export const getReviews = (state:State):Reviews => state[ReducerName.Reviews].reviews;
export const getReviewsStatus = (state:State):boolean => state[ReducerName.Reviews].isReviewsLoading;
export const getPostingStatus = (state:State):boolean => state[ReducerName.Reviews].isReviewPosting;
