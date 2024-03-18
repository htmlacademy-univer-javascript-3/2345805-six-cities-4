import { createReducer } from '@reduxjs/toolkit';
import {
  setOffersList,
  changeCity,
  setSortType,
  setSelectedPoint,
} from './action';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';

type StateType = {
  city: string;
  offersList: Offer[];
  selectedSortType: string;
  selectedPoint: {
    title: string;
  } | null;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  selectedSortType: 'Popular',
  selectedPoint: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
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
