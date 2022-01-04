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
  OrderTrakingPage
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
    path: "/center/:id",
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
    element: <OrderTrakingPage />,
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
