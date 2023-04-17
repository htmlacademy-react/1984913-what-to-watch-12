import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children:JSX.Element;
}
function PrivateRoute({ isAuthorized, children}:PrivateRouteProps): JSX.Element {

  return (
    isAuthorized ? children : <Navigate to={AppRoute.SignIn}/>
  );
}

export default PrivateRoute;
