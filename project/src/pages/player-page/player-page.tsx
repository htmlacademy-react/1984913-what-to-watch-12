import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { STEP_BACK } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilm, getFilmStatus } from '../../store/film-data/selectors';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { fetchFilmById } from '../../store/film-data/api-actions';
import Spinner from '../../components/spinner/spinner';
import Loader from '../../components/loader/loader';
import { getTimeLeft } from '../../utils/utils';

function PlayerPage(): JSX.Element {
  const navigate = useNavigate();
  const { id: filmId } = useParams();
  const id = Number(filmId);
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getFilmStatus);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    let isPlayerMounted = true;
    isPlayerMounted && setIsLoaded(!isFilmLoading);
    return()=>{
      isPlayerMounted = false;
    };
  }, [isFilmLoading]);

  useEffect(() => {
    if (videoRef.current !== null) {
      isPaused ? videoRef.current.pause() : videoRef.current.play();
    }
  }, [isPaused]);

  if(isFilmLoading){
    return <Loader/>;
  }
  if (!id || !film) {
    return <ErrorPage />;
  }

  const handleExitClick = () => navigate(STEP_BACK);

  const handleChangeIsPausedClick = () =>
    setIsPaused((prevState) => !prevState);

  const handleFullScreenClick = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleDurationChange = (evt: ChangeEvent<HTMLVideoElement>) => {
    const currentDuration = Math.round(evt.currentTarget.duration);
    setDuration(currentDuration);
  };
  const handleTimeUpdate = (evt: ChangeEvent<HTMLVideoElement>) => {
    const time = Math.round(evt.currentTarget.currentTime);
    setCurrentTime(time);
  };
  const timeLeft = getTimeLeft(duration - currentTime);
  const { previewImage, videoLink, name } = film;

  return (
    <div className="player">
      <Helmet>
        <title>WTW Player</title>
      </Helmet>
      {isLoaded ? (
        <video
          ref={videoRef}
          src={videoLink}
          className="player__video"
          poster={previewImage}
          autoPlay
          onDurationChange={handleDurationChange}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleChangeIsPausedClick}
        />
      ) : (
        <Spinner />
      )}
      <button type="button" className="player__exit" onClick={handleExitClick}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={currentTime}
              max={duration}
            >
            </progress>
            <div
              className="player__toggler"
              style={{
                left: `${duration ? (100 / duration) * currentTime : 0}%`,
              }}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          {isPaused ? (
            <button
              type="button"
              className="player__play"
              onClick={handleChangeIsPausedClick}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
          ) : (
            <button
              type="button"
              className="player__play"
              onClick={handleChangeIsPausedClick}
            >
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button>
          )}
          <div className="player__name">{name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreenClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PlayerPage;
