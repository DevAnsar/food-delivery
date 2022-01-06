import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  Grid,
  Typography,
  colors,
  IconButton,
  Divider,
  Button,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useSideMenu } from "./../../hooks/useSideMenu";
import { useAuth } from "./../../hooks/useAuth";
import toast from "react-hot-toast";
import CallCenter from "./../../images/CallCenter.png";

function SideMenu() {
  const {
    user: { name },
  } = useAuth();
  const navigate = useNavigate();
  const { showMenu, setShowMenu } = useSideMenu();
  const handleClose = () => setShowMenu(false);
  const handleIncreaseWallet = () => {
    toast("بخش افزایش موجودی در حال توسعه میباشد");
  };
  const handleGotToTermOfUse = () => {
    setShowMenu(false);
    navigate("/term-of-use");
  };
  return (
    <Drawer anchor={"left"} open={showMenu} onClose={handleClose}>
      <Grid container sx={{ width: {xs:"70vw" , sm:"40vw" ,md:"30vw" ,lg:"30vw",xl:"20vw"}, height: "100vh", p: 2 }}>
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Grid container>
            <Grid xs={12}>
              <Grid
                xs={12}
                sx={{ pb: 2 }}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <IconButton onClick={handleClose}>
                  <CloseIcon
                    sx={{
                      color: colors.grey[700],
                      fontSize: { xs: "1.5rem" },
                    }}
                  />
                </IconButton>
                <Typography
                  sx={{
                    ml: 2,
                    color: colors.grey[700],
                    fontSize: { xs: "0.9rem" },
                  }}
                >
                  {name !== null ? name : "کاربر جدید"}
                </Typography>
              </Grid>
              <Divider />
            </Grid>

            <Grid xs={12}>
              <Grid
                xs={12}
                sx={{ py: 2 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography
                  sx={{
                    color: colors.grey[700],
                    fontSize: { xs: "0.75rem" },
                  }}
                >
                  امتیاز قابل استفاده در حساب
                </Typography>

                <Typography
                  sx={{
                    color: colors.grey[700],
                    fontSize: { xs: "0.7rem" },
                    fontWeight: "bold",
                  }}
                >
                  صفر
                </Typography>

                <Button
                  onClick={handleIncreaseWallet}
                  fullWidth
                  sx={{
                    mt: 2,
                    color: colors.grey[700],
                    backgroundColor: colors.common.white,
                    "&:hover": {
                      backgroundColor: colors.grey[100],
                    },
                    height: "45px",
                    border: `1px solid ${colors.blue[600]}`,
                    fontSize: { xs: "0.8rem" },
                  }}
                >
                  افزایش موجودی
                </Button>
              </Grid>
              <Divider />
            </Grid>

            <Grid xs={12}>
              <Grid
                xs={12}
                sx={{ py: 2 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Button
                  onClick={handleGotToTermOfUse}
                  fullWidth
                  sx={{
                    color: colors.grey[700],
                    backgroundColor: colors.common.white,
                    "&:hover": {
                      backgroundColor: colors.grey[100],
                    },
                    height: "45px",
                    border: `1px solid ${colors.green.A700}`,
                    fontSize: { xs: "0.8rem" },
                  }}
                >
                  قوانین و مقررات
                </Button>

                <Button
                  fullWidth
                  sx={{
                    mt: 2,
                    color: colors.grey[700],
                    backgroundColor: colors.common.white,
                    "&:hover": {
                      backgroundColor: colors.grey[100],
                    },
                    height: "45px",
                    border: `1px solid ${colors.grey[400]}`,
                    fontSize: { xs: "0.8rem" },
                  }}
                >
                  اشتراک با دوستان
                </Button>
              </Grid>
              <Divider />
            </Grid>

            <Grid xs={12}>
              <Grid
                xs={12}
                sx={{ py: 2 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  fullWidth
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <img style={{ width: "50%" }} src={CallCenter} />
                </Box>
                <Typography
                  sx={{
                    color: colors.grey[700],
                    fontSize: { xs: "0.75rem" },
                  }}
                >
                  جهت دریافت پشتیبانی می توانید از ساعت 8 صبح الی 23 شب با شماره
                  مرکز تماس دتال ، تماس حاصل نمایید{" "}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    color: colors.grey[900],
                    fontSize: { xs: "1.3rem" },
                    fontWeight: "bold",
                  }}
                >
                  044-3130
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      >
        <Typography
          sx={{
            color: colors.grey[700],
            fontSize: { xs: "0.75rem" },
          }}
        >
          2.5.2
        </Typography>
      </Grid>
    </Drawer>
  );
}
export default SideMenu;
