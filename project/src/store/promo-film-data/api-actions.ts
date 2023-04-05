import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiRoute, ReducerName } from '../../utils/constants';
import { Film } from '../../types/film.js';

export const fetchPromoFilm = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.PromoFilm}/fetchPromoFilm`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film>(ApiRoute.PromoFilm);
    return data;
  },
);
