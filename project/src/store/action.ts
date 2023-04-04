import {createAction} from '@reduxjs/toolkit';
import { Film, Films, Genre } from '../types/film';

export const changeGenre = createAction('genre/changeGenre', (genre:Genre)=>({payload:genre}));
export const getFilmsByGenre = createAction('films/getFilmsByGenre');

export const loadFilms = createAction<Films>('data/loadFilms');
export const setFilmsLoadingStatus = createAction<boolean>('data/setFilmsLoadingStatus');
export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');
export const setPromoFilmLoadingStatus = createAction<boolean>('data/setPromoFilmLoadingStatus');

