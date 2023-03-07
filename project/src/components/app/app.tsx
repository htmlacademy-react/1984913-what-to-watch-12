import MainPage from '../../pages/main-page/main-page';
// import PlayerPage from '../../pages/player-page/player-page';
// import SingInPage from '../../pages/sign-in-page/sign-in-page';
//import MyListPage from '../../pages/my-list-page/my-list-page';
//import ReviewPage from '../../pages/review-page/rewiev-page';
//import FilmPage from '../../pages/film-page/film-page';
import { Films } from '../../types/film';
import { Reviews } from '../../types/review';

type AppProps = {
  films:Films;
  reviews:Reviews;
}
function App({films, reviews}:AppProps): JSX.Element {
  return (
    <MainPage films={films}/>
    // <ReviewPage/>
    // <SingInPage/>
    // <PlayerPage/>
    //<MyListPage films={films}/>
    //<FilmPage film={films[25]} equalFilms={films} reviews={reviews}/>
  );
}

export default App;
