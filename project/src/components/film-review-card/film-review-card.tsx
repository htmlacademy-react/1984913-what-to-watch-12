import { Review } from '../../types/review';
import { formatReviewDate, formatReviewRaiting } from '../../utils/utils';

type FilmReviewCardProps = {
review:Review;
}

function FilmReviewCard({review}:FilmReviewCardProps):JSX.Element{
  const {comment, date, user, rating} = review;
  const formatedDate = formatReviewDate(date);
  return(
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date}>{formatedDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{formatReviewRaiting(rating)}</div>
    </div>

  );
}

export default FilmReviewCard;
