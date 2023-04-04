import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constants';
import { Film } from '../../types/film';
import { fetchPromoFilm } from './api-actions';

type InitialState = {
  promoFilm: Film|null;
  isPromoFilmLoading: boolean;
}

const initialState:InitialState = {
  promoFilm: null,
  isPromoFilmLoading:false,
};

export const promoFilmData = createSlice({
  name: ReducerName.PromoFilm,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(fetchPromoFilm.pending, (state) => {
        state.isPromoFilmLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.isPromoFilmLoading = false;
        state.promoFilm = action.payload;
      });
  }
});
