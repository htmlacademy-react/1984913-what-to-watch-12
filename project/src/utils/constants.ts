export const FILMS_AMOUNT = 8;

export const EQUAL_FILMS_MAX = 4;

export const DEFAULT_GENRE = 'All genres';

export const RATING_MAX = 10;

export const MINUTES_PER_HOUR = 60;

export const FormatPattern = {
  Date: 'MMMM D, YYYY',
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


