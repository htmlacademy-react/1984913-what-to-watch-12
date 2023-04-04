import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { APIRoute } from '../utils/constants';
import { loadComments, loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms, setCommentsLoadingStatus, setFilmLoadingStatus, setFilmsLoadingStatus, setPromoFilmLoadingStatus } from './action';
import { Film, Films } from '../types/film.js';
import { Reviews } from '../types/review.js';

export const fetchFilms = createAsyncThunk<void, undefined, {
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

export const fetchPromoFilm = createAsyncThunk<void, undefined, {
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

export const fetchFilmById = createAsyncThunk<void, number, {
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
export const fetchFilmComments = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmComments',
  async (filmId, {dispatch, extra: api}) => {
    dispatch(setCommentsLoadingStatus(true));
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${filmId}`);
    dispatch(setCommentsLoadingStatus(false));
    dispatch(loadComments(data));
  },
);

export const fetchSimilarFilms = createAsyncThunk<void, number, {
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

