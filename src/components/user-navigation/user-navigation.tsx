import { Routes } from '../../const';
import { Link } from 'react-router-dom';
import {
  getAuthCheckedStatus,
  getUserInfo,
  logoutAction,
  getFavouritesCount,
} from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';

function UserNavigation(): JSX.Element {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(getUserInfo);
  const favouritesCount = useAppSelector(getFavouritesCount);
  const isLoggedIn = useAppSelector(getAuthCheckedStatus);

  const userAvatar = userInfo?.avatarUrl
    ? { backgroundImage: `url(${userInfo?.avatarUrl})` }
    : {};
  const style = { ...userAvatar, borderRadius: '50%' };

  const handleLogoutClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      {isLoggedIn ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={Routes.Favorites}
            >
              <div
                className="header__avatar-wrapper user__avatar-wrapper"
                style={style}
              />
              <span className="header__user-name user__name">
                {userInfo?.email}
              </span>
              <span className="header__favorite-count">{favouritesCount}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={Routes.Login}
              onClick={handleLogoutClick}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={Routes.Login}
            >
              <div
                className="header__avatar-wrapper user__avatar-wrapper"
                style={style}
              />
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default UserNavigation;
