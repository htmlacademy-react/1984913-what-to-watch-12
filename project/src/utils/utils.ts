import { FormatPattern } from './constants';
import dayjs from 'dayjs';
import duration from'dayjs/plugin/duration';
dayjs.extend(duration);

const formatReviewDate = (date:string)=> dayjs(date).format(FormatPattern.Date);

const formatRunTime = (runTime:number)=>{
  const currentDuration = dayjs.duration(runTime, 'm');
  const pattern = runTime > 59 ? FormatPattern.RunTimeLong : FormatPattern.RunTimeShort;
  return currentDuration.format(pattern);
};

export {formatReviewDate, formatRunTime};
