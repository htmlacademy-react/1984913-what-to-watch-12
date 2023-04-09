import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constants';
import { Reviews } from '../../types/review';
import { fetchFilmComments, postFilmReview } from './api-actions';

type InitialState = {
  comments: Reviews;
  isCommentsLoading: boolean;
  isReviewPosting: boolean;
}

const initialState:InitialState = {
  comments: [],
  isCommentsLoading: false,
  isReviewPosting: false
};

export const commentsData = createSlice({
  name: ReducerName.Comments,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(fetchFilmComments.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchFilmComments.fulfilled, (state, action) => {
        state.isCommentsLoading = false;
        state.comments = action.payload ?? [];
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
