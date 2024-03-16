import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoutitesScreen from '../../pages/favourites-screen/favourites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PrivateRoute from '../private-route/private-route';
import { Review } from '../../types/review';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOffersList } from '../../store/action';
import { Offer } from '../../types/offer';

type AppComponentProps = {
  reviews: Review[];
};

function App({ reviews }: AppComponentProps): JSX.Element | null {
  const offers: Offer[] = useAppSelector((state) => state.offersList);
  const dispatch = useAppDispatch();
  dispatch(setOffersList());

  const favourites = offers.filter((o) => o.isFavorite);
  if (offers.length === 0) {
    return null;
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
              <FavoutitesScreen favourites={favourites} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/offer/:id"
          element={<OfferScreen reviews={reviews} offers={offers} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
