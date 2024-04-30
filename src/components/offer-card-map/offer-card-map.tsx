import { Offer, Location, ExtendedOffer } from '../../types/offer.ts';
import CitiesMap from '../cities-map/cities-map';

type OfferCardMapProps = {
  offers: Offer[];
  centerCoordinates: Location;
  selectedOfferId: string;
  currentOffer: ExtendedOffer;
};

function OfferCardMap({
  offers,
  centerCoordinates,
  selectedOfferId,
  currentOffer,
}: OfferCardMapProps) {
  return (
    <section className="offer__map map">
      <CitiesMap
        offers={offers}
        centerCoordinates={centerCoordinates}
        selectedOfferId={selectedOfferId}
        scrollWheelZoom={false}
        currentOffer={currentOffer}
      />
    </section>
  );
}

export default OfferCardMap;
