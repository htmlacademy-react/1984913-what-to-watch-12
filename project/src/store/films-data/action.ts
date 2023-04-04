import {createAction} from '@reduxjs/toolkit';
import { Genre } from '../../types/film';

export const changeGenre = createAction('genre/changeGenre', (genre:Genre)=>({payload:genre}));
export const getFilmsByGenre = createAction('films/getFilmsByGenre');
