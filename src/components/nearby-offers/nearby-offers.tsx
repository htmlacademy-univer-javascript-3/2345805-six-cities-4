import OffersList from '../offers-list/offers-list';
import { Offer } from '../../types/offer';

type NearbyOffersProps = {
  nearPlaces: Offer[];
};

function NearbyOffers({ nearPlaces }: NearbyOffersProps) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList offers={nearPlaces} cardType="near-places" />
      </div>
    </section>
  );
}

export default NearbyOffers;
