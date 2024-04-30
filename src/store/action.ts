/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { createAction } from '@reduxjs/toolkit';
import { Routes } from '../const';

export const REDIRECT_TO_ROUTE_TYPE = 'app/redirectToRoute';

export const redirectToRoute = createAction<Routes>(REDIRECT_TO_ROUTE_TYPE);
