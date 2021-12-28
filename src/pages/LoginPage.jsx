import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShowTheme } from "./../hooks/useShowTheme";
import {
  Container,
  Grid,
  Box,
  Typography,
  Link as LinkComponent,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { orange, common } from "@mui/material/colors";

import { PhoneCustomInput } from "./../components/auth";

function LoginPage() {
  const { setShowTheme } = useShowTheme();
  const [phoneNumber, setPhoneNumber] = useState("09");
  useEffect(() => {
    setShowTheme(false);
    return () => setShowTheme(true);
  }, []);

  const handleSendCode =()=>{
    // console.log(phoneNumber)
    let phone=phoneNumber.split("").filter(n => n!== " ").join("");
    console.log(phone)
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid container spacing={0}>
        <Grid
          xs={12}
          sx={{
            height: "40vh",
            backgroundImage: "linear-gradient(120deg, #FAD961 0%, #F76B1C 57%)",
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                backgroundColor: "primary",
                "&:hover": {
                  backgroundColor: "primary",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            />
          </Container>
        </Grid>
      </Grid>

      <Container
        sx={{
          height: "60vh",
        }}
        maxWidth="lg"
      >
        <Grid
          sx={{
            height: "100%",
            pb: 10,
          }}
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            xs={12}
            md={6}
            lg={6}
            sx={{ direction: "ltr", pt: 3 }}
          >
            {/* {phoneNumber
              .split("")
              .filter((n) => n !== " ")
              .join("")} */}
            <Grid container xs={12} sm={7} md={6} lg={5}>
              <PhoneCustomInput seter={(number) => setPhoneNumber(number)} />
            </Grid>
            <Typography sx={{ mt: 2,fontSize:{xs:'0.9rem',sm:"1rem"} }}>
              برای ورود یا ثبت نام در سایت شماره موبایل خود را در بخش بالا وارد
              نمایید و سپس دکمه ی ارسال کد را بزنید
            </Typography>

            <Typography sx={{ mt: 5,fontSize:{xs:'0.8rem',sm:"1rem"} }}>
              با ثبت نام و ورود به سایت شما قوانین استفاده ازآن را قبول میکنید
            </Typography>

            <Typography sx={{ my: 2,fontSize:{xs:'0.8rem',sm:"0.9rem"} }}>
              <Link to="/terms-of-use">
                <LinkComponent>مشاهده قوانین استفاده از دتال</LinkComponent>
              </Link>
            </Typography>
            <Grid container xs={12} sm={6} md={4} lg={3}>
              <DetalButton onClick={handleSendCode} variant="contained">ارسال کد تایید</DetalButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

const DetalButton = styled(Button)(({ theme }) => ({
  color: common.white,
  backgroundColor: orange[500],
  "&:hover": {
    backgroundColor: orange[700],
  },
  width: "100%",
  height: "50px",
}));

export default LoginPage;
