import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';

export const changeCity = createAction<City>('changeCity');
export const setOffersList = createAction('setOffersList');
export const setSortType = createAction<string>('setSortType');
export const setSelectedPoint = createAction<{ title: string } | null>(
  'setSelectedPoint'
);
