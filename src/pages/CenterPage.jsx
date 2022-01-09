import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  Skeleton,
  colors,
  Avatar,
  Tabs,
  Tab,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { getCenterApi } from "../api/Center";

import { ArrowBack, Circle, LocationOn, AccessTime } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Sentiment from "./../components/layouts/Sentiment";
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "./../components/layouts/Tabs";
import { CenterProduct, EmpityMenu } from "./../components/centers";
import { detalBaseLinearGradient } from "./../configs/variables";
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

function CenterPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id: deliveryId } = useParams();
  const [delivery, setDelivery] = useState({});
  const [menu, setMenu] = useState([
    { title: "", products: [{}, {}] },
    { title: "" },
    { title: "" },
  ]);

  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    getDelivery();
  }, [deliveryId]);

  const getDelivery = async () => {
    try {
      setLoading(true);
      const { data } = await getCenterApi(deliveryId);
      const { status, message, delivery } = data;
      // console.log(data);
      if (status) {
        setDelivery(delivery);
        if (delivery.menu && delivery.menu.length > 0) {
          setMenu((prevMenu) => {
            let newMenu = delivery.menu;
            prevMenu = [...newMenu];
            return prevMenu;
          });
        } else {
          setSelectedTab(1);
          setMenu([]);
        }
        setLoading(false);
      } else {
        // console.log(message);
        toast.error(message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleToBack = (e) => {
    e.preventDefault();
    navigate.go(-1);
  };
  const handleChangeTab = (index) => {
    // console.log(index);
    setSelectedTab(index);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <ThemeProvider theme={new_theme}>
      <div className="container"  style={{width:'100%'}}>
        <Box
          sx={{
            backgroundImage: detalBaseLinearGradient,
          }}
        >
          <Container maxWidth="lg">
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  pt: { xs: 9, sm: 10, md: 11, lg: 12 },
                  pb: { xs: 1, sm: 2, md: 3 },
                }}
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item xs={2} lg={1}></Grid>
                <Grid item xs={8} lg={9}>
                  {loading ? (
                    <Skeleton width={200} variant="text" />
                  ) : (
                    <Typography
                      sx={{
                        color: colors.common.white,
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                      }}
                    >
                      {delivery.name}
                    </Typography>
                  )}

                  {loading ? (
                    <Skeleton width={100} height={15} variant="text" />
                  ) : (
                    <Typography
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      sx={{
                        color: colors.common.white,
                        fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                      }}
                    >
                      <LocationOn
                        sx={{
                          fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                        }}
                      />
                      خیابان جام جام
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={2} display="flex" flexDirection="row-reverse">
                  {/* <IconButton>
                    <ArrowBack
                      onClick={handleToBack}
                      sx={{
                        color: colors.common.white,
                        fontSize: { xs: "1.5rem", sm: "1.6rem", md: "2rem" },
                      }}
                    />
                  </IconButton> */}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Grid container sx={{ pt: 1, pb: 1 }}>
            <Grid item xs={2} lg={1} sx={{ position: "relative" }}>
              {loading ? (
                <Skeleton
                  sx={{
                    position: "absolute",
                    top: {
                      xs: "-35px",
                      sm: "-35px",
                      md: "-50px",
                      lg: "-50px",
                      xl: "-55px",
                    },
                    width: { xs: "50px", sm: "60", md: "75px", lg: "90px" },
                    height: { xs: "50px", sm: "60", md: "75px", lg: "90px" },
                  }}
                  variant="circular"
                />
              ) : (
                <Avatar
                  sx={{
                    position: "absolute",
                    top: {
                      xs: "-35px",
                      sm: "-35px",
                      md: "-50px",
                      lg: "-50px",
                      xl: "-55px",
                    },
                    width: { xs: "50px", sm: "60", md: "75px", lg: "90px" },
                    height: { xs: "50px", sm: "60", md: "75px", lg: "90px" },
                  }}
                />
              )}
            </Grid>
            <Grid item xs={8} lg={9}>
              {loading ? (
                <Skeleton width={150} variant="text" />
              ) : online ? (
                <Typography
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  sx={{
                    color: colors.grey[900],
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  }}
                >
                  <Circle
                    sx={{ fontSize: 12, color: colors.green[400], mr: 1 }}
                  />
                  از 12 تا 16:30 و از 19 تا 22:30 سفارش میپذیرد{" "}
                </Typography>
              ) : (
                <Typography
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  sx={{
                    color: colors.grey[900],
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  }}
                >
                  <Circle
                    sx={{ fontSize: 12, color: colors.grey[700], mr: 1 }}
                  />
                  10 ساعت دیگر سفارش میپذیرد
                </Typography>
              )}
              {loading ? (
                <Skeleton width={200} height={10} variant="text" />
              ) : (
                <Typography
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  sx={{
                    color: colors.grey[700],
                    fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                  }}
                >
                  <AccessTime
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  />
                  حداکثر زمان آماده سازی :{delivery.deliveryTime}
                  دقیقه
                </Typography>
              )}
            </Grid>
            <Grid
            item
              xs={2}
              display="flex"
              flexDirection="row-reverse"
              alignItems={"center"}
            >
              {loading ? (
                <Skeleton width={20} height={20} variant="circular" />
              ) : (
                <Sentiment
                  level={1}
                  sx={{
                    color: colors.red[600],
                    fontSize: { xs: "1.5rem", sm: "1.6rem", md: "2rem" },
                  }}
                />
              )}
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                {loading ? (
                  <Skeleton width={30} variant="text" />
                ) : (
                  <Typography
                    sx={{ color: colors.grey[400], fontSize: "0.8rem" }}
                  >
                    432 ×
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Grid container sx={{ pt: 0 }}>
            <Grid item xs={12}>
              <Tabs
                value={selectedTab}
                onChange={(e, index) => handleChangeTab(index, e)}
                aria-label="basic tabs example"
                aria-label="primary tabs example"
                textColor="inherit"
                indicatorColor="secondary"
                sx={{ minHeight: { xs: "30px", lg: "40px" } }}
              >
                {menu.map((tab, tabIndex) => (
                  <Tab
                    key={`cat-${tabIndex}`}
                    sx={{
                      color: colors.grey[700],
                      p: 0,
                      minHeight: { xs: "30px", lg: "40px" },
                      minWidth: { xs: "60px", lg: "70px" },
                    }}
                    {...a11yProps(tabIndex)}
                    label={
                      tab.title ? (
                        tab.title
                      ) : (
                        <Skeleton key={`cat-Skeleton-${tabIndex}`} width={50} variant="text" />
                      )
                    }
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={12} sx={{ mb: { xs: "55px" } }}>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={selectedTab}
                onChangeIndex={(index) => handleChangeTab(index)}
                slideStyle={{ direction: theme.direction }}
              >
                {menu.map((tab, tabIndex) => (
                  <TabPanel value={selectedTab} index={tabIndex}>
                    {tab?.products?.map((product, productIndex) => (
                      <React.Fragment
                        key={`cat-${tabIndex}-sub-provider-${productIndex}`}
                      >
                        <CenterProduct provider={delivery} product={product} />
                        <Divider />
                      </React.Fragment>
                    ))}
                  </TabPanel>
                ))}
              </SwipeableViews>
              {menu.length === 0 && <EmpityMenu deliveryName={delivery.name} />}
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
export default CenterPage;
