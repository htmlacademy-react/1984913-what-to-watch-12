import {State} from '../../types/state';
import {Films} from '../../types/film';
import { ReducerName } from '../../utils/constants';
import { createSelector } from '@reduxjs/toolkit';

export const getFavoriteFilms = (state: State): Films => state[ReducerName.FavoriteFilms].films;
export const getFavoriteFilmsAmount = (state: State): number => state[ReducerName.FavoriteFilms].films.length;
export const getFavoriteFilmsStatus = (state: State): boolean => state[ReducerName.FavoriteFilms].isFavoriteFilmsLoading;

export const getIsFilmFavorite = (filmId:number) => createSelector(
  getFavoriteFilms,
  (films):boolean=> !!films.find((film)=> film.id === filmId)
);
