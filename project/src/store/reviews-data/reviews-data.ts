import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constants';
import { fetchFilmReviews, postFilmReview } from './api-actions';
import { ReviewsState } from '../../types/state';

const initialState:ReviewsState = {
  reviews: [],
  isReviewsLoading: false,
  isReviewPosting: false
};

export const reviewsData = createSlice({
  name: ReducerName.Reviews,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(fetchFilmReviews.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews = action.payload ?? [];
      })
      .addCase(postFilmReview.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postFilmReview.fulfilled, (state) => {
        state.isReviewPosting = false;
      })
      .addCase(postFilmReview.rejected, (state) => {
        state.isReviewPosting = false;
      });
  }
});
