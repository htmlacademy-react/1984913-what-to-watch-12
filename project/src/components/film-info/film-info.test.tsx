import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import { makeFakeFilm } from '../../utils/mocks';
import FilmInfo from './film-info';
import { FilmTab } from '../../utils/constants';

const mockFilm = makeFakeFilm();
const history = createMemoryHistory();

describe('Component: FilmInfo', () => {
  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <FilmInfo film={mockFilm}/>
        </HistoryRouter>
      </HelmetProvider>
    );

    Object.values(FilmTab).forEach((tab)=>{
      const tabTextElement = screen.getByText(tab);
      expect(tabTextElement).toBeInTheDocument();
    });

  });
});
