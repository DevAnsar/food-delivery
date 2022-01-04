import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Navigation, ShoppingBasketReview } from ".";
import DetalLogo from "./../../../images/detal.png";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        borderColor: "divider",
        backgroundImage: "linear-gradient(120deg, #FAD961 0%, #F76B1C 57%)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{ mr: 2, display: { xs: "none", sm: "flex" } }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Link to="/">
              <img style={{ width: "50px" }} src={DetalLogo} />
            </Link>
          </Box>

          {/* /buttom nav/ */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            <Navigation />
          </Box>

          <Grid
            container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}
          >
            <Grid xs={1}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid
              xs={9}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Link to="/" style={{ width: "inherit" }}>
                  <img style={{ width: "45px" }} src={DetalLogo} />
              </Link>
            </Grid>

            {/* /user basket/ */}
            {/* <UserSettings /> */}
            <ShoppingBasketReview />
          </Grid>

          <Grid sx={{ flexGrow: 0, display: { xs: "none", sm: "flex" } }}>
            {/* /user basket/ */}
            {/* <UserSettings /> */}
            <ShoppingBasketReview />
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
