import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Skeleton,
  Slider,
  Tooltip,
  colors,
} from "@mui/material";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { getInformationApi } from "../../../../api/Shop";

import GreyButton from "../../../buttons/GreyButton";
import { useNavigate } from "react-router-dom";
import MyShopNavigation, {
  MyShopNavigationList,
} from "./../navigation/Navigations";

function valuetext(value) {
  return `${value} ساعت`;
}

function ShopInformation() {
  const navigate = useNavigate();
  const [shop, setShop] = useState({});
  const [loading, setLoading] = useState(true);
  const [workTime, setWorkTime] = React.useState([9, 13]);

  useEffect(() => {
    getInformation();
  }, []);
  const getInformation = async () => {
    try {
      setLoading(true);
      let { data } = await getInformationApi();
      let {
        status,
        message,
        data: { delivery },
      } = data;
      if (status) {
        setShop(delivery);
      } else {
        toast.error(message);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("مشکلی در دریافت اطلاعات به وجود آمد");
    }
  };

  const handleEditInformation = () => navigate("/my-shop/information/edit");

  const handleWorkChange = (event, newValue) => {
    setWorkTime(newValue);
  };

  const marks = [
    {
      value: 0,
      label: "00",
    },
    {
      value: 6,
      label: "06:00",
    },
    {
      value: 12,
      label: "12:00",
    },
    {
      value: 18,
      label: "18:00",
    },
    {
      value: 24,
      label: "24",
    },
  ];

  return (
    <Grid container>
      <MyShopNavigation selected={MyShopNavigationList["information"].path} />

      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography sx={{ fontWeight: "bold" }}>پروفایل فروشگاه شما</Typography>
        <GreyButton sx={{ width: "100px" }} onClick={handleEditInformation}>
          ویرایش اطلاعات
        </GreyButton>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ maxWidth: "md" }}>
          <CardHeader
            avatar={
              loading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <Avatar sx={{ bgcolor: colors.red[500] }} aria-label="recipe">
                  R
                </Avatar>
              )
            }
            action={
              <IconButton aria-label="settings">
                {/* <MoreVertIcon /> */}
              </IconButton>
            }
            title={
              loading ? (
                <Skeleton sx={{ width: "40%" }} variant="text" />
              ) : (
                shop.name
              )
            }
            subheader={
              loading ? (
                <Skeleton sx={{ width: "50%" }} variant="text" />
              ) : (
                shop.description
              )
            }
          />
          <CardContent>
            <Grid container>
              <Grid item xs={4} sm={3} lg={2} xl={1}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: { xs: "1rem" } }}
                >
                  آدرس فروشگاه :
                </Typography>
              </Grid>
              <Grid item xs={8} sm={9} lg={2} xl={11}>
                <Typography sx={{ fontSize: { xs: "0.9rem" } }}>
                  {loading ? (
                    <Skeleton
                      sx={{ width: "100%" }}
                      variant="rectangular"
                      height={50}
                    />
                  ) : (
                    shop.description
                  )}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={4} sm={3} lg={2} xl={1}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: { xs: "1rem" } }}
                >
                  زمان تحویل :
                </Typography>
              </Grid>
              <Grid item xs={8} sm={9} lg={2} xl={11}>
                <Typography sx={{ fontSize: { xs: "0.9rem" } }}>
                  {loading ? (
                    <Skeleton sx={{ width: "100%" }} variant="text" />
                  ) : (
                    shop.deliveryTime + ` دقیقه `
                  )}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={4} sm={3} lg={2} xl={1}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: { xs: "1rem" } }}
                >
                  ساعت کاری :
                </Typography>
              </Grid>
              <Grid item xs={8} sm={9} lg={2} xl={11}>
                <Typography sx={{ fontSize: { xs: "0.9rem" } }}>
                  {loading ? (
                    <Skeleton sx={{ width: "100%" }} variant="text" />
                  ) : (
                    <Slider
                      disabled
                      getAriaLabel={() => "WorkTime"}
                      aria-label="WorkTime"
                      valueLabelDisplay="auto"
                      step={1}
                      marks={marks}
                      min={0}
                      max={24}
                      value={workTime}
                      onChange={handleWorkChange}
                      getAriaValueText={valuetext}
                      components={{
                        ValueLabel: ValueLabelComponent,
                      }}
                    />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {loading && (
          <Grid
            container
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{ my: 5 }}
          >
            <CircularProgress size={25} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={` ${value}:00 `}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

export default ShopInformation;
