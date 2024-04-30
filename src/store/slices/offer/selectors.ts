import { ExtendedOffer } from '../../../types/offer';
import { NameSpace } from '../../../const';

import { State } from '../../../types/state';

export const getOffer = (state: State): ExtendedOffer | null =>
  state[NameSpace.SingleOfferData].offer;

export const getIsOfferLoading = (state: State): boolean =>
  state[NameSpace.SingleOfferData].isOfferLoading;
