import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../utils/mocks';
import FilmOverview from './film-overview';

const mockFilm = makeFakeFilm();

describe('Component: FilmOverview', () => {
  it('should render correctly', () => {

    render(
      <FilmOverview film={mockFilm} />
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
