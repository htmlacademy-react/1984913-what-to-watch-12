import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import Loader from './loader';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
describe('Component: Loader', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <Loader />
        </HelmetProvider>
      </HistoryRouter>
    );
    const headerElement = screen.getByText('Loading...');
    const textElement = screen.getByText('Please wait');
    expect(headerElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
