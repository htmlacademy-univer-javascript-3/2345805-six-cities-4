import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../../../const';
import { AsyncThunkConfig } from '../../../types/state';
import { AuthData } from '../../../types/auth-data';
import { UserData } from '../../../types/user-data';
import { dropToken, saveToken } from '../../../services/token';
import { fetchOffersAction } from '../multiple-offers';

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  AsyncThunkConfig
>(`${NameSpace.User}/checkAuth`, async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  AsyncThunkConfig
>(
  `${NameSpace.User}/login`,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    dispatch(fetchOffersAction());
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dispatch(fetchOffersAction());
    dropToken();
  }
);
