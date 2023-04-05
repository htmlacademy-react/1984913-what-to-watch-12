import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiRoute, ReducerName } from '../../utils/constants';
import { Reviews } from '../../types/review.js';

export const fetchFilmComments = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Comments}/fetchFilmComments`,
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${ApiRoute.Comments}/${filmId}`);
    return data;
  },
);
