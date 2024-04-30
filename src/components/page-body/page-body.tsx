import cn from 'classnames';
import { getFavorites } from '../../store';
import { useAppSelector } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../const';

interface PageBodyProps {
  children: React.ReactNode;
}

function PageBody(props: PageBodyProps): JSX.Element {
  const { children } = props;
  const isEmptyFavorites = useAppSelector(getFavorites).length === 0;
  const { pathname } = useLocation();

  const pathnameToClassName: Record<string, string> = {
    [Routes.Main]: 'grayMain',
    [Routes.Login]: 'grayLogin',
    [Routes.Favorites]: 'favorites',
  };

  const typePageToClassNames: Record<string, string> = {
    grayMain: 'page page--gray page--main',
    grayLogin: 'page page--gray page--login',
    favorites: cn('page', { 'page--favorites-empty': isEmptyFavorites }),
    default: 'page',
  };

  const typePage = pathnameToClassName[pathname] || 'default';

  return <div className={typePageToClassNames[typePage]}>{children}</div>;
}

export default PageBody;
