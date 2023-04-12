import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { getIsAuthorized } from '../../store/user-data/selectors';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children:JSX.Element;
}
function PrivateRoute({ children}:PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    isAuthorized ? children : <Navigate to={AppRoute.SignIn}/>
  );
}

export default PrivateRoute;
