import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import FilmReviewCard from './film-review-card';

const mockReview = makeFakeReview();

describe('Component: FilmReviewCard', () => {
  it('should render correctly', () => {
    render(
      <FilmReviewCard review={mockReview} />
    );
    const commentTextElement = screen.getByText(`${mockReview.comment}`);
    const nameTextElement = screen.getByText(`${mockReview.user.name}`);
    expect(commentTextElement).toBeInTheDocument();
    expect(nameTextElement).toBeInTheDocument();
  });
});
