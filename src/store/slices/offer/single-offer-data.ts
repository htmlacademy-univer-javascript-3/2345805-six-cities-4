import { Offer, ExtendedOffer } from '../../../types/offer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOfferAction } from './api-actions';
import { NameSpace } from '../../../const';

type SingleOfferData = {
  offer: ExtendedOffer | null;
  isOfferLoading: boolean;
  hasError: boolean;
};

const updateFavorite = (state: SingleOfferData, id: string) => {
  if (state.offer && state.offer.id === id) {
    state.offer.isFavorite = !state.offer.isFavorite;
  }
};

const initialSingleOfferData: SingleOfferData = {
  offer: null,
  isOfferLoading: false,
  hasError: false,
};

export const singleOfferData = createSlice({
  name: NameSpace.SingleOfferData,
  initialState: initialSingleOfferData,
  reducers: {
    updateSingleOffer: (state, action: PayloadAction<Offer>) => {
      updateFavorite(state, action.payload.id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.hasError = false;
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.hasError = true;
        state.isOfferLoading = false;
      });
  },
});

export const { updateSingleOffer } = singleOfferData.actions;
