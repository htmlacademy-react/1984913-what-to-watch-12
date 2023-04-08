import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms, getFavoriteFilmsAmount } from '../../store/favorite-films-data/selectors';

function MyListPage():JSX.Element{
  const films = useAppSelector(getFavoriteFilms);
  const filmsAmount = useAppSelector(getFavoriteFilmsAmount);
  return(
    <div className="user-page">
      <Helmet>
        <title>WTW My List</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{filmsAmount}</span></h1>
        <UserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={films}/>
      </section>

      <footer className="page-footer">
        <Logo isLight/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
export default MyListPage;
