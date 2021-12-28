import React, { useContext } from "react";
import { Box, Chip, Grid, Stack, Container, Divider } from "@mui/material";
import { common } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import {
  TabContext,
  Tabs as CategoriesTabs,
  TabPanel,
} from "./../components/layouts/Tabs";
import { detalBaseLinearGradient } from "./../configs/variables";
import { CenterVitrin } from "./../components/centers";

function IndexPage() {
  const theme = useTheme();
  const { selectedTab, setSelectedTab } = useContext(TabContext);

  const handleChangeIndex = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className="container">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundImage: "linear-gradient(120deg, #FAD961 0%, #F76B1C 57%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={0}>
            <Grid xs={4} sx={{ flexGrow: 1 }}>
              {/* market */}
              <Box
                sx={{
                  height: 300,
                  backgroundColor: "primary",
                  "&:hover": {
                    backgroundColor: "primary",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              />
            </Grid>
            <Grid xs={8}>
              {/* slider */}
              <Box
                sx={{
                  height: 300,
                  backgroundColor: "primary",
                  "&:hover": {
                    backgroundColor: "primary",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid xs={12} position="sticky" top="30px">
            <CategoriesTabs />
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ padding: 0, height: 1600 }}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={selectedTab}
          onChangeIndex={handleChangeIndex}
          slideStyle={{ direction: theme.direction }}
        >
          <TabPanel value={selectedTab} index={0}>
            <Stack direction="row" sx={{ pb: 1 }} spacing={1}>
              <Chip
                label="همه"
                sx={{
                  backgroundImage: detalBaseLinearGradient,
                  color: common.white,
                }}
                variant="filled"
              />
              <Chip label="غذای آماده" color="default" variant="outlined" />
            </Stack>

            <CenterVitrin
              name="رستوران جهانگیری - اوبا"
              description="غذاهای ویژه با برنج اعلای ایرانی با گوشت گوسفندی و کره محلی"
              deliveryTime="35-50"
            />
            <Divider />
            <CenterVitrin />
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            <Stack direction="row-reverse" spacing={2}>
              <Chip
                label="primary3"
                sx={{ mr: 1 }}
                color="primary"
                variant="filled"
              />
              <Chip label="primary4" color="primary" variant="outlined" />
            </Stack>
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </Container>
    </div>
  );
}

export default IndexPage;
