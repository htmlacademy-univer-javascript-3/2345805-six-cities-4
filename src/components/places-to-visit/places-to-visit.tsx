import CitiesMap from '../cities-map/cities-map';
import cn from 'classnames';
import { Offer } from '../../types/offer';
import { useCallback, useState } from 'react';
import OffersContainer from '../offers-container/offers-container';

interface PlacesToVisitProps {
  offers: Offer[];
}

function PlacesToVisit({ offers }: PlacesToVisitProps): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState<Offer['id']>('');

  const isEmpty = offers.length === 0;

  const handleCardMouseEnter = useCallback(
    (id: Offer['id']) => setSelectedOfferId(id),
    []
  );
  const handleCardMouseLeave = useCallback(() => setSelectedOfferId(''), []);

  return (
    <div className="cities">
      <div
        className={cn('cities__places-container container', {
          'cities__places-container--empty': isEmpty,
        })}
      >
        <OffersContainer
          offers={offers}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
        />
        <div className="cities__right-section">
          {!isEmpty && (
            <section className="cities__map map">
              <CitiesMap
                centerCoordinates={offers[0].city.location}
                offers={offers}
                selectedOfferId={selectedOfferId}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlacesToVisit;
