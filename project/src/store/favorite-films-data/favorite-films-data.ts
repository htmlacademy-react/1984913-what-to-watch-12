import {createSlice} from '@reduxjs/toolkit';
import {fetchFavoriteFilms, postFavoriteFilm} from './api-actions';
import {ReducerName} from '../../utils/constants';
import { FavoriteFilmsState } from '../../types/state';

const initialState:FavoriteFilmsState = {
  films: [],
  isFavoriteFilmsLoading: false,
};

export const favoriteFilmsData = createSlice({
  name: ReducerName.FavoriteFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.isFavoriteFilmsLoading = true;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.isFavoriteFilmsLoading = false;
        state.films = action.payload ?? [];
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.isFavoriteFilmsLoading = false;
        state.films = [];
      })
      .addCase(postFavoriteFilm.fulfilled, (state, action) => {
        const film = action.payload;
        if (film){
          if(film.isFavorite) {
            state.films = state.films.concat(film);
          }else {
            state.films = state.films.filter((item)=> item.id !== film.id);
          }
        }});
  }
});
