 type ShowMoreButtonProps = {
  onShown: ()=> void;
}
function ShowMoreButton({onShown}:ShowMoreButtonProps):JSX.Element{

  return(
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onShown}>Show more</button>
    </div>
  );
}
export default ShowMoreButton;
