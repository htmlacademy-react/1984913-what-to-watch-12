import {createAction} from '@reduxjs/toolkit';
import { Film, Films, Genre } from '../types/film';

export const changeGenre = createAction('genre/changeGenre', (genre:Genre)=>({payload:genre}));
export const getFilmsByGenre = createAction('films/getFilmsByGenre');

export const loadFilms = createAction<Films>('data/loadFilms');
export const setFilmsLoadingStatus = createAction<boolean>('data/setFilmsLoadingStatus');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');
export const setPromoFilmLoadingStatus = createAction<boolean>('data/setPromoFilmLoadingStatus');

export const loadFilm = createAction<Film>('data/loadFilm');
export const setFilmLoadingStatus = createAction<boolean>('data/setFilmLoadingStatus');

export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');
export const setSimilatFilmsLoadingStatus = createAction<boolean>('data/setSimilatFilmsLoadingStatus');
