
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FilmReviewCard from '../film-review-card/film-review-card';
import { fetchFilmReviews } from '../../store/reviews-data/api-actions';
import { getReviews, getReviewsStatus } from '../../store/reviews-data/selectors';

type FilmReviewsProps = {
  filmId:number;
}

function FilmReviews({filmId}:FilmReviewsProps):JSX.Element{
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchFilmReviews(filmId));
  },[dispatch, filmId]);
  const reviews = useAppSelector(getReviews);
  const reviewsHalf = Math.round(reviews.length / 2);
  const sortedReviews = [...reviews].sort((a,b)=>b.rating - a.rating);
  const isReviewsLoading = useAppSelector(getReviewsStatus);
  if(isReviewsLoading){
    return <h1 style={{color:'#252525'}}>Loading...</h1>;
  }
  return (
    <div className="film-card__reviews film-card__row">
      { !reviews.length ? (<h3 style={{color:'#252525'}}>Leave the first review yourself</h3>) : (
        <>
          <div className="film-card__reviews-col">
            {sortedReviews.slice(0,reviewsHalf).map((review)=><FilmReviewCard review={review} key={review.id}/>)}
          </div>
          <div className="film-card__reviews-col">
            {sortedReviews.slice(reviewsHalf).map((review)=><FilmReviewCard review={review} key={review.id}/>)}
          </div>
        </>
      )}
    </div>
  );
}

export default FilmReviews;
