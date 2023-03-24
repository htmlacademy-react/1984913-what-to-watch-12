import { Fragment, ChangeEvent, FormEvent, useState } from 'react';
import { RATING_MAX } from '../../utils/constants';

const DEFAULT_REVIEW = {
  rating: 0,
  comment: '',
};

const RATING_STARS = Array.from(
  { length: RATING_MAX },
  (_, i) => RATING_MAX - i
);

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState(DEFAULT_REVIEW);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const currentValue = name === 'rating' ? +value : value;
    setFormData({ ...formData, [name]: currentValue });
  };

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    setFormData(DEFAULT_REVIEW);
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                  checked={star === formData.rating}
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
            onChange={handleChange}
            value={formData.comment}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
