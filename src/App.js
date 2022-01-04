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
  SearchProvider
} from "./providers";
import { QueryParamProvider } from "use-query-params";
import RouteAdapter from "./configs/RouteAdapter";

function App() {
  return (
    <ThemeProvider>
      <SplashProvider>
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
          <MainTheme className="App">
            <AuthProvider>
              <TabsProvider>
                <SearchProvider>
                  <RouterComponent />
                </SearchProvider>
              </TabsProvider>
            </AuthProvider>
          </MainTheme>
        </QueryParamProvider>
      </SplashProvider>
    </ThemeProvider>
  );
}

export default App;
