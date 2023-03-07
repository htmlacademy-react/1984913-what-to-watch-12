import { DEFAULT_GENRE } from '../../utils/constants';

type GenresListProps = {
 genres:string[];
}

function GenresList({genres}:GenresListProps):JSX.Element{
  return(
    <ul className="catalog__genres-list">
      {
        genres.map((genre)=>(
          <li className={`catalog__genres-item ${genre === DEFAULT_GENRE ? 'catalog__genres-item--active' : ''}`} key={genre}>
            <a href="/" className="catalog__genres-link">{genre}</a>
          </li>
        )
        )
      }
    </ul>
  );
}

export default GenresList;
