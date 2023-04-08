import {Link} from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/user-data/api-actions';
import { getIsAuthorized } from '../../store/user-data/selectors';
function UserBlock():JSX.Element{
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);

  const handleLogout = ()=>{
    dispatch(logout());
  };

  return(isAuthorized ? (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.MyList}>
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <Link to={AppRoute.Main} className="user-block__link" onClick={handleLogout}>Sign out</Link>
      </li>
    </ul>
  ) : (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
      </li>
    </ul>
  )

  );
}
export default UserBlock;
