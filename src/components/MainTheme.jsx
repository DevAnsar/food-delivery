import NavBar from "./layouts/NavBar";
import { Grid } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { deepOrange, common, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material";
import { BottomNavigation } from "./layouts/NavBar";
import { useShowTheme } from "./../hooks/useShowTheme";
import { Toaster } from 'react-hot-toast';
import { ShoppingBasket } from './centers'
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      light: grey[700],
      main: grey[800],
      dark: grey[900],
      contrastText: common.black,
    },
    secondary: {
      light: "#ff7961",
      main: common.white,
      dark: "#ba000d",
      contrastText: "#000",
    },
    error: {
      main: deepOrange[800],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ["Yekan"],
  },
});

function MainTheme({ children, className }) {
  const { showTheme } = useShowTheme();
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} {...className} sx={{ minHeight: "100%" }}>
          {showTheme && (
            <Grid item xs={12} md={12}>
              <NavBar />
            </Grid>
          )}
          <Grid sx={{ paddingTop: 0, minHeight: "100%" }} xs={12} md={12}>
            {children}
            {showTheme && <BottomNavigation />}
          </Grid>
          <ShoppingBasket />
          <Toaster />
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
}
export default MainTheme;
