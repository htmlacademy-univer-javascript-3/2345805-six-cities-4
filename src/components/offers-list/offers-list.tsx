import OfferCard from '../offer-card/offer-card';
import { sortOfferFunction } from '../../utils.ts';
import { getSelectedSortType } from '../../store';
import { useAppSelector } from '../../hooks/index.ts';
import { Offer } from '../../types/offer';

export type CardType = 'cities' | 'favorites' | 'near-places';

type OfferListProps = {
  offers: Offer[];
  cardType: CardType;
  handleCardMouseEnter?: (id: Offer['id']) => void;
  handleCardMouseLeave?: () => void;
};

function OffersList({
  offers,
  cardType,
  handleCardMouseLeave,
  handleCardMouseEnter,
}: OfferListProps): JSX.Element {
  const selectedSortType = useAppSelector(getSelectedSortType);
  const sortedOffers = sortOfferFunction[selectedSortType](offers);

  return (
    <>
      {sortedOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          cardType={cardType}
          handleCardMouseEnter={(evt) => handleCardMouseEnter?.(evt)}
          handleCardMouseLeave={() => handleCardMouseLeave?.()}
        />
      ))}
    </>
  );
}

export default OffersList;
