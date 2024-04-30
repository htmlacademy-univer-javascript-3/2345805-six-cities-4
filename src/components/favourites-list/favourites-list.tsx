import FavouritesListItem from '../favourites-list-item/favourites-list-item';
import { Offer } from '../../types/offer';
import { CityName } from '../../const';

const getFavouritesByCity = (favouriteList: Offer[]) =>
  favouriteList.reduce(
    (favouritesByCity: Record<string, Offer[]>, item: Offer) => {
      const cityName = item.city.name;
      favouritesByCity[cityName] = [
        ...(favouritesByCity[cityName] || []),
        item,
      ];
      return favouritesByCity;
    },
    {}
  );

type FavoriteListProps = {
  favoriteList: Offer[];
};

function FavouritesList({ favoriteList }: FavoriteListProps): JSX.Element {
  const favouritesByCity = getFavouritesByCity(favoriteList);

  return (
    <ul className="favorites__list">
      {Object.entries(favouritesByCity).map(
        ([cityName, offers]: [string, Offer[]]) => (
          <FavouritesListItem
            key={cityName}
            cityName={cityName as CityName}
            offers={offers}
          />
        )
      )}
    </ul>
  );
}

export default FavouritesList;
