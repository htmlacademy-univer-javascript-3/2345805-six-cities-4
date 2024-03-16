import { createReducer } from '@reduxjs/toolkit';
import { setOffersList, changeCity } from './action';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';

type StateType = {
  city: string;
  offersList: Offer[];
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offersList = offers;
    });
});

export { reducer };
