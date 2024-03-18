import CityCard from '../city-card/city-card';
import { CityCardListProps } from '../../types/card-list';
import { CardType } from '../../const';
// import { useState } from 'react';

function NearestCitiesCardList({ offers }: CityCardListProps) {
  // const [activeCard, setActiveCard] = useState({id: 1});
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <CityCard
          key={offer.id}
          cardInfo={offer}
          typeClassName={CardType.nearest}
        />
      ))}
    </div>
  );
}

export default NearestCitiesCardList;
