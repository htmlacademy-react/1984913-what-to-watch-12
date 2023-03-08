import { FormatPattern, MINUTES_PER_HOUR } from './constants';
import dayjs from 'dayjs';
import duration from'dayjs/plugin/duration';
dayjs.extend(duration);

const formatReviewDate = (date:string)=> dayjs(date).format(FormatPattern.Date);

const formatFilmDuration = (minutes:number)=>{
  const currentDuration = dayjs.duration(minutes, 'm');
  const pattern = minutes >= MINUTES_PER_HOUR ? FormatPattern.RunTimeLong : FormatPattern.RunTimeShort;
  return currentDuration.format(pattern);
};

export {formatReviewDate, formatFilmDuration};
