import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilmsAmount, getIsFilmFavorite } from '../../store/favorite-films-data/selectors';
import { getIsAuthorized } from '../../store/user-data/selectors';
import { fetchFavoriteFilms, postFavoriteFilm } from '../../store/favorite-films-data/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { useEffect } from 'react';

type MyListButtonProps = {
  filmId: number;
}

function MyListButton({ filmId }: MyListButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filmsAmount = useAppSelector(getFavoriteFilmsAmount);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const isFavorite = useAppSelector(getIsFilmFavorite(filmId));
  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavoriteFilms());
    }
  }, [isAuthorized, dispatch]);
  const handleButtonClick = () => {
    isAuthorized
      ? dispatch(postFavoriteFilm({ filmId, status: isFavorite ? 0 : 1 }))
      : navigate(AppRoute.SignIn);
  };
  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
      {isAuthorized && isFavorite ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      )
        : (
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
        )}
      <span>My list</span>
      <span className="film-card__count">{isAuthorized ? filmsAmount : 0}</span>
    </button>
  );
}
export default MyListButton;
