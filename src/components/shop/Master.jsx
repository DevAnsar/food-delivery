import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  colors,
} from "@mui/material";
import { Tabs as Menu, Tab } from "@mui/material";
import { detalBaseLinearGradient } from "./../../configs/variables";
import { Link, Outlet } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Master() {
  const [selectedTab, setTab] = useState(0);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setTab(newValue);
  };

  return (
    <div className="container" style={{ width: "100%" }}>
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
                pt: { xs: 11, sm: 11, md: 11, lg: 12 },
                pb: { xs: 1, sm: 2, md: 3 },
              }}
              display="flex"
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.9rem",
                    md: "0.95rem",
                    lg: "1rem",
                  },
                  color: colors.common.white,
                }}
              >
                مدیریت فروشگاه
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              direction="row"
            >
              <Menu
                value={selectedTab}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="primary tabs example"
              >
                <Tab
                  key={`menu-1`}
                  label={<Link to={"/my-shop"}>مدیریت فروشگاه</Link>}
                  {...a11yProps(1)}
                />
                <Tab
                  key={`menu-2`}
                  label={<Link to={"/my-shop/payments"}>تراکنشات</Link>}
                  {...a11yProps(2)}
                />
                <Tab
                  key={`menu-3`}
                  label={<Link to={"/my-shop/orders"}>سفارشات</Link>}
                  {...a11yProps(3)}
                />

              </Menu>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container sx={{ pt: 1, pb: 1 }}>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default Master;
