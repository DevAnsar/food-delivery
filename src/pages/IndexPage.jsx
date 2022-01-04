import React, { useEffect } from "react";
import { Box, Chip, Grid, Stack, Container, Divider } from "@mui/material";
import { common } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { Tabs as CategoriesTabs, TabPanel } from "./../components/layouts/Tabs";
import { detalBaseLinearGradient } from "./../configs/variables";
import { CenterVitrin } from "./../components/centers";
import { useLocalStorage } from "./../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useTab } from "../hooks/useTab";

function IndexPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [address] = useLocalStorage("user-address", null);
  const {
    selectedTab,
    subSelectedTab,
    setTab,
    categories,
    getSubCategoryDeliveries,
  } = useTab();

  useEffect(() => {
    if (address === null) {
      navigate("/my-addresses");
    }
  }, [address]);
  const handleChangeIndex = (index) => {
    setTab(index);
  };

  return (
    <div className="container">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundImage: detalBaseLinearGradient,
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
            <Grid xs={8} item>
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

          <Grid position="sticky" top="30px">
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
          {categories?.map((category, index) => {
            return (
              <TabPanel
                key={`cat-tab-panel-${category.id}`}
                value={selectedTab}
                index={index}
              >
                <Stack direction="row" sx={{ pb: 1 }} spacing={1}>
                  {category.sub.map((subCategory, index) => (
                    <Chip
                      onClick={() =>
                        getSubCategoryDeliveries(index, category, subCategory)
                      }
                      sx={{
                        backgroundImage:
                          subSelectedTab === index
                            ? detalBaseLinearGradient
                            : "",
                        color:
                          subSelectedTab === index ? common.white : "default",
                      }}
                      key={`cat-${category.id}-panel-${subCategory.id}`}
                      label={subCategory.title}
                    />
                  ))}
                </Stack>

                {category.sub[subSelectedTab]?.providers?.map(
                  (provider, index) => {
                    return (
                      <React.Fragment
                        key={`cat-${category.id}-sub-provider-${index}`}
                      >
                        <CenterVitrin
                          centerId={provider.id}
                          name={provider.name}
                          description={provider.description}
                          deliveryTime={provider.deliveryTime}
                        />
                        <Divider />
                      </React.Fragment>
                    );
                  }
                )}
              </TabPanel>
            );
          })}
        </SwipeableViews>
      </Container>
    </div>
  );
}

export default IndexPage;
