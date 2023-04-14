import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import { makeFakeFilm } from '../../utils/mocks';
import FilmOverview from './film-overview';

const mockFilm = makeFakeFilm();
const history = createMemoryHistory();

describe('Component: FilmOverview', () => {
  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <FilmOverview film={mockFilm}/>
        </HistoryRouter>
      </HelmetProvider>
    );

    const scoresTextElement = screen.getByText(`${mockFilm.scoresCount} ratings`);
    const ratingTextElement = screen.getByText(`${mockFilm.rating}`);
    const descriptionTextElement = screen.getByText(`${mockFilm.description}`);
    const directorTextElement = screen.getByText(`Director: ${mockFilm.director}`);
    const starringTextElement = screen.getByText(`Starring: ${mockFilm.starring.join(', ')}`);

    expect(scoresTextElement).toBeInTheDocument();
    expect(ratingTextElement).toBeInTheDocument();
    expect(descriptionTextElement).toBeInTheDocument();
    expect(directorTextElement).toBeInTheDocument();
    expect(starringTextElement).toBeInTheDocument();
  });
});
