import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import UserBlock from './user-block';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthStatus, ReducerName } from '../../utils/constants';
import { makeFakeUser } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockUser = makeFakeUser();

describe('Component: UserBlock', () => {
  it('should render correctly', () => {
    const store = mockStore({ [ReducerName.User]: { authStatus: AuthStatus.Auth, userData: mockUser } });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserBlock />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );
    const userBlockElements = screen.getAllByRole('listitem');
    userBlockElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  it('should redirect to sign in page when user clicked', async () => {
    const store = mockStore({ [ReducerName.User]: { authStatus: AuthStatus.NoAuth, userData: null } });
    const signInComponent = () =><h1>This is sign in page</h1>;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.SignIn}`}
              element={signInComponent()}
            />
            <Route
              path='*'
              element={<UserBlock />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByRole('link'));
    await screen.findByText('This is sign in page');
  });
  it('should redirect to my list page when user clicked', async () => {
    const store = mockStore({ [ReducerName.User]: { authStatus: AuthStatus.Auth, userData: mockUser } });
    const myListComponent = ()=><h1>This is my list page</h1>;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.MyList}`}
              element={myListComponent()}
            />
            <Route
              path='*'
              element={<UserBlock />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getAllByRole('link')[0]);
    await screen.findByText('This is my list page');
  });
});
