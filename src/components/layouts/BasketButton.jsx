import PropTypes from "prop-types";
import React, { useState } from "react";
import { Box, Typography, colors } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { AddToBasekButton, RemoveFromBasekButton } from "./../buttons";

function BasketButton({ initialCount }) {
  const [count, setCount] = useState(initialCount || 0);
  const handleRemove=(e)=>{

    setCount(prevCount=>prevCount-1)
  }
  const handleAdd = (e)=>{
    setCount(prevCount=>prevCount+1)
  }
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {count > 0 && (
        <React.Fragment>
          <RemoveFromBasekButton
            aria-label="remove"
            sx={{
              bgcolor: colors.grey[500],
              padding: { xs: "2px" },
              color: colors.common.white,
            }}
            onClick={handleRemove}
          >
            <Remove />
          </RemoveFromBasekButton>
          <Typography
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            sx={{
              minWidth: "35px",
              color: colors.grey[700],
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
              fontWeight: "bold",
            }}
          >
            {count}
          </Typography>
        </React.Fragment>
      )}
      <AddToBasekButton
        aria-label="add"
        sx={{
          bgcolor: colors.green[600],
          padding: { xs: "2px" },
          color: colors.common.white,
        }}
        onClick={handleAdd}
      >
        <Add />
      </AddToBasekButton>
    </Box>
  );
}
BasketButton.propTypes = {
  initialCount: PropTypes.number,
};
export default BasketButton;
