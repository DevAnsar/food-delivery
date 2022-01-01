import "./App.css";
import "./fonts/Yekan/Yekan.css";

import MainTheme from "./components/MainTheme";
import RouterComponent from "./components/RouterComponent";

import { AuthProvider, ThemeProvider ,TabsProvider } from "./providers";

function App() {
  return (
    <ThemeProvider>
        <MainTheme className="App">
          <AuthProvider>
            <TabsProvider>
              <RouterComponent />
            </TabsProvider>
          </AuthProvider>
        </MainTheme>
    </ThemeProvider>
  );
}

export default App;
