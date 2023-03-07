import { FilmTab } from '../../utils/constants';
import { mockReviews } from '../../mocks/mock-reviews';
import { Film } from '../../types/film';
import FilmDetails from '../film-details/film-details';
import FilmOverview from '../film-overview/film-overview';
import FilmReviews from '../film-reviews/film-reviews';

type FilmInfoProps = {
  film:Film;
}

function FilmInfo({film}:FilmInfoProps):JSX.Element{
  const tabs = Object.values(FilmTab);
  const currentTab:string = FilmTab.Reviews;

  const getCurrentInfo = ()=>{
    switch(currentTab){
      case FilmTab.Default:
        return <FilmOverview film={film}/>;
      case FilmTab.Details:
        return <FilmDetails film={film}/>;
      case FilmTab.Reviews:
        return <FilmReviews reviews={mockReviews}/>;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabs.map((tab)=>
            (
              <li key={tab} className={`film-nav__item ${currentTab === tab ? 'film-nav__item--active' : ''}`}>
                <a href="/" className="film-nav__link">{tab}</a>
              </li>
            )
          )}
        </ul>
      </nav>
      {getCurrentInfo()}
    </div>
  );
}
export default FilmInfo;
