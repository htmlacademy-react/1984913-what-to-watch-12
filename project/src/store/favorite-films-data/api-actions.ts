import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../../types/state';
import {Film, Films} from '../../types/film';
import { ReducerName, ApiRoute, ApiError } from '../../utils/constants';
import { toast } from 'react-toastify';

export const fetchFavoriteFilms = createAsyncThunk<Films | void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.FavoriteFilms}/fetchFavoriteFilms`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Films>(ApiRoute.Favorite);
      return data;
    } catch {
      toast.error(ApiError.Favorite, {toastId:'fetchFavoriteFilms'});
    }
  }
);
export const postFavoriteFilm = createAsyncThunk<Film | void, {
  filmId: number;
  status: number;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.FavoriteFilms}/postFavoriteFilm`,
  async ({filmId, status}, {extra: api}) => {
    try {
      const {data} = await api.post<Film>(`${ApiRoute.Favorite}/${filmId}/${status}`);
      return data;
    } catch {
      toast.error(ApiError.PostFavorite, {toastId:'postFavoriteFilm'});
    }
  }
);
