import { getAuthCheckedStatus, getReviews } from '../../store';
import { useAppSelector } from '../../hooks';
import { Offer, ExtendedOffer } from '../../types/offer';
import CommentForm from '../comment-form/comment-form';
import OfferDescription from '../offer-description/offer-description';
import OfferPictures from '../offer-pictures/offer-pictures';
import OfferHost from '../offer-host/offer-host';
import OfferCardMap from '../offer-card-map/offer-card-map';
import OfferReviews from '../offer-reviews/offer-reviews';

type OfferInfoProps = {
  id: string;
  limitedNearby: Offer[];
  offer: ExtendedOffer;
};

function OfferInfo({ offer, id, limitedNearby }: OfferInfoProps): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const isAuthorization = useAppSelector(getAuthCheckedStatus);

  const { images, description, host } = offer;
  const mapCenter = offer.city.location;

  return (
    <section className="offer">
      <OfferPictures images={images} />
      <div className="offer__container container">
        <div className="offer__wrapper">
          <OfferDescription offer={offer} />
          <OfferHost host={host} description={description} />
          <OfferReviews reviews={reviews}>
            {isAuthorization && <CommentForm offerId={id} />}
          </OfferReviews>
        </div>
      </div>
      <OfferCardMap
        offers={limitedNearby}
        centerCoordinates={mapCenter}
        selectedOfferId={id}
        currentOffer={offer}
      />
    </section>
  );
}

export default OfferInfo;
