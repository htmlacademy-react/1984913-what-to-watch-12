import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_GENRE } from '../utils/constants';
import { changeGenre, getFilmsByGenre, loadFilms, setFilmsLoadingStatus } from './action';
import {Films, Genre} from '../types/film';

type InitialState = {
  genre: Genre;
  filteredFilms: Films;
  films: Films;
  isFilmsLoading: boolean;
}

const initialState:InitialState = {
  genre: DEFAULT_GENRE,
  filteredFilms: [],
  films: [],
  isFilmsLoading:false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.filteredFilms = state.films.filter((film) => state.genre === DEFAULT_GENRE
        ? true
        : film.genre === state.genre);
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilmsLoadingStatus, (state, action) => {
      state.isFilmsLoading = action.payload;
    });
});

export { reducer };
