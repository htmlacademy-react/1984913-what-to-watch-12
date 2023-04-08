import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiErrors, ApiRoute, ReducerName } from '../../utils/constants';
import { Reviews } from '../../types/review.js';
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
