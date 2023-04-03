import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import PromoFilmCard from '../../components/promo-film-card/promo-film-card';
import { FILMS_AMOUNT } from '../../utils/constants';
import { useAppSelector } from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useEffect, useState } from 'react';

function MainPage(): JSX.Element {
  const [shownAmount, setShownAmount] = useState(0);
  const filteredFilms = useAppSelector((state) => state.filteredFilms);

  useEffect(() => {
    setShownAmount(Math.min(FILMS_AMOUNT, filteredFilms.length));
  }, [filteredFilms]);

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
      <PromoFilmCard promoFilm={filteredFilms[filteredFilms.length - 1]} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <FilmsList films={filteredFilms.slice(0, shownAmount)} />
          {filteredFilms.length > shownAmount &&
            <ShowMoreButton onHandleShown={handleShownAmount} />}
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
