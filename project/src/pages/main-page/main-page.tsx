import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import PromoFilmCard from '../../components/promo-film-card/promo-film-card';
import { Films } from '../../types/film';
import { DEFAULT_GENRE, FILMS_AMOUNT} from '../../utils/constants';

type MainPageProps = {
  films:Films;
}

function MainPage({films}:MainPageProps):JSX.Element{
  const genres = [DEFAULT_GENRE, ...new Set(films.map(({genre})=>genre))];

  return (
    <>
      <Helmet>
        <title>WTW Main Page</title>
      </Helmet>
      <PromoFilmCard promoFilm={films[25]}/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres}/>

          <FilmsList films={films.slice(0,FILMS_AMOUNT)}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <Logo isLight/>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
