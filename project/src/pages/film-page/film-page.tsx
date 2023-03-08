import FilmInfo from '../../components/film-info/film-info';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import MyListButton from '../../components/my-list-button/my-list-button';
import PlayFilmButton from '../../components/play-film-button/play-film-button';
import UserBlock from '../../components/user-block/user-block';
import { Film, Films } from '../../types/film';
import { Reviews } from '../../types/review';
import { AppRoute, EQUAL_FILMS_MAX } from '../../utils/constants';
import {Link} from 'react-router-dom';
import { getSpecificPath } from '../../utils/utils';

type FilmPageProps = {
  film:Film;
  equalFilms:Films;
  reviews:Reviews;
}

function FilmPage({film,equalFilms, reviews}:FilmPageProps):JSX.Element{
  const {name, genre, released,posterImage, backgroundImage, id} = film;
  const pathName = getSpecificPath(`${AppRoute.Film}/${AppRoute.Review}`, id );
  return(
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayFilmButton filmId={id}/>
                <MyListButton/>
                <Link to={pathName} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>
            <FilmInfo film={film} reviews={reviews}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={equalFilms.slice(0,EQUAL_FILMS_MAX)}/>

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
export default FilmPage;
