import CitiesMap from '../../components/cities-map/cities-map';
import OffersCardList from '../../components/offers-card-list/offers-card-list';
import CitiesList from '../../components/cities-list/cities-list';
import SortingBlock from '../../components/sorting-block/sorting-block';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import { getOfferComparator } from '../../utils';

function MainScreen(): JSX.Element {
  const [offers, city] = useAppSelector((state) => [
    [...state.offersList]
      .sort(getOfferComparator(state.selectedSortType))
      .filter((offer: Offer) => offer.city.name === state.city.name),
    state.city.name,
  ]);
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {offers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${offers.length} places to stay in ${city}`}</b>
                <SortingBlock />
                <OffersCardList offers={offers} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <CitiesMap points={offers} />
                </section>
              </div>
            </div>
          ) : (
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    {`We could not find any property available at the moment in
                    ${city}`}
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
