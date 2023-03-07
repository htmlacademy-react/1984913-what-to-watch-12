const AllGenre = {
  Default : 'All genres',
  Comedies : 'Comedies',
  Crime : 'Crime',
  Documentary: 'Documentary',
  Dramas: 'Dramas',
  Horror: 'Horror',
  Family: 'Kids & Family',
  Romance: 'Romance',
  SciFi: 'Sci-Fi',
  Thrillers: 'Thrillers'
} as const;

const FilmTab = {
  Default : 'Overview',
  Details : 'Details',
  Reviews : 'Reviews',
} as const;

const FILMS_AMOUNT = 8;

const EQUAL_FILMS_MAX = 4;

const DEFAULT_GENRE = 'All genres';

const RATING_MAX = 10;

const SignInError = {
  InvalidEmail: 'Please enter a valid email address',
  InvalidUser: 'We can’t recognize this email and password combination. Please try again.',
} as const;

export {AllGenre, FILMS_AMOUNT,EQUAL_FILMS_MAX, DEFAULT_GENRE, RATING_MAX, SignInError, FilmTab};
