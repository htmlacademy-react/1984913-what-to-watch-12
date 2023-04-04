import { createSlice } from '@reduxjs/toolkit';
import { ReducerName, DEFAULT_GENRE } from '../../utils/constants';
import { Genre, Films } from '../../types/film';
import { fetchFilms } from './api-actions';
import { changeGenre, getFilmsByGenre } from './action';

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

export const filmsData = createSlice({
  name: ReducerName.Films,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(changeGenre, (state, action) => {
        state.genre = action.payload;
      })
      .addCase(getFilmsByGenre, (state) => {
        state.filteredFilms = state.films.filter((film) => state.genre === DEFAULT_GENRE
          ? true
          : film.genre === state.genre);
      })
      .addCase(fetchFilms.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.films = action.payload;
      });
  }
});
