import OfferCard from '../offer-card/offer-card';
import { OffersCardListProps } from '../../types/card-list';
import { CardType } from '../../const';

function OffersCardList({ offers }: OffersCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          cardInfo={offer}
          typeClassName={CardType.regular}
        />
      ))}
    </div>
  );
}

export default OffersCardList;
