import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthStatus, ReducerName } from '../../utils/constants';
import { makeFakeFilms, makeFakeUser } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import MyListPage from './my-list-page';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockFilms = makeFakeFilms();
const mockUser = makeFakeUser();
const store = mockStore({
  [ReducerName.User]: { authStatus: AuthStatus.Auth, userData: mockUser },
  [ReducerName.FavoriteFilms]: { films: mockFilms, isFavoriteFilmsLoading: false, },
});
const history = createMemoryHistory();

describe('Component: MyListPage', () => {
  beforeAll(() => {
    history.push(AppRoute.MyList);
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyListPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.MyList}`);
  });
  it('should redirect to main page if clicked logout', async () => {
    const mainComponent = () => <h1>This is main page</h1>;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.MyList}
                element={<MyListPage />}
              />
              <Route
                path={AppRoute.Main}
                element={mainComponent()}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );
    await waitFor(async()=> {
      await userEvent.click(screen.getByText('Sign out'));
    });
    expect(screen.getByText('This is main page')).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Main}`);
  });
});
