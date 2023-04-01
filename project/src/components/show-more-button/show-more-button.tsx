 type ShowMoreButtonProps = {
  handleShown: ()=> void;
}
function ShowMoreButton({handleShown}:ShowMoreButtonProps):JSX.Element{

  return(
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleShown}>Show more</button>
    </div>
  );
}
export default ShowMoreButton;
