import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../../types/state';
import {Films} from '../../types/film';
import { ReducerName, ApiRoute } from '../../utils/constants';
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
      toast.error('Failed to load favorite films', {toastId:'fetchFavoriteFilms'});
    }
  }
);
