import { RunTimeFormat, DATE_FORMAT, MINUTES_PER_HOUR, RATING_NAMES } from './constants';
import { generatePath } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Films } from '../types/film';
dayjs.extend(duration);

const formatReviewDate = (date: string) => dayjs(date).format(DATE_FORMAT);

const formatReviewRaiting = (rating: number) => rating.toFixed(1);

const findRatingName = (rating: number) => {
  const possibleRating = RATING_NAMES.find((item, i, arr) => rating >= item.rating
    && arr[i + 1]
    ? rating < arr[i + 1].rating
    : true);
  if(possibleRating){
    return possibleRating.name;
  }else{
    return RATING_NAMES[0].name;
  }
};

const formatFilmDuration = (minutes: number) => {
  const currentDuration = dayjs.duration(minutes, 'm');
  const pattern = minutes >= MINUTES_PER_HOUR ? RunTimeFormat.Long : RunTimeFormat.Short;
  return currentDuration.format(pattern);
};

const getSpecificPath = (route: string, id: number): string => generatePath(route, { id });

const findCurrentFilm = (films: Films, id: number) => films.find((film) => film.id === id) || null;

export { formatReviewDate, formatFilmDuration, formatReviewRaiting, findRatingName, findCurrentFilm, getSpecificPath };
