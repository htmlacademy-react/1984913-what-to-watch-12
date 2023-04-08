import {State} from '../../types/state';
import {Films} from '../../types/film';
import { ReducerName } from '../../utils/constants';

export const getFavoriteFilms = (state: State): Films => state[ReducerName.FavoriteFilms].films;
export const getFavoriteFilmsAmount = (state: State): number => state[ReducerName.FavoriteFilms].films.length;
export const getIsFavoriteFilmsLoading = (state: State): boolean => state[ReducerName.FavoriteFilms].isFavoriteFilmsLoading;
