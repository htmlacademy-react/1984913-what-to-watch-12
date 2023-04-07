import ErrorPage from '../../pages/error-page/error-page';
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
// import PlayerPage from '../../pages/player-page/player-page';
import SingInPage from '../../pages/sign-in-page/sign-in-page';
// import MyListPage from '../../pages/my-list-page/my-list-page';
// import ReviewPage from '../../pages/review-page/rewiev-page';
import FilmPage from '../../pages/film-page/film-page';
import Loader from '../../components/loader/loader';
import { AppRoute } from '../../utils/constants';
// import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getFilmsStatus } from '../../store/films-data/selectors';
import { getPromoFilmStatus } from '../../store/promo-film-data/selectors';

function App(): JSX.Element {
  const isFilmsLoading = useAppSelector(getFilmsStatus);
  const isPromoFilmLoading = useAppSelector(getPromoFilmStatus);

  if(isFilmsLoading || isPromoFilmLoading){
    return <Loader/>;
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage/>}/>
          {/* <Route path={AppRoute.MyList} element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <MyListPage films={films}/>
            </PrivateRoute>
          }
          /> */}
          <Route path={AppRoute.SignIn} element={<SingInPage/>}/>
          <Route path={`${AppRoute.Film}/:id`}>
            <Route index element={<FilmPage />}/>
            {/* <Route path={`${AppRoute.Review}`} element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <ReviewPage />
            </PrivateRoute>
            }
            /> */}
          </Route>
          {/* <Route path={`${AppRoute.Player}/:id`} element={<PlayerPage films={films}/>}/> */}
          <Route path={AppRoute.Error} element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
