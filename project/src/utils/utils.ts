import { RunTimeFormat, DATE_FORMAT, MINUTES_PER_HOUR, SECONDS_PER_HOUR, RATING_NAMES, TimeLeftFormat } from './constants';
import { generatePath } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const formatReviewDate = (date: string) => dayjs(date).format(DATE_FORMAT);

const formatReviewRaiting = (rating: number) => rating.toFixed(1);

const findRatingName = (rating: number) => {
  const possibleRating = RATING_NAMES.find((item, i, items) => rating >= item.rating
    && items[i + 1]
    ? rating < items[i + 1].rating
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

const getTimeLeft = (timeLeft:number)=>{
  const minutesLeft = dayjs.duration(timeLeft, 'seconds');
  const pattern = timeLeft >= SECONDS_PER_HOUR ? TimeLeftFormat.Long : TimeLeftFormat.Short;
  return minutesLeft.format(pattern);
};

const getSpecificPath = (route: string, id: number): string => generatePath(route, { id });

export { formatReviewDate, formatFilmDuration, formatReviewRaiting, findRatingName,getTimeLeft, getSpecificPath };
