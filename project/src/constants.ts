const AllGenres = {
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

const FilmTabs = {
  Default : 'Overview',
  Details : 'Details',
  Reviews : 'Reviews',
} as const;

const FILMS_AMOUNT = 8;

const DEFAULT_GENRE = 'All genres';

const RATING_MAX = 10;

const SignInErrors = {
  InvalidEmail: 'Please enter a valid email address',
  InvalidUser: 'We can’t recognize this email and password combination. Please try again.',
} as const;

export {AllGenres, FILMS_AMOUNT, DEFAULT_GENRE, RATING_MAX, SignInErrors, FilmTabs};
