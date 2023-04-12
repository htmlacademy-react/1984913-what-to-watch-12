import {createSelector} from '@reduxjs/toolkit';
import { Films, Genre } from '../../types/film';
import { State } from '../../types/state';
import { ReducerName,DEFAULT_GENRE } from '../../utils/constants';

export const getFilmsData = (state:State):Films => state[ReducerName.Films].films;
export const getFilmsStatus = (state:State):boolean => state[ReducerName.Films].isFilmsLoading;
export const getActiveGenre = (state:State):Genre => state[ReducerName.Films].genre;

export const getFilteredFilms = createSelector(
  [getActiveGenre, getFilmsData],
  (genre, films): Films => films.filter((film) => {
    if (genre === DEFAULT_GENRE) {
      return true;
    }

    return film.genre === genre;
  })
);
