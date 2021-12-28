import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material";

import {Menu as MenuIcon} from "@mui/icons-material";
import { UserSettings,Navigation } from "./index";



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
          <Typography
            variant="h6"
            noWrap
            color="secondary"
            component="div"
            sx={{ mr: 2, display: { xs: "none", sm: "flex" } }}
          >
            دتال
          </Typography>

          {/* /buttom nav/ */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            <Navigation />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
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
          </Box>

          <Typography
            color="secondary"
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}
          >
            دتال
          </Typography>

          {/* // */}
          <UserSettings />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
