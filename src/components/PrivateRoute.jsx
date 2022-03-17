import useAuthStatus from 'hooks/useAuthStatus';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const PrivateRoute = ({ children }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) return Spinner;
  return loggedIn ? children : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
