import { createSlice } from '@reduxjs/toolkit';
import { ReducerName} from '../../utils/constants';
import { Films } from '../../types/film';
import { fetchSimilarFilms } from './api-actions';

type InitialState = {
  similarFilms: Films;
  isSimilarFilmsLoading:boolean;
}

const initialState:InitialState = {
  similarFilms: [],
  isSimilarFilmsLoading:false,
};

export const similarFilmsData = createSlice({
  name: ReducerName.Films,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isSimilarFilmsLoading = true;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.isSimilarFilmsLoading = false;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.isSimilarFilmsLoading = false;
        state.similarFilms = action.payload;
      });
  }
});
