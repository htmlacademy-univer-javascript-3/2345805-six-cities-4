import { getAuthorizationStatus } from '../../store';
import { useAppSelector } from '../../hooks';
import { Routes } from '../../const';
import PageLayout from '../page-layout/page-layout';
import MainScreen from '../../pages/main-screen/main-screen';

import MainRouteRedirection from '../main-route-redirection/main-route-redirection';
import PrivateRouteRoute from '../private-route/private-route';
import FavoritesScreen from '../../pages/favourites-screen/favourites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';

function useAppRoutes() {
  const userAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  const routes = [
    {
      path: Routes.Main,
      element: <MainScreen />,
      layout: <PageLayout isHeaderActiveLogo={false} />,
    },
    {
      path: Routes.Login,
      element: (
        <MainRouteRedirection authorizationStatus={userAuthorizationStatus}>
          <LoginScreen />
        </MainRouteRedirection>
      ),
      layout: <PageLayout isHeaderUserNavigation={false} />,
    },
    {
      path: Routes.Favorites,
      element: (
        <PrivateRouteRoute userAuthorizationStatus={userAuthorizationStatus}>
          <FavoritesScreen />
        </PrivateRouteRoute>
      ),
      layout: <PageLayout isFooterShow />,
    },
    {
      path: Routes.Offer,
      element: <OfferScreen />,
      layout: <PageLayout isFooterShow />,
    },
    {
      path: Routes.NotFound,
      element: (
        <PageLayout isFooterShow>
          <ErrorScreen />
        </PageLayout>
      ),
    },
  ];

  return { routes };
}

export default useAppRoutes;
