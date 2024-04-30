import { Offer } from '../../../types/offer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { fetchNearbyAction } from './api-actions';
import { updateFavourites } from './utils';

type NearbyOffersData = {
  nearby: Offer[];
  isNearbyOffersLoading: boolean;
  hasError: boolean;
};

const initialNearbyData: NearbyOffersData = {
  nearby: [],
  isNearbyOffersLoading: false,
  hasError: false,
};

export const nearbyOffersData = createSlice({
  name: NameSpace.NearbyOffersData,
  initialState: initialNearbyData,
  reducers: {
    updateMultipleNearby: (state, action: PayloadAction<Offer>) => {
      updateFavourites(state.nearby, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNearbyAction.pending, (state) => {
        state.hasError = false;
        state.isNearbyOffersLoading = true;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.hasError = false;
        state.nearby = action.payload;
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.hasError = true;
        state.isNearbyOffersLoading = false;
      });
  },
});

export const { updateMultipleNearby } = nearbyOffersData.actions;
