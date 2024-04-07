/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { ExtendedOffer, Offer } from '../types/offer.js';
import {
  loadOffers,
  setError,
  setOffersDataLoadingStatus,
  setAuthorizationStatus,
  loadOfferData,
  addReview,
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, TIMEOUT_SHOW_ERROR, AuthorizationStatus } from '../const';
import { store } from './';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CommentFormData } from '../types/comment-form-data';
import { Review } from '../types/review.js';

export const clearErrorAction = createAsyncThunk('clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffers(data));
});

export const fetchOfferDataAction = createAsyncThunk<
  void,
  {
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('fetchOfferData', async ({ id }, { dispatch, extra: api }) => {
  const { data: offerInfo } = await api.get<ExtendedOffer>(
    `${APIRoute.Offers}/${id}`
  );
  const { data: nearestOffers } = await api.get<Offer[]>(
    `${APIRoute.Offers}/${id}/nearby`
  );
  const { data: reviews } = await api.get<Review[]>(
    `${APIRoute.Comments}/${id}`
  );
  dispatch(loadOfferData({ offerInfo, nearestOffers, reviews }));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(token);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
});

export const sendCommentAction = createAsyncThunk<
  void,
  {
    comment: CommentFormData;
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('sendComment', async ({ comment, id }, { dispatch, extra: api }) => {
  const { data: review } = await api.post<Review>(
    `${APIRoute.Comments}/${id}`,
    {
      comment: comment.comment,
      rating: comment.rating,
    }
  );
  dispatch(addReview(review));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
});
