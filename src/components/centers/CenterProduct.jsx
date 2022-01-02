import PropTypes from "prop-types";
import { Grid, Avatar, Typography, Stack, colors } from "@mui/material";

import {
  Circle,
  AccessTime,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import BasketButton from "../layouts/BasketButton";

function CenterProduct() {
  return (
    <Grid container sx={{ my: 1 }}>
      <Grid container>
        <Grid xs={12} container>
          <Grid xs={10}>
            <Typography
              sx={{ color: colors.grey[900],fontSize:{ xs: "0.8rem", sm: "0.9rem", md: "1.1rem",lg:"1.2rem" },fontWeight:"bold" }}
            >
              پکیج خانواده 2
            </Typography>
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
        <Grid
          xs={12}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: colors.grey[600],fontSize:{ xs: "0.7rem", sm: "0.8rem", md: "0.95rem",lg:"1rem" } }}
          >
            2 
            عدد چلوجوجه،
            2
            عدد چلو کوبیده،
            1
            عدد چلوبرگ،
            نوشابه خانواده،
            مخصوص 5 نفر
          </Typography>
        </Grid>
        <Grid
          xs={12}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: colors.green[600],fontSize:{ xs: "0.9rem", sm: "1rem", md: "1.1rem",lg:"1.2rem" },fontWeight:"bold" }}
          >
            325,000
            تومان
          </Typography>
        </Grid>
        <Grid
          xs={12}
          container
          sx={{ mt: 0 }}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'flex-end'}
        >
          <BasketButton />
        </Grid>
      </Grid>
    </Grid>
  );
}
CenterProduct.defaultProps = {};

CenterProduct.propTypes = {};
export default CenterProduct;
