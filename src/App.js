import "./App.css";
import "./fonts/Yekan/Yekan.css";
import { Routes, Route } from "react-router-dom";
import MainTheme from "./components/MainTheme";
import IndexPage from "./pages/IndexPage";

import { TabsProvider } from "./components/layouts/Tabs";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <MainTheme className="App">
      <AuthProvider>
        <TabsProvider>
          <Routes>
            <Route path="/" element={<IndexPage />} />
          </Routes>
        </TabsProvider>
      </AuthProvider>
    </MainTheme>
  );
}

export default App;
