import { Film } from '../../types/film';
import {Fragment} from 'react';
import { formatRunTime } from '../../utils/utils';
type FilmDetailsProps = {
  film:Film;
}

function FilmDetails({film}:FilmDetailsProps):JSX.Element{
  const {genre, director, starring, runTime, released} = film;
  const formatedRunTime = formatRunTime(runTime);
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starring.map((star) => (
              <Fragment key={star}>
                {star} <br />
              </Fragment>
            ))}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{formatedRunTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">{genre}</strong>
          <span className="film-card__details-value">Comedy</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}
export default FilmDetails;
