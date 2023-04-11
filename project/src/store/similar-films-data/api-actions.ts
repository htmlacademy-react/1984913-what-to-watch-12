import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiError, ApiRoute, ReducerName } from '../../utils/constants';
import { Films } from '../../types/film.js';
import { toast } from 'react-toastify';

export const fetchSimilarFilms = createAsyncThunk<Films|void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.SimilarFilms}/fetchFilmById`,
  async (filmId, {extra: api}) => {
    try {
      const {data} = await api.get<Films>(`${ApiRoute.Films}/${filmId}${ApiRoute.SimilarFilms}`);
      return data;
    } catch {
      toast.error(ApiError.SimilarFilms, {toastId:'fetchFilmById'});
    }
  },
);

