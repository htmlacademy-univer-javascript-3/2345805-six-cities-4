import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offer';
import { APIRoute, NameSpace } from '../../../const';

import { AsyncThunkConfig } from '../../../types/state';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  AsyncThunkConfig
>(
  `${NameSpace.MultipleOffersData}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);
