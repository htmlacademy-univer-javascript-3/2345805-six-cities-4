import { Navigate } from 'react-router-dom';
import { Routes, AuthorizationStatus } from '../../const';

type MainRouteRedirectionProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
};

function MainRouteRedirection({
  children,
  authorizationStatus,
}: MainRouteRedirectionProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    <Navigate to={Routes.Main} />
  ) : (
    children
  );
}

export default MainRouteRedirection;
