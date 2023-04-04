import { Films, Genre } from '../../types/film';
import { State } from '../../types/state';
import { ReducerName } from '../../utils/constants';

export const getFilmsData = (state:State):Films => state[ReducerName.Films].films;
export const getFilmsStatus = (state:State):boolean => state[ReducerName.Films].isFilmsLoading;
export const getActiveGenre = (state:State):Genre => state[ReducerName.Films].genre;
export const getFilteredFilms = (state:State):Films => state[ReducerName.Films].filteredFilms;
