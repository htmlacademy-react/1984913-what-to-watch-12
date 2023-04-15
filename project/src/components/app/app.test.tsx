import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { AppRoute, AuthStatus, DEFAULT_GENRE } from '../../utils/constants';
import { makeFakeFilms, makeFakeReviews, makeFakeUser } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockFilms = makeFakeFilms();
const mockFilm = mockFilms[0];
const mockReviews = makeFakeReviews();
const mockUser = makeFakeUser();
const store = mockStore({
  USER: { authStatus: AuthStatus.Auth, userData: mockUser },
  FILMS: { genre: DEFAULT_GENRE, films: mockFilms, isFilmsLoading: false },
  PROMO: { promoFilm: mockFilm, isPromoFilmLoading: false, },
  FILM: { film: mockFilm, isFilmLoading: false, hasError: false, },
  SIMILAR: { similarFilms: mockFilms, isSimilarFilmsLoading: false, },
  FAVORITE: { films: mockFilms, isFavoriteFilmsLoading: false, },
  REVIEWS: { reviews: mockReviews, isReviewsLoading: false, isReviewPosting: false },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);
    render(fakeApp);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/films/filmId"', () => {
    history.push(`${AppRoute.Film}/${mockFilm.id}`);

    render(fakeApp);

    expect(screen.getByText(`${mockFilm.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilm.genre}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilm.released}`)).toBeInTheDocument();
    expect(screen.getByText('More like this')).toBeInTheDocument();
  });

  it('should render "ErrorPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go back to main page')).toBeInTheDocument();
  });
});
