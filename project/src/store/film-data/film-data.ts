import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constants';
import { Film } from '../../types/film';
import { fetchFilmById } from './api-actions';

type InitialState = {
  film: Film|null;
  isFilmLoading:boolean;
}

const initialState:InitialState = {
  film: null,
  isFilmLoading:false,
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
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.isFilmLoading = false;
        state.film = action.payload;
      });
  }
});
