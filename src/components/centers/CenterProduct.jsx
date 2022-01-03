import PropTypes from "prop-types";
import { Grid, Typography, colors, Skeleton, Box } from "@mui/material";

import BasketButton from "../layouts/BasketButton";

function CenterProduct({ product }) {
  return (
    <Grid container sx={{ my: 1 }}>
      <Grid container>
        <Grid xs={12} container>
          <Grid xs={10}>
            {product.title ? (
              <Typography
                sx={{
                  color: colors.grey[900],
                  fontSize: {
                    xs: "0.8rem",
                    sm: "0.9rem",
                    md: "1.1rem",
                    lg: "1.2rem",
                  },
                  fontWeight: "bold",
                }}
              >
                پکیج خانواده 2
              </Typography>
            ) : (
              <Skeleton width={150} variant="text" />
            )}
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
        <Grid
          xs={12}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 0 }}
        >
          {product.description ? (
            <Typography
              variant="subtitle1"
              sx={{
                color: colors.grey[600],
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.8rem",
                  md: "0.95rem",
                  lg: "1rem",
                },
              }}
            >
              2 عدد چلوجوجه، 2 عدد چلو کوبیده، 1 عدد چلوبرگ، نوشابه خانواده،
              مخصوص 5 نفر
            </Typography>
          ) : (
            <Skeleton width={120} variant="text" />
          )}
        </Grid>
        <Grid xs={12}>
          {product.price ? (
            <Typography
              variant="subtitle1"
              sx={{
                color: colors.green[600],
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
                fontWeight: "bold",
              }}
            >
              {product.price}
              {" "}
               تومان
            </Typography>
          ) : (
            <Box display="flex" flexDirection="row">
              <Skeleton width={50} variant="text" sx={{mr:1}} />
              <Skeleton width={30} variant="text" />
            </Box>
          )}
        </Grid>
        <Grid
          xs={12}
          container
          sx={{ mt: 0 }}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          {
            product.id ? (
              <BasketButton />
            ):(
              <Skeleton width={28} height={28} variant="circular"  />
            )
          }

        </Grid>
      </Grid>
    </Grid>
  );
}
CenterProduct.defaultProps = {};

CenterProduct.propTypes = {
  product: PropTypes.object,
};
export default CenterProduct;
