import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constants';
import { fetchPromoFilm } from './api-actions';
import { PromoFilmState } from '../../types/state';

const initialState:PromoFilmState = {
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
        state.promoFilm = action.payload ?? null;
      });
  }
});
