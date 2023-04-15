import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { makeFakeFilm } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import SmallFilmCard from './small-film-card';
import { AppRoute } from '../../utils/constants';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockFilm = makeFakeFilm();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
describe('Component: SmallFilmCard', () => {
  const store = mockStore();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <SmallFilmCard film={mockFilm} />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );
    const nameTextElement = screen.getByText(`${mockFilm.name}`);
    expect(nameTextElement).toBeInTheDocument();
    const linkElements = screen.getAllByRole('link');
    linkElements.forEach((link) => {
      expect(link).toHaveClass('small-film-card__link');
    });
  });

  it('should redirect to film page when user clicked to card link', async () => {
    history.push('/');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`${AppRoute.Film}/${mockFilm.id}`}
            element={<h1>This is film page</h1>}
          />
          <Route
            path='*'
            element={<SmallFilmCard film={mockFilm} />}
          />
        </Routes>
      </HistoryRouter>);
    expect(screen.queryByTestId('small-film-card-name')).not.toHaveValue(mockFilm.name);
    await userEvent.click(screen.getAllByRole('link')[0]);
    expect(screen.getByText('This is film page')).toBeInTheDocument();
  });


});
