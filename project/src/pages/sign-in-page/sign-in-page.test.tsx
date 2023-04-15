import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../../components/history-route/history-route';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../utils/constants';
import SingInPage from './sign-in-page';

const mockStore = configureMockStore();
const store = mockStore();
const history = createMemoryHistory();

describe('Component: SignInPage', () => {
  beforeAll(()=>{
    history.push(AppRoute.SignIn);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <SingInPage/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button',{name:'Sign in'})).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.SignIn}`);
  });

});
