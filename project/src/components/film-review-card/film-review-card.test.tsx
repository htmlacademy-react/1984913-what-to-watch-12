import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import { makeFakeReview } from '../../utils/mocks';
import FilmReviewCard from './film-review-card';

const mockReview = makeFakeReview();
const history = createMemoryHistory();

describe('Component: FilmReviewCard', () => {
  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <FilmReviewCard review={mockReview}/>
        </HistoryRouter>
      </HelmetProvider>
    );

    const commentTextElement = screen.getByText(`${mockReview.comment}`);
    const nameTextElement = screen.getByText(`${mockReview.user.name}`);

    expect(commentTextElement).toBeInTheDocument();
    expect(nameTextElement).toBeInTheDocument();
  });
});
