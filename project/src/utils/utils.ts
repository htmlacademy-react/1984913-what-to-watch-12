const formatReviewDate = (date:string)=>{
  const toFormat = new Date(date);
  console.log(toFormat.getMonth({'long'}))
  return date;
};

export {formatReviewDate};
