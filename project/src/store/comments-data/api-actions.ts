import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiErrors, ApiRoute, ReducerName } from '../../utils/constants';
import { NewReview, Reviews } from '../../types/review.js';
import { toast } from 'react-toastify';

export const fetchFilmComments = createAsyncThunk<Reviews|void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Comments}/fetchFilmComments`,
  async (filmId, {extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(`${ApiRoute.Comments}/${filmId}`);
      return data;
    } catch {
      toast.error(ApiErrors.Comments, {toastId:'fetchFilmComments'});
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
  `${ReducerName.Comments}/postFilmReview`,
  async ({filmId, review}, {extra: api}) => {
    try {
      const {data} = await api.post<NewReview>(`${ApiRoute.Comments}/${filmId}`, review);
      return data;
    } catch {
      toast.error(ApiErrors.PostReview, {toastId:'postFilmReview'});
    }
  },
);
