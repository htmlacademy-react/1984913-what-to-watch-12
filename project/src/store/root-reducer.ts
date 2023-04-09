import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../utils/constants';
import { filmsData } from './films-data/films-data';
import { promoFilmData } from './promo-film-data/promo-film-data';
import { filmData } from './film-data/film-data';
import { similarFilmsData } from './similar-films-data/similar-films';
import { commentsData } from './reviews-data/reviews-data';
import { userData } from './user-data/user-data';
import { favoriteFilmsData } from './favorite-films-data/favorite-films-data';

export const rootReducer = combineReducers({
  [ReducerName.Films]: filmsData.reducer,
  [ReducerName.PromoFilm]: promoFilmData.reducer,
  [ReducerName.Film]: filmData.reducer,
  [ReducerName.SimilarFilms]: similarFilmsData.reducer,
  [ReducerName.FavoriteFilms]: favoriteFilmsData.reducer,
  [ReducerName.Reviews]: commentsData.reducer,
  [ReducerName.User]: userData.reducer
});
