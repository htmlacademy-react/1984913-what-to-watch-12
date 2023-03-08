import ErrorPage from '../../pages/error-page/error-page';
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import PlayerPage from '../../pages/player-page/player-page';
import SingInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import ReviewPage from '../../pages/review-page/rewiev-page';
import FilmPage from '../../pages/film-page/film-page';
import { Films } from '../../types/film';
import { Reviews } from '../../types/review';
import { AppRoute } from '../../utils/constants';

type AppProps = {
  films:Films;
  reviews:Reviews;
}
function App({films, reviews}:AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage films={films}/>}/>
        <Route path={AppRoute.MyList} element={<MyListPage films={films}/>}/>
        <Route path={AppRoute.SignIn} element={<SingInPage/>}/>
        <Route path={AppRoute.Film} element={<FilmPage film={films[25]} equalFilms={films} reviews={reviews}/> }/>
        <Route path={AppRoute.Player} element={<PlayerPage/>}/>
        <Route path={AppRoute.Review} element={<ReviewPage/>}/>
        <Route path={AppRoute.Error} element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
