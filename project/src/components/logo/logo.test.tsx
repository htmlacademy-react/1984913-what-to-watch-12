import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import Logo from './logo';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';

const history = createMemoryHistory();
const mainComponent = () => <h1>This is main page</h1>;
describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <Logo />
        </HistoryRouter>
      </HelmetProvider>
    );
    const linkLetterWElements = screen.getAllByText('W');
    const linkLetterTElement = screen.getByText('T');
    linkLetterWElements.forEach((element) => expect(element).toBeInTheDocument());
    expect(linkLetterTElement).toBeInTheDocument();
  });
  it('should redirect to main page when user clicked', async () => {
    history.push('/fake');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={mainComponent()}
          />
          <Route
            path='*'
            element={<Logo />}
          />
        </Routes>
      </HistoryRouter>);
    expect(screen.queryByText('This is main page')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    await screen.findByText('This is main page');
  });

});
