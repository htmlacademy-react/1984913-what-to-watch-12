import FilmInfo from '../../components/film-info/film-info';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import MyListButton from '../../components/my-list-button/my-list-button';
import PlayFilmButton from '../../components/play-film-button/play-film-button';
import UserBlock from '../../components/user-block/user-block';
import { AppRoute, EQUAL_FILMS_MAX } from '../../utils/constants';
import {Link, useParams} from 'react-router-dom';
import { getSpecificPath } from '../../utils/utils';
import { Helmet } from 'react-helmet-async';
import ErrorPage from '../error-page/error-page';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { fetchFilmById } from '../../store/film-data/api-actions';
import { fetchSimilarFilms } from '../../store/similar-films-data/api-actions';
import { fetchFilmComments } from '../../store/comments-data/api-actions';
import { getFilm, getFilmError, getFilmStatus } from '../../store/film-data/selectors';
import { getSimilarFilms, getSimilarFilmsStatus } from '../../store/similar-films-data/selectors';
import { getComments } from '../../store/comments-data/selectors';

function FilmPage():JSX.Element{
  const dispatch = useAppDispatch();
  const {id:filmId} = useParams();
  const id = Number(filmId);
  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getFilmStatus);
  const similarFilms = useAppSelector(getSimilarFilms);
  const isSimilarFilmsLoading = useAppSelector(getSimilarFilmsStatus);
  const reviews = useAppSelector(getComments);
  const filmError = useAppSelector(getFilmError);

  useEffect(()=>{
    if(id){
      dispatch(fetchFilmById(id));
      dispatch(fetchSimilarFilms(id));
      dispatch(fetchFilmComments(id));
    }
  },[dispatch, id]);

  if(isFilmLoading || isSimilarFilmsLoading ){
    return <Loader/>;
  }

  if(!id || !film || filmError){
    return <ErrorPage/>;
  }


  const isAuthorized = true;

  const {name, genre, released,posterImage, backgroundImage, backgroundColor} = film ;
  const pathName = getSpecificPath(`${AppRoute.Film}/:id/${AppRoute.Review}`, id );
  return(
    <>
      <Helmet>
        <title>WTW: {name}</title>
      </Helmet>

      <section className="film-card film-card--full" style={{backgroundColor}}>
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
                {isAuthorized && <Link to={pathName} className="btn film-card__button">Add review</Link> }
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
          <FilmsList films={similarFilms.filter((item)=> item.id !== id).slice(0,EQUAL_FILMS_MAX)}/>
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
