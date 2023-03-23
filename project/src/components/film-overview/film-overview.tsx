import { Film } from '../../types/film';
import { getRatingName } from '../../utils/utils';

type FilmOverviewProps = {
  film:Film;
}

function FilmOverview({film}:FilmOverviewProps):JSX.Element{
  const {rating, scoresCount, description, director, starring} = film;
  const ratingName = getRatingName(rating);
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingName}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">

        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
      </div>
    </>
  );
}
export default FilmOverview;
