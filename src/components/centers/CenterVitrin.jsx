import PropTypes from "prop-types";
import { Grid, Avatar, Typography, Stack } from "@mui/material";

import {
  Circle,
  AccessTime,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import { ScoreLabel, DeliveryLabel } from "./";
import { Link } from "react-router-dom";

function CenterVitrin({
  centerId,
  name,
  slug,
  centerAvatar,
  description,
  deliveryTime,
  favorite,
  handleLike,
  handleDisLike,
}) {
  return (
    <Grid container sx={{ my: 1 }}>
      <Grid container>
        <Grid item xs={12} container>
          <Grid item xs={2} container alignItems="center">
            <Link to={`/center/${slug}`}>
              <Avatar
                alt={name}
                src={centerAvatar}
                sx={{
                  width: { xs: 56, sm: 70, md: 90, lg: 100 },
                  height: { xs: 56, sm: 70, md: 90, lg: 100 },
                }}
              />
            </Link>
          </Grid>
          <Grid item xs={9}>
            <Link to={`/center/${slug}`}>
              <Typography
                variant="subtitle1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Circle sx={{ fontSize: 12, color: "#ccc", mr: 1 }} />
                {name}
              </Typography>

              <Typography
                variant="caption"
                sx={{ display: "flex", color: "#555" }}
              >
                {description}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  color: "#2d2d2d",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <AccessTime sx={{ fontSize: 12, mr: 1 }} />
                تحویل :{deliveryTime}
                دقیقه{" "}
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Grid item xs={11}>
            <Stack direction="row" sx={{ pb: 1 }} spacing={1}>
              <ScoreLabel score={3.5} vote={16} />
              <DeliveryLabel />
            </Stack>
          </Grid>
          <Grid item xs={1}>
            {favorite ? (
              <Favorite
                onClick={handleDisLike}
                sx={{ fontSize: 21, color: "#f44336" }}
              />
            ) : (
              <FavoriteBorder onClick={handleLike} sx={{ fontSize: 21 }} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
CenterVitrin.defaultProps = {
  favorite: false,
  centerAvatar: "/images/1.jpg",
};

CenterVitrin.propTypes = {
  centerId: PropTypes.any.isRequired,
  slug: PropTypes.string.isRequired,
  favorite: PropTypes.bool,
  centerAvatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  deliveryTime: PropTypes.string,
};
export default CenterVitrin;
