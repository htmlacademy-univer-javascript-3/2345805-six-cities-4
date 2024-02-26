import CityCard from '../city-card/city-card';
import { CityCardListProps } from '../../types/card-list';
import { CardType } from '../../const';

function CitiesCardList({ cities }: CityCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {cities.map((city) => (
        <CityCard
          key={city.id}
          cardInfo={city}
          typeClassName={CardType.regular}
        />
      ))}
    </div>
  );
}

export default CitiesCardList;
