import { Film } from '../../types/film';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { getSpecificPath } from '../../utils/utils';
import { useState } from 'react';
import VideoPlayer from '../video-player/video-player';

type SmallFilmCardProps = {
 film:Film;
}

function SmallFilmCard({film}:SmallFilmCardProps):JSX.Element{
  const [activeCard, setActiveCard] = useState<number|null>(null);
  const {name, previewImage, id, previewVideoLink} = film;
  const pathName = getSpecificPath(`${AppRoute.Film}/:id`, id);
  return(
    <article className="small-film-card catalog__films-card"
      onMouseOver={()=>setActiveCard(id)}
      onMouseLeave={()=>setActiveCard(null)}
    >
      <Link className="small-film-card__link" to={pathName}>
        <div className="small-film-card__image">
          {activeCard === id ? <VideoPlayer src={previewVideoLink} poster = {previewImage} isActive={film.id === activeCard}/> : <img src={previewImage} alt={name} width="280" height="175" /> }
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={pathName}>{name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
