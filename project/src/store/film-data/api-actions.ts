import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiError, ApiRoute, ReducerName } from '../../utils/constants';
import { Film} from '../../types/film.js';
import { toast } from 'react-toastify';

export const fetchFilmById = createAsyncThunk<Film|void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Film}/fetchFilmById`,
  async (filmId, {extra: api}) => {
    try {
      const {data} = await api.get<Film>(`${ApiRoute.Films}/${filmId}`);
      return data;
    } catch {
      toast.error(ApiError.Film, {toastId:'fetchFilmById'});
    }
  },
);
