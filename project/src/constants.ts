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

const FILMS_AMOUNT = 8;

const DEFAULT_GENRE = 'All genres';

export {AllGenres, FILMS_AMOUNT, DEFAULT_GENRE};
