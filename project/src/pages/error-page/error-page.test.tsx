import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import ErrorPage from './error-page';
import HistoryRouter from '../../components/history-route/history-route';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();
describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <ErrorPage/>
        </HistoryRouter>
      </HelmetProvider>
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Go back to main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
