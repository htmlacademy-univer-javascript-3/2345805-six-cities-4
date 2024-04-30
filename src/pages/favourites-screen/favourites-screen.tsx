import cn from 'classnames';
import { getFavorites, getIsFavoritesLoading } from '../../store';
import { useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import EmptyFavorites from '../../components/empty-favourites/empty-favourites';
import Favourites from '../../components/favourites/favourites';

function FavoutitesScreen(): JSX.Element {
  const isFavouritesLoading = useAppSelector(getIsFavoritesLoading);
  const favorites = useAppSelector(getFavorites);
  const isEmptyFavorites = favorites.length === 0;

  if (isFavouritesLoading) {
    return <Loader />;
  }

  return (
    <main
      className={cn('page__main page__main--favorites', {
        'page__main--favorites-empty': isEmptyFavorites,
      })}
    >
      <div className="page__favorites-container container">
        {isEmptyFavorites ? (
          <EmptyFavorites />
        ) : (
          <Favourites favorites={favorites} />
        )}
      </div>
    </main>
  );
}

export default FavoutitesScreen;
