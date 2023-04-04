import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { APIRoute } from '../utils/constants';
import { loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms, setFilmLoadingStatus, setFilmsLoadingStatus, setPromoFilmLoadingStatus } from './action';
import { Film, Films } from '../types/film.js';

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoadingStatus(true));
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(setFilmsLoadingStatus(false));
    dispatch(loadFilms(data));
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setPromoFilmLoadingStatus(true));
    const {data} = await api.get<Film>(APIRoute.PromoFilm);
    dispatch(setPromoFilmLoadingStatus(false));
    dispatch(loadPromoFilm(data));
  },
);

export const fetchFilmByIdAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmById',
  async (filmId, {dispatch, extra: api}) => {
    dispatch(setFilmLoadingStatus(true));
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    dispatch(setFilmLoadingStatus(false));
    dispatch(loadFilm(data));
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmById',
  async (filmId, {dispatch, extra: api}) => {
    dispatch(setFilmLoadingStatus(true));
    const {data} = await api.get<Films>(`${APIRoute.Films}/${filmId}${APIRoute.SimilarFilms}`);
    dispatch(setFilmLoadingStatus(false));
    dispatch(loadSimilarFilms(data));
  },
);

