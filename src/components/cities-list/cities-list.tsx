import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';
import CityListItem from '../city-list-item/city-list-item';
import { Cities } from '../../const';
import { City } from '../../types/offer';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleCityChange = (city: City) => {
    dispatch(changeCity(city));
  };
  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <CityListItem
          key={city.name}
          city={city}
          changeSelectedCity={handleCityChange}
        />
      ))}
    </ul>
  );
}

export default CitiesList;
