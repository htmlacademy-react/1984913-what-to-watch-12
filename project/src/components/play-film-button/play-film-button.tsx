import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { getSpecificPath } from '../../utils/utils';

type PlayFilmButtonProps = {
  filmId:number;
}

function PlayFilmButton({filmId}:PlayFilmButtonProps):JSX.Element{
  const navigate = useNavigate();
  const pathName = getSpecificPath(`${AppRoute.Player}/:id`, filmId);
  const handlePlayClick = ()=> navigate(pathName);
  return(
    <button className="btn btn--play film-card__button" type="button" onClick={handlePlayClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}
export default PlayFilmButton;
