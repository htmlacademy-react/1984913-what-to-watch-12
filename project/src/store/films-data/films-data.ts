import { createSlice } from '@reduxjs/toolkit';
import { ReducerName, DEFAULT_GENRE } from '../../utils/constants';
import { fetchFilms } from './api-actions';
import { changeGenre } from './action';
import { FilmsState } from '../../types/state';

const initialState:FilmsState = {
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
      .addCase(fetchFilms.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.films = action.payload ?? [];
      });
  }
});
