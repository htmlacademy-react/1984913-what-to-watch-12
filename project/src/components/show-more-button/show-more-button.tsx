 type ShowMoreButtonProps = {
  onHandleShown: ()=> void;
}
function ShowMoreButton({onHandleShown}:ShowMoreButtonProps):JSX.Element{

  return(
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onHandleShown}>Show more</button>
    </div>
  );
}
export default ShowMoreButton;
