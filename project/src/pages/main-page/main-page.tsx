import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import PromoFilmCard from '../../components/promo-film-card/promo-film-card';
import { FILMS_AMOUNT } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useEffect, useState } from 'react';
import ErrorPage from '../error-page/error-page';
import { getFilmsStatus, getFilteredFilms } from '../../store/films-data/selectors';
import { getPromoFilm, getPromoFilmStatus} from '../../store/promo-film-data/selectors';
import { fetchFilms } from '../../store/films-data/api-actions';
import { fetchPromoFilm } from '../../store/promo-film-data/api-actions';
import Loader from '../../components/loader/loader';

function MainPage(): JSX.Element {
  const [shownAmount, setShownAmount] = useState(0);
  const dispatch = useAppDispatch();
  const filteredFilms = useAppSelector(getFilteredFilms);
  const promoFilm = useAppSelector(getPromoFilm);
  const isFilmsLoading = useAppSelector(getFilmsStatus);
  const isPromoFilmLoading = useAppSelector(getPromoFilmStatus);

  useEffect(() => {
    dispatch(fetchFilms());
    dispatch(fetchPromoFilm());
  }, [dispatch]);

  useEffect(() => {
    let isMainPageMounted = true;
    isMainPageMounted && setShownAmount(Math.min(FILMS_AMOUNT, filteredFilms.length));
    return()=>{
      isMainPageMounted = false;
    };
  }, [filteredFilms]);

  if(isFilmsLoading || isPromoFilmLoading){
    return <Loader/>;
  }

  if(!promoFilm){
    return <ErrorPage/>;
  }

  const handleShownAmount = () => {
    setShownAmount((prevAmount) =>
      Math.min(prevAmount + FILMS_AMOUNT, filteredFilms.length)
    );
  };

  return (
    <>
      <Helmet>
        <title>WTW Main Page</title>
      </Helmet>
      <PromoFilmCard promoFilm={promoFilm} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <FilmsList films={filteredFilms.slice(0, shownAmount)} />
          {filteredFilms.length > shownAmount &&
            <ShowMoreButton onShown={handleShownAmount} />}
        </section>

        <footer className="page-footer">
          <Logo isLight />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
