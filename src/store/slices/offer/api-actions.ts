import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedOffer } from '../../../types/offer';
import { APIRoute, Routes, NameSpace } from '../../../const';

import { AsyncThunkConfig } from '../../../types/state';
import { redirectToRoute } from '../../action';

export const fetchOfferAction = createAsyncThunk<
  ExtendedOffer | null,
  string,
  AsyncThunkConfig
>(
  `${NameSpace.SingleOfferData}/fetchOffer`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ExtendedOffer>(`${APIRoute.Offers}/${id}`);
      return data;
    } catch (e) {
      dispatch(redirectToRoute(Routes.NotFound));
      return null;
    }
  }
);
