import { createReducer } from '@reduxjs/toolkit';
import {
  setOffersList,
  changeCity,
  setSortType,
  setSelectedPoint,
} from './action';
import { offers } from '../mocks/offers';
import { City, Offer } from '../types/offer';

type StateType = {
  city: City;
  offersList: Offer[];
  selectedSortType: string;
  selectedPoint: {
    title: string;
  } | null;
};

const initialState: StateType = {
  city: {
    name: 'Paris',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
  },
  offersList: [],
  selectedSortType: 'Popular',
  selectedPoint: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = { ...payload };
    })
    .addCase(setSortType, (state, { payload }) => {
      state.selectedSortType = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offersList = offers;
    })
    .addCase(setSelectedPoint, (state, { payload }) => {
      state.selectedPoint = payload;
    });
});

export { reducer };
