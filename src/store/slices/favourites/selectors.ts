import { NameSpace } from '../../../const';
import { Offer } from '../../../types/offer';
import { State } from '../../../types/state';

export const getFavorites = (state: State): Offer[] =>
  state[NameSpace.FavouritesData].favourites;

export const getFavouritesCount = (state: State): number =>
  state[NameSpace.FavouritesData].favourites.length;

export const getIsFavoritesLoading = (state: State): boolean =>
  state[NameSpace.FavouritesData].isFavouritesLoading;

export const getIsFavoriteStatusSubmitting = (state: State): boolean =>
  state[NameSpace.FavouritesData].isFavouriteStatusSubmitting;
