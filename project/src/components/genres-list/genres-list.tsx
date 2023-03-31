import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre, getFilmsByGenre } from '../../store/action';

type GenresListProps = {
 genres:string[];
}

function GenresList({genres}:GenresListProps):JSX.Element{
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector((state)=>state.genre);
  return(
    <ul className="catalog__genres-list">
      {
        genres.map((genre)=>(
          <li className={`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
            <Link to={`?genre=${genre}`}
              className="catalog__genres-link"
              onClick={() =>{
                dispatch(changeGenre(genre));
                dispatch(getFilmsByGenre());}}
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
