import { Navigate } from "react-router-dom";
import { useAuth } from "./../hooks/useAuth";
const ProtectedRoute = ({ children }) => {
  const {
    user: { loggedIn },
  } = useAuth();

  console.log('loggedIn',loggedIn)
  return loggedIn ? children : <Navigate replace to="/login" />;
};
export default ProtectedRoute;
