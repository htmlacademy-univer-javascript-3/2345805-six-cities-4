import {
  checkAuthAction,
  fetchOffersAction,
  getHasError,
  getIsOffersLoading,
  store,
} from '../../store';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import AppRoutes from '../app-routes/app-routes';

import { useFetchFavorites } from './hooks';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getIsOffersLoading);
  const hasError = useAppSelector(getHasError);

  useFetchFavorites();

  if (isOffersDataLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return <AppRoutes />;
}

export default App;
