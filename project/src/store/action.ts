import {createAction} from '@reduxjs/toolkit';
import { Films, Genre } from '../types/film';

export const changeGenre = createAction('genre/changeGenre', (genre:Genre)=>({payload:genre}));
export const getFilmsByGenre = createAction('films/getFilmsByGenre');
export const getAllFilms = createAction('films/getAllFilms');

export const loadFilms = createAction<Films>('data/loadFilms');
export const setFilmsLoadingStatus = createAction<boolean>('data/setFilmsLoadingStatus');
