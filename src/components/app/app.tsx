import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoutitesScreen from '../../pages/favourites-screen/favourites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PrivateRoute from '../private-route/private-route';

type AppComponentProps = {
  placesCount: number;
};

function App({ placesCount }: AppComponentProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorScreen />} />
        <Route path="/" element={<MainScreen placesCount={placesCount} />} />
        <Route
          path="/favourites"
          element={
            <PrivateRoute>
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
