import { Box, Typography, colors } from "@mui/material";

const EmpityOrderList = () => {
  return (
    <Box
      sx={{ minHeight: "200px" }}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        sx={{
          color: colors.grey[800],
          fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
        }}
      >
        چرا تا حالا هیچ سفارشی ثبت نکردی؟
      </Typography>
    </Box>
  );
};

export default EmpityOrderList;
