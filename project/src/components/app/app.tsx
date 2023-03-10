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
import { AppRoute, AuthorizationStatus } from '../../utils/constants';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  films:Films;
  reviews:Reviews;
}
function App({films, reviews}:AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage films={films}/>}/>
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListPage films={films}/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.SignIn} element={<SingInPage/>}/>
          <Route path={`${AppRoute.Film}`}>
            <Route index element={<FilmPage film={films[0]} equalFilms={films} reviews={reviews}/>}/>
            <Route path={`${AppRoute.Review}`} element={<ReviewPage/>}/>
          </Route>
          <Route path={`${AppRoute.Player}`} element={<PlayerPage/>}/>
          <Route path={AppRoute.Error} element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
