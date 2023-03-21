import { TimeFormat, DATE_FORMAT, MINUTES_PER_HOUR } from './constants';
import { generatePath } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Films } from '../types/film';
dayjs.extend(duration);

const formatReviewDate = (date: string) => dayjs(date).format(DATE_FORMAT);

const formatReviewRaiting = (rating: number) => rating.toFixed(1);

const formatFilmDuration = (minutes: number) => {
  const currentDuration = dayjs.duration(minutes, 'm');
  const pattern = minutes >= MINUTES_PER_HOUR ? TimeFormat.RunTimeLong : TimeFormat.RunTimeShort;
  return currentDuration.format(pattern);
};

const getSpecificPath = (route: string, id: number): string => generatePath(route, { id });

const findCurrentFilm = (films: Films, id: number) => films.find((film) => film.id === id) || null;

export { formatReviewDate, formatFilmDuration, formatReviewRaiting, findCurrentFilm, getSpecificPath };
