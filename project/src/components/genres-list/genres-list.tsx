import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre, getFilmsByGenre } from '../../store/films-data/action';
import { DEFAULT_GENRE} from '../../utils/constants';
import { useEffect } from 'react';
import { getActiveGenre, getFilmsData } from '../../store/films-data/selectors';


function GenresList():JSX.Element{
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getActiveGenre);
  const filmsData = useAppSelector(getFilmsData);
  const genres = [DEFAULT_GENRE, ...new Set(filmsData.map(({genre})=>genre))];

  useEffect(()=>{
    dispatch(getFilmsByGenre());
  },[dispatch, activeGenre]);

  return(
    <ul className="catalog__genres-list">
      {
        genres.map((genre)=>(
          <li className={`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
            <Link to={`?genre=${genre}`}
              className="catalog__genres-link"
              onClick={() =>{
                dispatch(changeGenre(genre));
              }}
            >{genre}
            </Link>
          </li>
        )
        )
      }
    </ul>
  );
}

export default GenresList;
