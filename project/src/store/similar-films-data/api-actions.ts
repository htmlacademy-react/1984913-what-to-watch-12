import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { APIRoute, ReducerName } from '../../utils/constants';
import { Films } from '../../types/film.js';

export const fetchSimilarFilms = createAsyncThunk<Films, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.SimilarFilms}/fetchFilmById`,
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${filmId}${APIRoute.SimilarFilms}`);
    return data;
  },
);

