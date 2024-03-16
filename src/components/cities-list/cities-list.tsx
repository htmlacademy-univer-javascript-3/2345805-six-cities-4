import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';

type CitiesListProps = {
  cities: { name: string; id: number }[];
};

type CityProps = {
  name: string;
  changeCityName: (city: string) => void;
};
const City = ({ name, changeCityName }: CityProps): JSX.Element => (
  <li className="locations__item" onClick={() => changeCityName(name)}>
    <a className="locations__item-link tabs__item" href="#">
      <span>{name}</span>
    </a>
  </li>
);

function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <City
          key={city.id}
          name={city.name}
          changeCityName={handleCityChange}
        />
      ))}
    </ul>
  );
}

export default CitiesList;
