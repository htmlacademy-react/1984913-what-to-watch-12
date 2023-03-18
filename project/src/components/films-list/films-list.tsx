import { useState } from 'react';
import { Films } from '../../types/film';
import SmallFilmCard from '../small-film-card/small-film.card';

type FilmsListProps = {
films:Films;
}

function FilmsList({films}:FilmsListProps):JSX.Element{
  const [activeCard, setActiveCard] = useState<number|null>(null);
  // eslint-disable-next-line no-console
  console.log(activeCard);
  return(
    <div className="catalog__films-list">
      {films.map((film)=> <SmallFilmCard key = {film.id} film={film} onActiveCard = {setActiveCard}/>) }
    </div>
  );
}

export default FilmsList;
