import { Offer } from '../../../types/offer';
import { NameSpace } from '../../../const';

import { State } from '../../../types/state';

export const getOffers = (state: State): Offer[] =>
  state[NameSpace.MultipleOffersData].offers;

export const getIsOffersLoading = (state: State): boolean =>
  state[NameSpace.MultipleOffersData].isOffersLoading;
