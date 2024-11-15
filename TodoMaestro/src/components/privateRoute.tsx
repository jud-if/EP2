import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

   // Mientras se carga la validación, evita mostrar nada
   if (loading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/iniciosesion" />
      }
    />
  );
};

export default PrivateRoute;
