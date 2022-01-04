import * as React from 'react'
import { useNavigate, useLocation } from "react-router-dom";

const RouteAdapter = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const adaptedHistory = React.useMemo(
      () => ({
        replace(location) {
          navigate(location, { replace: true, state: location.state });
        },
        push(location) {
          navigate(location, { replace: false, state: location.state });
        },
      }),
      [navigate]
    );
    return children({ history: adaptedHistory, location });
  };
  export default RouteAdapter;