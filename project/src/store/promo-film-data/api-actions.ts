import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiError, ApiRoute, ReducerName } from '../../utils/constants';
import { Film } from '../../types/film.js';
import { toast } from 'react-toastify';

export const fetchPromoFilm = createAsyncThunk<Film|void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.PromoFilm}/fetchPromoFilm`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Film>(ApiRoute.PromoFilm);
      return data;
    } catch {
      toast.error(ApiError.PromoFilm, {toastId:'fetchPromoFilm'});
    }
  },
);
