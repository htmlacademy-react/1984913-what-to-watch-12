import { Films } from '../../types/film';
import SmallFilmCard from '../small-film-card/small-film.card';

type FilmsListProps = {
films:Films;
}

function FilmsList({films}:FilmsListProps):JSX.Element{
  return(
    <div className="catalog__films-list">
      {films.map((film)=> <SmallFilmCard key = {film.id} film={film}/>) }
    </div>
  );
}

export default FilmsList;
