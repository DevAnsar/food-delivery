import React, { useEffect } from "react";
import {
  Box,
  Chip,
  Grid,
  Stack,
  Container,
  Divider,
  Typography,
  colors,
} from "@mui/material";
import { ArrowBack, LocationOn } from "@mui/icons-material";
import { common } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { Tabs as CategoriesTabs, TabPanel } from "./../components/layouts/Tabs";
import { detalBaseLinearGradient } from "./../configs/variables";
import { CenterVitrin } from "./../components/centers";
import { useLocalStorage } from "./../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useTab } from "../hooks/useTab";
import { WhiteButton } from "./../components/buttons";
import superMarketImage from "./../images/super_market.png";
import SliderImage from "./../images/SliderImage.jpg";

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
    setProviderLike
  } = useTab();

  useEffect(() => {
    if (address === null) {
      navigate("/my-addresses");
    }
  }, [address]);

  const handleChangeIndex = (index) => {
    setTab(index);
  };

  const handleLikeProvider = (e,providerId)=>{
    e.preventDefault();
    console.log(providerId);
    setProviderLike(providerId,true);
  }

  
  const handleDisLikeProvider = (e,providerId)=>{
    e.preventDefault();
    console.log(providerId);
    setProviderLike(providerId,false);
  }

  return (
    <div className="container" style={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundImage: detalBaseLinearGradient,
        }}
      >
        <Container maxWidth="md">
          <Grid
            container
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              sx={{ flexGrow: 1, pt: { xs: 9, sm: 10, md: 11, lg: 12 } }}
            >
              <WhiteButton fullWidth onClick={() => navigate("/my-addresses")}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <LocationOn
                      sx={{
                        color: colors.grey[700],
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    xs={10}
                  >
                    <Typography
                      sx={{
                        color: colors.grey[700],
                        fontSize: { xs: "0.82rem", sm: "1rem", md: "1rem" },
                        fontWeight: "bold",
                      }}
                    >
                      {address?.name}
                    </Typography>
                    <Typography
                      sx={{
                        ml: 1,
                        color: colors.grey[600],
                        fontSize: { xs: "0.75rem", sm: "1rem", md: "1rem" },
                      }}
                    >
                      {address?.address}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <ArrowBack
                      sx={{
                        color: colors.grey[600],
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      }}
                    />
                  </Grid>
                </Grid>
              </WhiteButton>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            sx={{ mt: 2, mb: 2 }}
            display="flex"
            flexDirection="row"
            justifyContent='space-between'
          >
            <Box sx={{  width: "34.5%" }}>
              {/* market */}

              <img
                src={superMarketImage}
                style={{ width: "100%", borderRadius: 10 }}
              />
            </Box>
            <Box sx={{width: "61.5%" }}>
              {/* slider */}

              <img
                src={SliderImage}
                style={{ width: "100%", borderRadius: 10 }}
              />
            </Box>
          </Grid>
        </Container>
        <Container maxWidth="lg">
          <Grid position="sticky" top="30px">
            <CategoriesTabs />
          </Grid>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          p: 0,
          pb: 10,
          minHeight: { xs: "500px", md: "600px", lg: "700px" },
        }}
      >
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
                <Stack
                  direction="row"
                  sx={{ pb: 1, overflowX: "auto" }}
                  spacing={1}
                >
                  {category.sub.map((subCategory, index) => (
                    <Chip
                      onClick={() =>
                        getSubCategoryDeliveries(
                          index,
                          category.id,
                          subCategory.id
                        )
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
                          slug={provider.slug}
                          description={provider.description}
                          deliveryTime={provider.deliveryTime}
                          favorite={provider.like}
                          handleLike={(e)=>handleLikeProvider(e,provider.id)}
                          handleDisLike={(e)=>handleDisLikeProvider(e,provider.id)}
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
