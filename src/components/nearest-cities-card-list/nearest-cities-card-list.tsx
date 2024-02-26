import CityCard from '../city-card/city-card';
import { CityCardListProps } from '../../types/card-list';
import { CardType } from '../../const';
// import { useState } from 'react';


function NearestCitiesCardList({ cities }: CityCardListProps) {
  // const [activeCard, setActiveCard] = useState({id: 1});
  return (
    <div
      className='near-places__list places__list'
    >
      {cities.map((city) => (
        <CityCard key={city.id} cardInfo={city} typeClassName={CardType.nearest} />
      ))}
    </div>
  );
}

export default NearestCitiesCardList;
