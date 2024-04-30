import { Route, Routes } from 'react-router-dom';

import useAppRoutes from './use-app-routes';

function AppRoutes(): JSX.Element {
  const { routes } = useAppRoutes();

  return (
    <Routes>
      {routes.map(({ path, element, layout }) => (
        <Route key={path} path={path} element={layout || element}>
          {layout && <Route index element={element} />}
        </Route>
      ))}
    </Routes>
  );
}
export default AppRoutes;
