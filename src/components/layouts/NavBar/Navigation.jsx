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
        <IconButton color="inherit">
          <Apps color="secondary" />
        </IconButton>
      </Grid>

      <Grid>
        <IconButton color="inherit" aria-label="open drawer">
          <Moped />
        </IconButton>
      </Grid>

      <Grid>
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
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
            <IconButton color="inherit" aria-label="open drawer">
              <Moped />
            </IconButton>
          </Grid>

          <Grid>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Grid>

          <Grid>
            <StyledFab sx={{ bgcolor: colors.red[500] }} aria-label="add">
              <Apps color="secondary" />
            </StyledFab>
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
