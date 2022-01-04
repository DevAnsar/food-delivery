import * as React from "react";
import { Box, Tooltip, IconButton, Badge,styled, colors } from "@mui/material";
import { ShoppingBasket } from "@mui/icons-material";
import {detalBaseLinearGradient}from './../../../configs/variables'
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 20,
    top: 5,
    backgroundImage:detalBaseLinearGradient,
    border: `none`,
    padding: "0 4px",
    color: colors.common.white,
  },
}));

function ShoppingBasketReview() {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="سبد خرید">
        <StyledBadge badgeContent={4} color="secondary">
          <IconButton sx={{ p: 0, color: colors.common.white }}>
            <ShoppingBasket />
          </IconButton>
        </StyledBadge>
      </Tooltip>
    </Box>
  );
}
export default ShoppingBasketReview;
