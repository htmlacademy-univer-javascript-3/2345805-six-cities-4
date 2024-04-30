import OffersList from '../offers-list/offers-list';
import { Offer } from '../../types/offer.ts';
import { Link } from 'react-router-dom';
import { Routes, CityName } from '../../const';
import { changeCity } from '../../store';
import { useAppDispatch } from '../../hooks';

type FavouritesListItemProps = {
  cityName: CityName;
  offers: Offer[];
};

function FavouritesListItem({
  cityName,
  offers,
}: FavouritesListItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityClick = () => {
    dispatch(changeCity(cityName));
  };

  return (
    <li key={cityName} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={Routes.Main}
            onClick={handleCityClick}
          >
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList offers={offers} cardType={'favorites'} />
      </div>
    </li>
  );
}

export default FavouritesListItem;
