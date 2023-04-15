import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { makeFakeFilm } from '../../utils/mocks';
import PromoFilmCard from './promo-film-card';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus, ReducerName } from '../../utils/constants';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const mockFilm = makeFakeFilm();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
describe('Component: PromoFilmCard', () => {
  const store = mockStore({
    [ReducerName.User]: { authStatus: AuthStatus.Auth },
    [ReducerName.FavoriteFilms]: { films: [] }
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PromoFilmCard promoFilm={mockFilm} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );
    const nameTextElement = screen.getByText(`${mockFilm.name}`);
    const genreTextElement = screen.getByText(`${mockFilm.genre}`);
    const releasedTextElement = screen.getByText(`${mockFilm.released}`);
    const playButtonElement = screen.getByText('Play');

    expect(nameTextElement).toBeInTheDocument();
    expect(genreTextElement).toBeInTheDocument();
    expect(releasedTextElement).toBeInTheDocument();
    expect(playButtonElement).toBeInTheDocument();
  });
});
