import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

//import pages
import {
  IndexPage,
  LoginPage,
  AddressesPage,
  CenterPage,
  SearchPage,
  OrdersPage,
  OrderTrackingPage,
  ProfilePage
} from "../pages";

//import components
import { TermsOfUse } from "../components/auth";

// declare app router variable
const routes = [
  {
    path: "/",
    element: <IndexPage />,
    private: true,
  },

  {
    path: "/login",
    element: <LoginPage />,
    private: false,
  },

  {
    path: "/center/:slug",
    element: <CenterPage />,
    private: true,
  },
  {
    path: "/my-addresses",
    element: <AddressesPage />,
    private: true,
  },
  {
    path: "/search",
    element: <SearchPage />,
    private: true,
  },
  {
    path: "/my-orders",
    element: <OrdersPage />,
    private: true,
  },
  {
    path: "/order-traking",
    element: <OrderTrackingPage />,
    private: true,
  },
  {
    path: "/my-profile/:page",
    element: <ProfilePage />,
    private: true,
  },
  {
    path: "/my-profile",
    element: <ProfilePage />,
    private: true,
  },
  {
    path: "/terms-of-use",
    element: <TermsOfUse />,
    private: false,
  },
];

//
function RouterComponent() {
  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.private) {
          return (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          );
        } else {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        }
      })}
    </Routes>
  );
}
export default RouterComponent;
