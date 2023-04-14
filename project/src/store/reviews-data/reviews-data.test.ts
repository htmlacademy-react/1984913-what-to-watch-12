import { ReviewsState } from '../../types/state';
import { ReducerName } from '../../utils/constants';
import { makeFakeReviews } from '../../utils/mocks';
import { fetchFilmReviews, postFilmReview } from './api-actions';
import { reviewsData } from './reviews-data';

const fakeReviews = makeFakeReviews();

describe(`Reducer: ${ReducerName.Reviews}`, () => {
  let state: ReviewsState;
  beforeEach(() => {
    state = {
      reviews: [],
      isReviewsLoading: false,
      isReviewPosting: false
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('Api action: fetchFilmReviews', () => {
    it('should update loading status to "true" if is pending', () => {
      expect(reviewsData.reducer(state, { type: fetchFilmReviews.pending.type })).toEqual({ ...state, isReviewsLoading: true });
    });
    it('should update loading status to "false" and  reviews to loaded reviews if is fullfilled', () => {
      expect(reviewsData.reducer(state, { type: fetchFilmReviews.fulfilled.type, payload: fakeReviews })).toEqual({ ...state, reviews: fakeReviews });
    });
    it('should update loading status to "false" and reviews to empty array if an error occured', () => {
      expect(reviewsData.reducer(state, { type: fetchFilmReviews.rejected.type })).toEqual(state);
    });
  });

  describe('Api action: postFilmReview', () => {
    it('should update posting status if is pending', () => {
      expect(reviewsData.reducer(state, { type: postFilmReview.pending.type })).toEqual({ ...state, isReviewPosting: true });
    });
    it('should update film reviews if review is posted', () => {
      expect(reviewsData.reducer(state, { type: postFilmReview.fulfilled.type })).toEqual(state);
    });
    it('should not update film reviews if an error occured', () => {
      expect(reviewsData.reducer(state, { type: postFilmReview.rejected.type })).toEqual(state);
    });
  });
});
