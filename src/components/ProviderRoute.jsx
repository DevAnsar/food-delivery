import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const ProtectedRoute = ({ children }) => {
  const {
    user: { provider },
  } = useAuth();

  // console.log('loggedIn',loggedIn)
  return provider !== null ? children : <Navigate replace to="/create-provider-account" />;
};
export default ProtectedRoute;
