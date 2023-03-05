import { RATING_MAX } from '../../constants';
import {Fragment} from 'react';

function ReviewForm():JSX.Element{
  const stars = Array.from({length:RATING_MAX}, (_, i)=>RATING_MAX - i);
  return(
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {stars.map((star)=>
              (
                <Fragment key={star}>
                  <input className="rating__input" id={`star-${star}`} type="radio" name="rating" value={star} />
                  <label className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
                </Fragment>
              )
            )}

          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
