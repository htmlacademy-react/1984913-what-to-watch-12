import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../utils/constants';
import { filmsData } from './films-data/films-data';
import { promoFilmData } from './promo-film-data/promo-film-data';
import { filmData } from './film-data/film-data';
import { similarFilmsData } from './similar-films-data/similar-films';
import { commentsData } from './comments-data/comments-data';

export const rootReducer = combineReducers({
  [ReducerName.Films]: filmsData.reducer,
  [ReducerName.PromoFilm]: promoFilmData.reducer,
  [ReducerName.Film]: filmData.reducer,
  [ReducerName.SimilarFilms]: similarFilmsData.reducer,
  [ReducerName.Comments]: commentsData.reducer
});