import { FilmTab } from '../../utils/constants';
import { Film } from '../../types/film';
import FilmDetails from '../film-details/film-details';
import FilmOverview from '../film-overview/film-overview';
import FilmReviews from '../film-reviews/film-reviews';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type FilmInfoProps = {
  film:Film;
}

const TABS = Object.values(FilmTab);

function FilmInfo({film}:FilmInfoProps):JSX.Element{
  const [searchParams] = useSearchParams();
  const searchTab = searchParams.get('tab');
  const [currentTab, setCurrentTab] = useState<string>();

  useEffect(()=>{
    let isFilmInfoMounted = true;
    if(searchTab && isFilmInfoMounted){
      setCurrentTab(searchTab);
    }else{
      setCurrentTab(FilmTab.Default);
    }
    return()=>{
      isFilmInfoMounted = false;
    };
  },[searchTab]);

  const getCurrentInfo = ()=>{
    switch(currentTab){
      case FilmTab.Default:
        return <FilmOverview film={film}/>;
      case FilmTab.Details:
        return <FilmDetails film={film}/>;
      case FilmTab.Reviews:
        return <FilmReviews filmId={film.id}/>;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {TABS.map((tab)=>
            (
              <li key={tab} className={`film-nav__item ${currentTab === tab ? 'film-nav__item--active' : ''}`}>
                <Link to={`?tab=${tab}`} className="film-nav__link">{tab}</Link>
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
