import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offer';
import { APIRoute, NameSpace } from '../../../const';

import { AsyncThunkConfig } from '../../../types/state';

export const fetchNearbyAction = createAsyncThunk<
  Offer[],
  string,
  AsyncThunkConfig
>(`${NameSpace.NearbyOffersData}/fetchNearby`, async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(
    `${APIRoute.Offers}/${id}${APIRoute.Nearby}`
  );
  return data;
});
