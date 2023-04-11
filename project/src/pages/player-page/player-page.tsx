import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { STEP_BACK } from '../../utils/constants';
import {useParams} from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilm, getFilmStatus } from '../../store/film-data/selectors';
import { useEffect, useRef, useState } from 'react';
import { fetchFilmById } from '../../store/film-data/api-actions';
import Spinner from '../../components/spinner/spinner';


function PlayerPage():JSX.Element{
  const navigate = useNavigate();
  const {id:filmId} = useParams();
  const id = Number(filmId);
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getFilmStatus);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(()=>{
    if(id){
      dispatch(fetchFilmById(id));
    }
  },[dispatch, id]);

  if(isFilmLoading){
    return <Spinner/>;
  }

  if(!id || !film){
    return <ErrorPage/>;
  }

  const handleExitClick = ()=> navigate(STEP_BACK);

  const handleChangeIsPausedClick = ()=> setIsPaused((prevState)=> !prevState);

  const handleFullScreenClick = ()=> {videoRef.current?.requestFullscreen();};

  const{previewImage, videoLink, name} = film;

  return(
    <div className="player">
      <Helmet>
        <title>WTW Player</title>
      </Helmet>
      <video ref = {videoRef} src={videoLink} className="player__video" poster={previewImage} autoPlay/>

      <button type="button" className="player__exit" onClick={handleExitClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          { isPaused ? (
            <button type="button" className="player__play" onClick={handleChangeIsPausedClick}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
          ) :
            (
              <button type="button" className="player__play" onClick={handleChangeIsPausedClick}>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>
            )}
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen" onClick = {handleFullScreenClick}>
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
