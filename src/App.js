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
} from "./providers";
import { QueryParamProvider } from "use-query-params";
import RouteAdapter from "./configs/RouteAdapter";

function App() {
  return (
    <ThemeProvider>
      <SplashProvider>
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
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
        </QueryParamProvider>
      </SplashProvider>
    </ThemeProvider>
  );
}

export default App;
