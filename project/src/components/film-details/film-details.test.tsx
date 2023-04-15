import { render, screen } from '@testing-library/react';
import FilmDetails from './film-details';
import { makeFakeFilm } from '../../utils/mocks';

const mockFilm = makeFakeFilm();

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {

    render(
      <FilmDetails film={mockFilm} />
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
