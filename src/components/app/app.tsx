import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoutitesScreen from '../../pages/favourites-screen/favourites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { Review } from '../../types/review';
import { useAppSelector } from '../../hooks';

type AppComponentProps = {
  reviews: Review[];
};

function App({ reviews }: AppComponentProps): JSX.Element | null {
  const isOffersDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading
  );

  if (isOffersDataLoading) {
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
            <PrivateRoute>
              <FavoutitesScreen />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/offer/:id" element={<OfferScreen reviews={reviews} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
