import { render, screen} from '@testing-library/react';
import { makeFakeFilm} from '../../utils/mocks';
import VideoPlayer from './video-player';

const mockFilm = makeFakeFilm();

describe('Component: VideoPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });
  it('should render correctly', () => {
    render(
      <VideoPlayer src={mockFilm.previewVideoLink} poster={mockFilm.previewImage} isActive/>
    );
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toBeInTheDocument();
  });
});
