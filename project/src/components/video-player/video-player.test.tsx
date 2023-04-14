import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import { makeFakeFilm} from '../../utils/mocks';
import VideoPlayer from './video-player';

const mockFilm = makeFakeFilm();
const history = createMemoryHistory();

describe('Component: VideoPlayer', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <VideoPlayer src={mockFilm.previewVideoLink} poster={mockFilm.previewImage}isActive/>
        </HistoryRouter>
      </HelmetProvider>
    );

    const videoElement = screen.getByTestId('video-element');

    expect(videoElement).toBeInTheDocument();
  });
});
