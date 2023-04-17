import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../utils/constants';
import SignInForm from './sign-in-form';
import { HelmetProvider } from 'react-helmet-async';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: SignInForm', () => {
  beforeAll(() => {
    history.push(AppRoute.SignIn);
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <SignInForm />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});
