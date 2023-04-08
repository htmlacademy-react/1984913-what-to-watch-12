import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre } from '../../store/films-data/action';
import { DEFAULT_GENRE} from '../../utils/constants';
import { getActiveGenre, getFilmsData } from '../../store/films-data/selectors';
import { useEffect } from 'react';


function GenresList():JSX.Element{
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const searchGenre = searchParams.get('genre');
  const activeGenre = useAppSelector(getActiveGenre);
  const filmsData = useAppSelector(getFilmsData);
  const genres = [DEFAULT_GENRE, ...new Set(filmsData.map(({genre})=>genre))];

  useEffect(() => {
    if(searchGenre === activeGenre){
      return;
    }

    if(searchGenre){
      dispatch(changeGenre(searchGenre));
      return;
    }

    dispatch(changeGenre(DEFAULT_GENRE));
  }, [dispatch, activeGenre, searchGenre ]);

  return(
    <ul className="catalog__genres-list">
      {
        genres.map((genre)=>(
          <li className={`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
            <Link to={`?genre=${genre}`}
              className="catalog__genres-link"
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
