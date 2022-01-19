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
  ProfilePage,
} from "../pages";
import { Master, AllMenu, FormMenu , Products ,Product ,FormProduct } from "./../components/shop";
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

      <Route
        path="/my-shop"
        element={
          <ProtectedRoute>
            <Master />
          </ProtectedRoute>
        }
      >
        <Route index element={<AllMenu />} />
        <Route path="menus" element={<AllMenu />} />
        <Route path="menus/:id/edit" element={<FormMenu mode="edit" />} />
        <Route path="menus/create" element={<FormMenu mode="add" />} />
        <Route path="menus/:menuId/products" element={<Products  />} />
        <Route path="menus/:menuId/products/:productId" element={<Product  />} />
        <Route path="menus/:menuId/products/create" element={<FormProduct mode="add"  />} />
        <Route path="menus/:menuId/products/:productId/edit" element={<FormProduct mode="edit"  />} />

        <Route path="payments" element={<AllMenu />} />
        <Route path="orders" element={<AllMenu />} />
      </Route>
    </Routes>
  );
}
export default RouterComponent;
