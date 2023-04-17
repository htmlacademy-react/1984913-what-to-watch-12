import { createSlice } from '@reduxjs/toolkit';
import { ReducerName} from '../../utils/constants';
import { fetchSimilarFilms } from './api-actions';
import { SimilarFilmsState } from '../../types/state';

const initialState:SimilarFilmsState = {
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
        state.similarFilms = action.payload ?? [];
      });
  }
});
