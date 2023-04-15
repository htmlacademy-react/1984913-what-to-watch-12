import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from './private-route';
import { AppRoute, AuthStatus } from '../../utils/constants';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      USER: {authStatus: AuthStatus.NoAuth,userData: null}
    });
    const isAuthorized = false;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.SignIn}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute
                  isAuthorized={isAuthorized}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: {authStatus: AuthStatus.Auth},
    });
    const isAuthorized = true;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.SignIn}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute
                  isAuthorized={isAuthorized}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
