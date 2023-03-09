import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';

type PrivateRouteProps = {
  authorizationStatus:string;
  children:JSX.Element;
}
function PrivateRoute({authorizationStatus, children}:PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.SignIn}/>
  );
}

export default PrivateRoute;
