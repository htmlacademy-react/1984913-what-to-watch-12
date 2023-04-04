import { Film } from '../../types/film';
import { State } from '../../types/state';
import { ReducerName } from '../../utils/constants';

export const getFilm = (state:State):Film|null => state[ReducerName.Film].film;
export const getFilmStatus = (state:State):boolean => state[ReducerName.Film].isFilmLoading;
export const getFilmError = (state:State):boolean => state[ReducerName.Film].hasError;
