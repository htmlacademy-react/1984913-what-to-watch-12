import { createReducer } from '@reduxjs/toolkit';
import { mockFilms } from '../mocks/mock-films';
import { DEFAULT_GENRE } from '../utils/constants';
import { changeGenre, getFilmsByGenre } from './action';

const ALL_FILMS = mockFilms;

const initialState = {
  genre: DEFAULT_GENRE,
  filmsByGenre: ALL_FILMS,
  films: ALL_FILMS
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.filmsByGenre = ALL_FILMS.filter((film) => state.genre === DEFAULT_GENRE
        ? true
        : film.genre === state.genre);
    });
});

export { reducer };
