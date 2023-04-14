import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import FilmDetails from './film-details';
import { makeFakeFilm } from '../../utils/mocks';

const mockFilm = makeFakeFilm();
const history = createMemoryHistory();

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <FilmDetails film={mockFilm}/>
        </HistoryRouter>
      </HelmetProvider>
    );

    const directorTextElement = screen.getByText('Director');
    const starringTextElement = screen.getByText('Starring');
    const runTimeTextElement = screen.getByText('Run Time');
    const genreTextElement = screen.getByText('Genre');
    const releasedTextElement = screen.getByText('Released');

    expect(directorTextElement).toBeInTheDocument();
    expect(starringTextElement).toBeInTheDocument();
    expect(runTimeTextElement).toBeInTheDocument();
    expect(genreTextElement).toBeInTheDocument();
    expect(releasedTextElement).toBeInTheDocument();
  });
});
