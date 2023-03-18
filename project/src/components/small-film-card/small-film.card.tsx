import { Film } from '../../types/film';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { getSpecificPath } from '../../utils/utils';

type SmallFilmCardProps = {
 film:Film;
 onActiveCard: (id: number | null) => void;
}

function SmallFilmCard({film, onActiveCard}:SmallFilmCardProps):JSX.Element{
  const {name, previewImage, id} = film;
  const pathName = getSpecificPath(`${AppRoute.Film}/:id`, id);
  return(
    <article className="small-film-card catalog__films-card"
      onMouseOver={()=>onActiveCard(id)}
      onMouseLeave={()=>onActiveCard(null)}
    >
      <Link className="small-film-card__link" to={pathName}>
        <div className="small-film-card__image">
          <img src={previewImage} alt={name} width="280" height="175" />
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={pathName}>{name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
