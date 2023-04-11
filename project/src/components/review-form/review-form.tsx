import { Fragment, ChangeEvent, FormEvent, useState } from 'react';
import { RATING_MAX, ReviewLength } from '../../utils/constants';
import { NewReview } from '../../types/review';
import { useAppSelector } from '../../hooks';
import { getPostingStatus } from '../../store/reviews-data/selectors';

const DEFAULT_REVIEW = {
  rating: 0,
  comment: '',
};

const RATING_STARS = Array.from(
  { length: RATING_MAX },
  (_, i) => RATING_MAX - i
);

type ReviewFormProps = {
  onReviewSubmit: (review:NewReview)=>void;
}

function ReviewForm({onReviewSubmit}:ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState(DEFAULT_REVIEW);
  const isReviewPosting = useAppSelector(getPostingStatus);

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    const currentValue = name === 'rating' ? +value : value;
    setFormData({ ...formData, [name]: currentValue });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLElement>) => {
    evt.preventDefault();
    setFormData(DEFAULT_REVIEW);
    onReviewSubmit(formData);
  };

  const isDisabled = isReviewPosting
  || !formData.rating
  || formData.comment.length < ReviewLength.Min
  || formData.comment.length > ReviewLength.Max;

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {RATING_STARS.map((star) => (
              <Fragment key={star}>
                <input
                  className="rating__input"
                  id={`star-${star}`}
                  type="radio"
                  name="rating"
                  value={star}
                  onChange={handleInputChange}
                  checked={star === formData.rating}
                  disabled={isReviewPosting}
                />
                <label className="rating__label" htmlFor={`star-${star}`}>
                  Rating {star}
                </label>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="comment"
            id="review-text"
            placeholder="Review text"
            onChange={handleInputChange}
            value={formData.comment}
            disabled={isReviewPosting}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isDisabled}>
              {isReviewPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
