import { render, screen, waitFor} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import PlayFilmButton from './play-film-button';
import { makeFakeFilm } from '../../utils/mocks';
import { AppRoute } from '../../utils/constants';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockFilm = makeFakeFilm();
const playerComponent = ()=><h1>This is player</h1>;

describe('Component: PlayFilmButton', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <PlayFilmButton filmId={mockFilm.id}/>
        </HelmetProvider>
      </HistoryRouter>
    );
    const buttonTextElement = screen.getByText('Play');
    expect(buttonTextElement).toBeInTheDocument();
  });
  it('should redirect to player when button clicked', async () => {
    history.push(AppRoute.Main);

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`${AppRoute.Player}/${mockFilm.id}`}
            element={playerComponent()}
          />
          <Route
            path='*'
            element={<PlayFilmButton filmId={mockFilm.id} />}
          />
        </Routes>
      </HistoryRouter>);
    await waitFor(async()=>{
      await userEvent.click(screen.getByRole('button'));

    });
    expect(screen.queryByText('Play')).not.toBeInTheDocument();
    await screen.findByText('This is player');
  });

});
