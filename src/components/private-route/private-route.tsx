import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, Routes } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
  userAuthorizationStatus: AuthorizationStatus;
};

function PrivateRoute({
  children,
  userAuthorizationStatus,
}: PrivateRouteProps): JSX.Element {
  return userAuthorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={Routes.Login} />
  );
}

export default PrivateRoute;
