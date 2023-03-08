import { Reviews } from '../../types/review';
import FilmReviewCard from '../film-review-card/film-review-card';

type FilmReviewsProps = {
  reviews:Reviews;
}

function FilmReviews({reviews}:FilmReviewsProps):JSX.Element{
  const reviewsHalf = reviews.length / 2;
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(0,reviewsHalf).map((review)=><FilmReviewCard review={review} key={review.id}/>)}

      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(reviewsHalf).map((review)=><FilmReviewCard review={review} key={review.id}/>)}

      </div>
    </div>
  );
}
export default FilmReviews;
