import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../utils/constants';

type PrivateRouteProps = {
  authStatus:string;
  children:JSX.Element;
}
function PrivateRoute({authStatus, children}:PrivateRouteProps): JSX.Element {
  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.SignIn}/>
  );
}

export default PrivateRoute;
