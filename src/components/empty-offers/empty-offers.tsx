import { getSelectedCity } from '../../store';
import { useAppSelector } from '../../hooks';
import { memo } from 'react';

function EmptyOffers(): JSX.Element {
  const cityName = useAppSelector(getSelectedCity);

  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          We could not find any property available at the moment in {cityName}
        </p>
      </div>
    </section>
  );
}

const EmptyOffersMemo = memo(EmptyOffers);

export default EmptyOffersMemo;
