import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoutitesScreen from '../../pages/favourites-screen/favourites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
// import HistoryRouter from '../history-route/history-route';
// import browserHistory from '../../browser-history';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

function App(): JSX.Element | null {
  const authorizationStatus: AuthorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const isOffersDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading
  );

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isOffersDataLoading
  ) {
    return <LoadingScreen />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorScreen />} />
        <Route path="/" element={<MainScreen />} />
        <Route
          path="/favourites"
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoutitesScreen />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/offer/:id" element={<OfferScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
