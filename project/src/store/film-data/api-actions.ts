import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiRoute, ReducerName } from '../../utils/constants';
import { Film} from '../../types/film.js';

export const fetchFilmById = createAsyncThunk<Film, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Film}/fetchFilmById`,
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Film>(`${ApiRoute.Films}/${filmId}`);
    return data;
  },
);
