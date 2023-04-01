import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import PromoFilmCard from '../../components/promo-film-card/promo-film-card';
import { FILMS_AMOUNT} from '../../utils/constants';
import { useAppSelector } from '../../hooks';

function MainPage():JSX.Element{
  const filmsByGenre = useAppSelector((state)=>state.filmsByGenre);
  return (
    <>
      <Helmet>
        <title>WTW Main Page</title>
      </Helmet>
      <PromoFilmCard promoFilm={filmsByGenre[filmsByGenre.length - 1]}/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList/>

          <FilmsList films={filmsByGenre.slice(0,FILMS_AMOUNT)}/>

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
