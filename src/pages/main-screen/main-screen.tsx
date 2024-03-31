import { Link } from 'react-router-dom';
import CitiesMap from '../../components/cities-map/cities-map';
import OffersCardList from '../../components/offers-card-list/offers-card-list';
import CitiesList from '../../components/cities-list/cities-list';
import SortingBlock from '../../components/sorting-block/sorting-block';
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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                to="/"
                className="header__logo-link header__logo-link--active"
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="favourites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
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
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
