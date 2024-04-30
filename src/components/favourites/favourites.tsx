import { Offer } from '../../types/offer.ts';
import FavouritesList from '../favourites-list/favourites-list';

type FavouritesProps = {
  favorites: Offer[];
};

function Favourites({ favorites }: FavouritesProps): JSX.Element {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <FavouritesList favoriteList={favorites} />
    </section>
  );
}

export default Favourites;
