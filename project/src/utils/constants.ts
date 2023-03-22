export const FILMS_AMOUNT = 8;

export const EQUAL_FILMS_MAX = 4;

export const DEFAULT_GENRE = 'All genres';

export const RATING_MAX = 10;

export const MINUTES_PER_HOUR = 60;

export const STEP_BACK = -1;

export const DATE_FORMAT = 'MMMM D, YYYY';

export const PLAYING_DELAY = 1000;

export const TimeFormat = {
  RunTimeLong: 'H[h] mm[m]',
  RunTimeShort: 'mm[m]'
} as const;

export const FilmTab = {
  Default: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews',
} as const;

export const SignInError = {
  InvalidEmail: 'Please enter a valid email address',
  InvalidUser: 'We can’t recognize this email and password combination. Please try again.',
} as const;

export const AppRoute = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: '/films',
  Review: 'review',
  Player: '/player',
  Error: '*'
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;


