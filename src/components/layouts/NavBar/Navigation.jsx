import * as React from "react";
import { Grid, AppBar, Box, Toolbar, IconButton, colors } from "@mui/material";

import {
  Person,
  Search as SearchIcon,
  Apps,
  Moped,
  FormatListBulleted,
} from "@mui/icons-material";

import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink, Link } from "react-router-dom";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -15,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function Navigation() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid>
        <NavLink to="/">
          <IconButton>
            <Apps color="inherit" />
          </IconButton>
        </NavLink>
      </Grid>

      <Grid>
        <NavLink to="/term-of-use">
          <IconButton aria-label="open drawer">
            <Moped color="inherit" />
          </IconButton>
        </NavLink>
      </Grid>

      <Grid>
        <IconButton>
          <SearchIcon color="inherit" />
        </IconButton>
      </Grid>

      <Grid>
        <IconButton aria-label="open drawer">
          <FormatListBulleted color="inherit" />
        </IconButton>
      </Grid>

      <Grid>
        <IconButton>
          <Person />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function BottomNavigation() {
  return (
    <AppBar
      position="fixed"
      color="secondary"
      sx={{ top: "auto", bottom: 0, display: { xs: "flex", sm: "none" } }}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid>
            <Link to="/term-of-use">
              <IconButton color="inherit" aria-label="open drawer">
                <Moped />
              </IconButton>
            </Link>
          </Grid>

          <Grid>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Grid>

          <Grid>
            <Link to="/">
              <StyledFab
                sx={{
                  backgroundColor: colors.red[500],
                  "&:hover": {
                    backgroundColor: colors.red[600],
                  },
                }}
                aria-label="add"
              >
                <Apps sx={{color:colors.common.white}} />
              </StyledFab>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
          </Grid>

          <Grid>
            <IconButton color="inherit" aria-label="open drawer">
              <FormatListBulleted />
            </IconButton>
          </Grid>

          <Grid>
            <IconButton color="inherit">
              <Person />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export { BottomNavigation };
export default Navigation;
