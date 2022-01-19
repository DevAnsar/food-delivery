import React from "react";
import { Grid, Stack } from "@mui/material";
import MyShopNav from "./Nav";
const MyShopNavigationList = {
  menus: {
    title: "منوها",
    path: "/my-shop/menus",
  },
  information: {
    title: "پروفایل",
    path: "/my-shop/information",
  },
};
function MyShopNavigation({ selected }) {
  return (
    <Grid
      item
      xs={12}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      sx={{ mt: 1, mb: 1 }}
    >
      <Stack direction="row" sx={{ pb: 1, overflowX: "auto" }} spacing={1}>
        {Object.keys(MyShopNavigationList).map(function (key, index) {
            return(
                <MyShopNav key={index} to={MyShopNavigationList[key].path} title={MyShopNavigationList[key].title} active={selected} />
            )
        })}
      </Stack>
    </Grid>
  );
}
export { MyShopNavigationList };
export default MyShopNavigation;
