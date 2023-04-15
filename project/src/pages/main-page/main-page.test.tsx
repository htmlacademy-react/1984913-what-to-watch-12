import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../../components/history-route/history-route';
import {createMemoryHistory} from 'history';
import MainPage from './main-page';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthStatus, DEFAULT_GENRE, ReducerName } from '../../utils/constants';
import { makeFakeFilms, makeFakeUser } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockFilms = makeFakeFilms();
const mockFilm = mockFilms[0];
const mockUser = makeFakeUser();
const store = mockStore({
  [ReducerName.User]: { authStatus: AuthStatus.Auth, userData: mockUser },
  [ReducerName.Films]: { genre: DEFAULT_GENRE, films: mockFilms, isFilmsLoading: false },
  [ReducerName.PromoFilm]: { promoFilm: mockFilm, isPromoFilmLoading: false, },
  [ReducerName.FavoriteFilms]: { films: mockFilms, isFavoriteFilmsLoading: false, },
});
const history = createMemoryHistory();
describe('Component: MainPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainPage/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Main}`);
  });
});
