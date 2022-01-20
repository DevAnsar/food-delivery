import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProviderRoute from "./ProviderRoute";

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
  CreateProviderPage
} from "../pages";
import { Master, AllMenu, FormMenu , Products ,Product ,FormProduct,ShopInformation ,ShopInformationEdit } from "./../components/shop";
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
    path: "/create-provider-account",
    element: <CreateProviderPage />,
    private: true,
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
        <Route index element={<ProviderRoute><AllMenu /></ProviderRoute>} />
        <Route path="menus" element={<ProviderRoute><AllMenu /></ProviderRoute>} />
        <Route path="menus/:id/edit" element={<ProviderRoute><FormMenu mode="edit" /></ProviderRoute>} />
        <Route path="menus/create" element={<ProviderRoute><FormMenu mode="add" /></ProviderRoute>} />
        <Route path="menus/:menuId/products" element={<ProviderRoute><Products  /></ProviderRoute>} />
        <Route path="menus/:menuId/products/:productId" element={<ProviderRoute><Product  /></ProviderRoute>} />
        <Route path="menus/:menuId/products/create" element={<ProviderRoute><FormProduct mode="add"  /></ProviderRoute>} />
        <Route path="menus/:menuId/products/:productId/edit" element={<ProviderRoute><FormProduct mode="edit"  /></ProviderRoute>} />
        <Route path="information" element={<ProviderRoute><ShopInformation /></ProviderRoute>} />
        <Route path="information/edit" element={<ProviderRoute><ShopInformationEdit /></ProviderRoute>} />

        <Route path="payments" element={<ProviderRoute><AllMenu /></ProviderRoute>} />
        <Route path="orders" element={<ProviderRoute><AllMenu /></ProviderRoute>} />
      </Route>
    </Routes>
  );
}
export default RouterComponent;
