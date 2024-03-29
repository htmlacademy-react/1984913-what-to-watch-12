import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiError, ApiRoute, AppRoute, ReducerName } from '../../utils/constants';
import { NewReview, Reviews } from '../../types/review.js';
import { toast } from 'react-toastify';
import { redirectToRoute } from '../action';

export const fetchFilmReviews = createAsyncThunk<Reviews|void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Reviews}/fetchFilmReviews`,
  async (filmId, {extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(`${ApiRoute.Reviews}/${filmId}`);
      return data;
    } catch {
      toast.error(ApiError.Reviews, {toastId:'fetchFilmReviews'});
    }
  },
);

export const postFilmReview = createAsyncThunk<NewReview|void, {
  filmId: number;
  review:NewReview;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Reviews}/postFilmReview`,
  async ({filmId, review}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<NewReview>(`${ApiRoute.Reviews}/${filmId}`, review);
      dispatch(redirectToRoute(`${AppRoute.Film}/${filmId}?tab=Reviews`));
      return data;
    } catch {
      toast.error(ApiError.PostReview, {toastId:'postFilmReview'});
    }
  },
);
