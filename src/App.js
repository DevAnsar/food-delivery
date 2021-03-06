import * as React from "react";
import "./App.css";
import "./fonts/Yekan/Yekan.css";

import MainTheme from "./components/MainTheme";
import RouterComponent from "./components/RouterComponent";

import {
  AuthProvider,
  ThemeProvider,
  TabsProvider,
  SplashProvider,
  SearchProvider,
  ShoppingBasketProvider,
  AddressProvider,
} from "./providers";
import { QueryParamProvider } from "use-query-params";
import RouteAdapter from "./configs/RouteAdapter";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ThemeProvider>
      <SplashProvider>
        <ErrorBoundary>
          <QueryParamProvider ReactRouterRoute={RouteAdapter}>
            <AddressProvider>
              <AuthProvider>
                <ShoppingBasketProvider>
                  <MainTheme className="App">
                    <TabsProvider>
                      <SearchProvider>
                        <RouterComponent />
                      </SearchProvider>
                    </TabsProvider>
                  </MainTheme>
                </ShoppingBasketProvider>
              </AuthProvider>
            </AddressProvider>
          </QueryParamProvider>
        </ErrorBoundary>
      </SplashProvider>
    </ThemeProvider>
  );
}

export default App;
