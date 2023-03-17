import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Films } from '../../types/film';
import { STEP_BACK } from '../../utils/constants';
import { getCurrentFilm } from '../../utils/utils';
import {useParams} from 'react-router-dom';

type PlayerPageProps = {
  films:Films;
}

function PlayerPage({films}:PlayerPageProps):JSX.Element{
  const {id:filmId} = useParams();
  const id = filmId ? +filmId : 0;
  const film = getCurrentFilm(films, id) || films[0];

  const isPaused = false;
  const navigate = useNavigate();
  const handleExitClick = ()=> navigate(STEP_BACK);

  const{previewImage, videoLink} = film;

  return(
    <div className="player">
      <Helmet>
        <title>WTW Player</title>
      </Helmet>
      <video src={videoLink} className="player__video" poster={previewImage}></video>

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
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
          ) :
            (
              <button type="button" className="player__play">
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>
            )}
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
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
