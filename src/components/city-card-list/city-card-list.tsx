import CityCard from '../city-card/city-card';
import { Offer } from '../../types/offer';
// import { useState } from 'react';

type CityCardListProps = {
  cities: Offer[];
  viewType: 'regular' | 'near';
};

function CityCardList({ cities, viewType }: CityCardListProps) {
  // const [activeCard, setActiveCard] = useState({id: 1});
  return (
    <div
      className={`${
        viewType === 'regular'
          ? 'cities__places-list tabs__content'
          : 'near-places__list'
      } places__list `}
    >
      {cities.map((city) => (
        <CityCard key={city.id} cardInfo={city} viewType={viewType} />
      ))}
    </div>
  );
}

export default CityCardList;
