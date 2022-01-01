import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  colors,
  Avatar,
} from "@mui/material";
import { getCenterApi } from "../api/Center";

import {
  ArrowBack,
  Circle,
  LocationOn,
  AccessTime,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Sentiment from "./../components/layouts/Sentiment";

function CenterPage() {
  const { id: deliveryId } = useParams();
  const [delivery, setDelivery] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
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
                <Typography
                  sx={{
                    color: colors.common.white,
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                  }}
                >
                  رستوران جهانگیری - اوبا
                </Typography>
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
              </Grid>
              <Grid xs={2} display="flex" flexDirection="row-reverse">
                <IconButton>
                  <ArrowBack
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
            <Avatar
              sx={{
                position: "absolute",
                top : {xs:"-35px",sm:"-35px" , md:"-50px" , lg:"-50px",xl:"-55px"},
                width: { xs: "50px",sm :"60", md: "75px", lg: "90px" },
                height: { xs: "50px",sm :"60", md: "75px", lg: "90px" },
              }}
            />
          </Grid>
          <Grid xs={8} lg={9}>
            <Typography
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              sx={{
                color: colors.grey[900],
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
              }}
            >
              <Circle sx={{ fontSize: 12, color: "#ccc", mr: 1 }} />
              10 ساعت دیگر سفارش میپذیرد
            </Typography>
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
        <Grid container sx={{ pt: 1 }}>
          <Grid xs={12}>12</Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default CenterPage;
