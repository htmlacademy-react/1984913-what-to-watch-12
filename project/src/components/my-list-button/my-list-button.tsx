type MyListButtonProps ={
  inList?:boolean;
}
function MyListButton({inList}:MyListButtonProps):JSX.Element{
  return(
    <button className="btn btn--list film-card__button" type="button">
      { inList ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      )
        : (
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
        )}
      <span>My list</span>
      <span className="film-card__count">9</span>
    </button>
  );
}
export default MyListButton;
