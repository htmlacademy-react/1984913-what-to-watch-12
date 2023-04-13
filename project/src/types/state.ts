import {store} from '../store/index.js';
import { Film, Films, Genre } from './film.js';
import { Reviews } from './review.js';
import { UserAuthStatus, UserData } from './user-auth-data.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type FavoriteFilmsState = {
  films: Films;
  isFavoriteFilmsLoading: boolean;
};

export type FilmState = {
  film: Film|null;
  isFilmLoading:boolean;
  hasError: boolean;
};

export type FilmsState = {
  genre: Genre;
  filteredFilms: Films;
  films: Films;
  isFilmsLoading: boolean;
};

export type PromoFilmState = {
  promoFilm: Film|null;
  isPromoFilmLoading: boolean;
}

export type ReviewsState ={
  comments: Reviews;
  isReviewsLoading: boolean;
  isReviewPosting: boolean;
}

export type SimilarFilmsState = {
  similarFilms: Films;
  isSimilarFilmsLoading:boolean;
}

export type UserState = {
  authStatus: UserAuthStatus;
  userData: UserData | null;
 }
