import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { ApiErrors, ApiRoute, ReducerName } from '../../utils/constants';
import { Films } from '../../types/film.js';
import { toast } from 'react-toastify';

export const fetchFilms = createAsyncThunk<Films|void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Films}/fetchFilms`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Films>(ApiRoute.Films);
      return data;
    } catch {
      toast.error(ApiErrors.Films, {toastId:'fetchFilms'});
    }
  },
);
