import {Link} from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/user-data/api-actions';
import { getIsAuthorized, getUserData } from '../../store/user-data/selectors';
function UserBlock():JSX.Element{
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const userData = useAppSelector(getUserData);

  const handleLogoutClick = ()=>{
    dispatch(logout());
  };

  return(isAuthorized && userData ? (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.MyList}>
          <div className="user-block__avatar">
            <img src={userData.avatarUrl} alt={userData.name} width="63" height="63" />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <Link to={AppRoute.Main} className="user-block__link" onClick={handleLogoutClick}>Sign out</Link>
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
