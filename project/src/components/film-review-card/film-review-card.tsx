import { Review } from '../../types/review';

type FilmReviewCardProps = {
review:Review;
}

function FilmReviewCard({review}:FilmReviewCardProps):JSX.Element{
  const {comment, date, user, rating} = review;
  return(
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date.slice(0,10)}>{date.slice(0,10)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>

  );
}

export default FilmReviewCard;
