import ErrorPage from '../../pages/error-page/error-page';
import {Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import PlayerPage from '../../pages/player-page/player-page';
import SingInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import ReviewPage from '../../pages/review-page/rewiev-page';
import FilmPage from '../../pages/film-page/film-page';
import { AppRoute } from '../../utils/constants';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuth } from '../../store/user-data/api-actions';
import { useEffect } from 'react';
import { getAuthCheckedStatus, getIsAuthorized } from '../../store/user-data/selectors';
import Loader from '../loader/loader';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if(!isAuthChecked){
    return <Loader/>;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage/>}/>
          <Route path={AppRoute.MyList} element={
            <PrivateRoute isAuthorized={isAuthorized} >
              <MyListPage />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.SignIn} element={<SingInPage/>}/>
          <Route path={`${AppRoute.Film}/:id`}>
            <Route index element={<FilmPage />}/>
            <Route path={`${AppRoute.Review}`} element={
              <PrivateRoute isAuthorized={isAuthorized}>
                <ReviewPage />
              </PrivateRoute>
            }
            />
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<PlayerPage />}/>
          <Route path={AppRoute.Error} element={<ErrorPage/>}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
