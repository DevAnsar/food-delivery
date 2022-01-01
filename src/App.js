import "./App.css";
import "./fonts/Yekan/Yekan.css";

import MainTheme from "./components/MainTheme";
import RouterComponent from "./components/RouterComponent";

import {
  AuthProvider,
  ThemeProvider,
  TabsProvider,
  SplashProvider,
} from "./providers";

function App() {
  return (
    <ThemeProvider>
      <SplashProvider>
        <MainTheme className="App">
          <AuthProvider>
            <TabsProvider>
              <RouterComponent />
            </TabsProvider>
          </AuthProvider>
        </MainTheme>
      </SplashProvider>
    </ThemeProvider>
  );
}

export default App;
