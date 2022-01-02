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
  createTheme
} from "@mui/material";
import { getCenterApi } from "../api/Center";

import {
  ArrowBack,
  Circle,
  LocationOn,
  AccessTime,

} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Sentiment from "./../components/layouts/Sentiment";
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "./../components/layouts/Tabs";
import CenterProduct from "../components/centers/CenterProduct";

const new_theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
      contrastText:colors.red[200],
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
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    getDelivery();
  }, []);

  const getDelivery = async () => {
    try {
      setLoading(true);
      const { data } = await getCenterApi(deliveryId);
      const { status, message, delivery } = data;
      // console.log(data);
      setLoading(false);
      if (status) {
        setDelivery(delivery);
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
  const handleChangeTab = (e, newValue) => {
    setSelectedTab(newValue);
  };
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
            backgroundImage: "linear-gradient(120deg, #FAD961 0%, #F76B1C 57%)",
          }}
        >
          <Container maxWidth="lg">
            <Grid container>
              <Grid
                xs={12}
                sx={{
                  pt: { xs: 8, sm: 10, md: 11, lg: 12 },
                  pb: { xs: 1, sm: 2, md: 3 },
                }}
                display="flex"
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid xs={2} lg={1}></Grid>
                <Grid xs={8} lg={9}>
                  {loading ? (
                    <Skeleton width={200} variant="text" />
                  ) : (
                    <Typography
                      sx={{
                        color: colors.common.white,
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                      }}
                    >
                      رستوران جهانگیری - اوبا
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
                <Grid xs={2} display="flex" flexDirection="row-reverse">
                  <IconButton>
                    <ArrowBack
                      onClick={handleToBack}
                      sx={{
                        color: colors.common.white,
                        fontSize: { xs: "1.5rem", sm: "1.6rem", md: "2rem" },
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Grid container sx={{ pt: 1, pb: 1 }}>
            <Grid xs={2} lg={1} sx={{ position: "relative" }}>
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
            <Grid xs={8} lg={9}>
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
                  حداکثر زمان آماده سازی : 35 دقیقه
                </Typography>
              )}
            </Grid>
            <Grid xs={2} display="flex" flexDirection="row-reverse">
              <Sentiment
                level={1}
                sx={{
                  color: colors.red[600],
                  fontSize: { xs: "1.5rem", sm: "1.6rem", md: "2rem" },
                }}
              />
              {/* <SentimentVerySatisfied /> */}
              <Typography
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                sx={{ color: colors.grey[400], fontSize: "0.8rem" }}
              >
                432 ×
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container sx={{ pt: 0 }}>
            <Grid xs={12}>
              <Tabs
                value={selectedTab}
                onChange={handleChangeTab}
                aria-label="basic tabs example"
                aria-label="primary tabs example"
                textColor="inherit"
                indicatorColor="secondary"
                sx={{ minHeight:{xs:"30px" , lg :"40px"} }}
              >
                <Tab
                  key={`cat-1`}
                  sx={{
                    color: colors.grey[700],
                    p: 0,
                    minHeight: { xs: "30px" , lg :"40px"},
                    minWidth:{xs:"60px" , lg :"70px"},
                  }}
                  label="سرویس"
                  {...a11yProps(0)}
                />
                <Tab
                  key={`cat-2`}
                  sx={{
                    color: colors.grey[700],
                    p: 0,
                    minHeight: { xs: "30px" },
                    minWidth:{xs:"60px" , lg :"70px"},
                  }}
                  label="ناهار"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Grid>
            <Grid xs={12}>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={selectedTab}
                onChangeIndex={handleChangeTab}
                slideStyle={{ direction: theme.direction }}
              >
                <TabPanel value={selectedTab} index={0}>
                  <React.Fragment key={`cat-0-sub-provider-0`}>
                    <CenterProduct />
                    <Divider />
                  </React.Fragment>
                </TabPanel>
              </SwipeableViews>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
export default CenterPage;
