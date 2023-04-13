import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constants';
import { fetchFilmById } from './api-actions';
import { FilmState } from '../../types/state';

const initialState:FilmState = {
  film: null,
  isFilmLoading:false,
  hasError: false,
};

export const filmData = createSlice({
  name: ReducerName.Film,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(fetchFilmById.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilmById.rejected, (state) => {
        state.isFilmLoading = false;
        state.hasError = true;
      })
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.isFilmLoading = false;
        state.film = action.payload ?? null;
        state.hasError = false;
      });
  }
});
