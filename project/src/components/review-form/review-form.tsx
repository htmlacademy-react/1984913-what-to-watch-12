import { Fragment, ChangeEvent, FormEvent, useState } from 'react';
import { RATING_MAX } from '../../utils/constants';

function ReviewForm(): JSX.Element {
  const defaultData = {
    'rating': 0,
    'comment': '',
  };
  const [formData, setFormData] = useState(defaultData);

  const stars = Array.from({ length: RATING_MAX }, (_, i) => RATING_MAX - i);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (
    event: FormEvent<HTMLElement>
  ) => {
    event.preventDefault();
    setFormData(defaultData);
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {stars.map((star) =>
              (
                <Fragment key={star}>
                  <input className="rating__input" id={`star-${star}`} type="radio" name="rating" value={star} onChange={handleChange} />
                  <label className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
                </Fragment>
              )
            )}

          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="comment" id="review-text" placeholder="Review text" onChange={handleChange} value={formData.comment}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
