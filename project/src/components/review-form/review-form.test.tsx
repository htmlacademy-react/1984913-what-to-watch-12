import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Route, Routes } from 'react-router-dom';
import { makeFakeFilm } from '../../utils/mocks';
import { AppRoute, ReducerName } from '../../utils/constants';
import { HelmetProvider } from 'react-helmet-async';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({[ReducerName.Reviews]:{isReviewPosting:false}});
const mockFilm = makeFakeFilm();
const handleSubmitClick = jest.fn();
const reviewsComponent = ()=> <h1>This is film reviews page</h1>;

describe('Component: ReviewForm', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm onReviewSubmit={handleSubmitClick} />,
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByRole('textbox')).toHaveClass('add-review__textarea');
    const ratingElements = screen.getAllByRole('radio');
    ratingElements.forEach((element)=>{
      expect(element).toHaveClass('rating__input');
    });
  });

  it('should send review and redirect when clicked', async () => {
    const path = `${AppRoute.Film}/${mockFilm.id}/${AppRoute.Review}`;
    const reviewsPath = `${AppRoute.Film}/${mockFilm.id}`;
    history.push(path);
    const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo eros, egestas sed eros et, rhoncus dapibus sem. Phasellus sollicitudin rutrum nulla. Nulla pellentesque mi id ex tempus, commodo tempor eros rhoncus. Suspendisse odio magna, vulputate non laoreet sit amet, imperdiet non arcu. Vivamus aliquet a odio et venenatis. Aeneana.';
    const handleFormSubmit = ()=>{
      handleSubmitClick();
      history.push({
        pathname: reviewsPath,
        search: '?tab=Reviews'
      });
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={`${AppRoute.Film}/${mockFilm.id}`}
                element={reviewsComponent()}
              />
              <Route
                path={path}
                element={ <ReviewForm onReviewSubmit={handleFormSubmit} />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Rating 1'));
    fireEvent.change(screen.getByTestId('review-text'), {target: {value: mockText}});
    expect(screen.getByTestId('submit-review')).not.toHaveAttribute('disabled');
    await waitFor(async()=> await userEvent.click(screen.getByTestId('submit-review')));
    expect(handleSubmitClick).toBeCalled();
    expect(history.location.pathname).toBe(reviewsPath);
    expect(screen.getByText('This is film reviews page')).toBeInTheDocument();
  });
});
