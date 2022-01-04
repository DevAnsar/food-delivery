import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  colors,
  Tabs,
  Tab,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "../components/layouts/Tabs";
import { detalBaseLinearGradient } from "../configs/variables";
import { HeaderBox,PersonalData,MyOrders } from "./../components/profile";

const new_theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
      contrastText: colors.red[200],
    },
  },
  typography: {
    fontFamily: ["Yekan"],
  },
});
const profileMenu = [
  {
    title: "اطلاعات حساب",
    element: <PersonalData />,
  },
  {
    title: "سفارشات من",
    element: <MyOrders />,
  },

  {
    title: "تراکنش های حساب",
    element: <PersonalData />,
  },

  {
    title: "اعتبارات دریافتی",
    element: <PersonalData />,
  },
];

function ProfilePage() {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  // useEffect(() => {
  //   getAuthUser();
  // }, []);

  const handleChangeTab = (index) => setSelectedTab(index);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <ThemeProvider theme={new_theme}>
      <div className="container">
        <Box
          sx={{
            backgroundImage: detalBaseLinearGradient,
          }}
        >
          <HeaderBox />
        </Box>
        <Container maxWidth="lg">
          <Grid container sx={{ pt: 0 }}>
            <Grid xs={12}>
              <Tabs
                value={selectedTab}
                onChange={(e, index) => handleChangeTab(index, e)}
                aria-label="basic tabs example"
                aria-label="primary tabs example"
                textColor="inherit"
                indicatorColor="secondary"
                sx={{ minHeight: { xs: "30px", lg: "40px" } }}
              >
                {profileMenu.map((tab, tabIndex) => (
                  <Tab
                    key={`cat-${tabIndex}`}
                    sx={{
                      color: colors.grey[700],
                      p: '15px 10px',
                      minHeight: { xs: "30px", lg: "40px" },
                      minWidth: { xs: "60px", lg: "70px" },
                    }}
                    {...a11yProps(tabIndex)}
                    label={tab.title}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid xs={12} sx={{ mb: { xs: "55px" } }}>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={selectedTab}
                onChangeIndex={(index) => handleChangeTab(index)}
                slideStyle={{ direction: theme.direction }}
              >
                {profileMenu.map((tab, tabIndex) => (
                  <TabPanel value={selectedTab} index={tabIndex}>
                    {tab.element}
                  </TabPanel>
                ))}
              </SwipeableViews>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
export default ProfilePage;
