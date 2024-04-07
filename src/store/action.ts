/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';
import { Offer } from '../types/offer';
import { OfferData } from '../types/offer-data';
import { AuthorizationStatus } from '../const';
import { Review } from '../types/review';

export const setOffersDataLoadingStatus = createAction<boolean>(
  'setOffersDataLoadingStatus'
);
export const loadOffers = createAction<Offer[]>('loadOffers');
export const loadOfferData = createAction<OfferData>('loadOfferData');
export const setError = createAction<string | null>('setError');
export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'setAuthorizationStatus'
);
export const addReview = createAction<Review>('addReview');

export const changeCity = createAction<City>('changeCity');
export const setSortType = createAction<string>('setSortType');
export const setSelectedPoint = createAction<{ id: string } | null>(
  'setSelectedPoint'
);
