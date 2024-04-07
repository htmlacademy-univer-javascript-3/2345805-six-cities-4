import { City } from '../../types/offer';

type CityProps = {
  city: City;
  changeSelectedCity: (city: City) => void;
};

function CityListItem({ city, changeSelectedCity }: CityProps): JSX.Element {
  return (
    <li className="locations__item" onClick={() => changeSelectedCity(city)}>
      <a className="locations__item-link tabs__item">
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CityListItem;
