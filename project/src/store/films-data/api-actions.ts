import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.js';
import { APIRoute, ReducerName } from '../../utils/constants';
import { Films } from '../../types/film.js';

export const fetchFilms = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Films}/fetchFilms`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    return data;
  },
);
