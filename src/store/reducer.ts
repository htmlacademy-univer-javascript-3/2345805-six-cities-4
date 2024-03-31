import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  changeCity,
  setSortType,
  setSelectedPoint,
  setError,
  setOffersDataLoadingStatus,
} from './action';
import { City, Offer } from '../types/offer';

type StateType = {
  city: City;
  offersList: Offer[];
  selectedSortType: string;
  selectedPoint: {
    title: string;
  } | null;
  isOffersDataLoading: boolean;
  error: string | null;
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
  isOffersDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.selectedSortType = payload;
    })
    .addCase(loadOffers, (state, { payload }) => {
      state.offersList = payload;
    })
    .addCase(setSelectedPoint, (state, { payload }) => {
      state.selectedPoint = payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
