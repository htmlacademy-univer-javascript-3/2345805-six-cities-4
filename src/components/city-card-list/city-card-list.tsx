import CityCard from '../city-card/city-card';
import { Offer } from '../../types/offer';
import { useState } from 'react';

type CityCardListProps = {
  cities: Offer[];
};

function CityCardList({ cities }: CityCardListProps) {
  const [activeCard, setActiveCard] = useState({id: 1});
  return (
    <div className="cities__places-list places__list tabs__content">
      {cities.map((city) => (
        <CityCard key={city.id} cardInfo={city} />
      ))}
    </div>
  );
}

export default CityCardList;
