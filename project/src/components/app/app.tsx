import ErrorPage from '../../pages/error-page/error-page';
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
// import PlayerPage from '../../pages/player-page/player-page';
import SingInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import ReviewPage from '../../pages/review-page/rewiev-page';
import FilmPage from '../../pages/film-page/film-page';
import { AppRoute } from '../../utils/constants';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import { checkAuth } from '../../store/user-data/api-actions';
import { useEffect } from 'react';

function App(): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);


  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage/>}/>
          <Route path={AppRoute.MyList} element={
            <PrivateRoute >
              <MyListPage />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.SignIn} element={<SingInPage/>}/>
          <Route path={`${AppRoute.Film}/:id`}>
            <Route index element={<FilmPage />}/>
            <Route path={`${AppRoute.Review}`} element={
              <PrivateRoute >
                <ReviewPage />
              </PrivateRoute>
            }
            />
          </Route>
          {/* <Route path={`${AppRoute.Player}/:id`} element={<PlayerPage films={films}/>}/> */}
          <Route path={AppRoute.Error} element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
