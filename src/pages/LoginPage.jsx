import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShowTheme } from "./../hooks/useShowTheme";
import {
  Container,
  Grid,
  Box,
  Typography,
  Link as LinkComponent,
  Button,
  CircularProgress,
  colors,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Call as CallIcon, Chat as ChatIcon, Phone } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { orange, common, grey } from "@mui/material/colors";
import { useAuth } from "./../hooks/useAuth";

import { PhoneCustomInput, LoginCodeCostumInput } from "./../components/auth";
import { phoneRegex, loginCodeRegex } from "../configs/variables";
import { sendPhoneNumberApi, sendLoginCodeApi } from "../api/Login";
import toast from "react-hot-toast";
import DetalLogo from "./../images/detal.png";
import { detalBaseLinearGradient } from "./../configs/variables";

const maxSecoundToResendCode = 25;
function LoginPage() {
  const {
    user: { loggedIn, level, lastSendTime },
    setLevel,
    setLastSendTime,
    setMobile,
    toggleAuth,
  } = useAuth();
  const navigate = useNavigate();

  const { setShowTheme } = useShowTheme();
  const [phoneNumber, setPhoneNumber] = useState("09");
  const [code, setCode] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(maxSecoundToResendCode);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    setShowTheme(false);
    if (loggedIn) {
      navigate("/");
    }
    return () => {
      setShowTheme(true);
      stopTimer();
    };
  }, []);

  useEffect(() => {
    setResendTimer(diffSecound);
    if (level === 2) {
      // console.log("level 2");
      startTimer();
    } else {
      // console.log("level 1");
      stopTimer();
    }
  }, [level, lastSendTime]);

  useEffect(() => {
    if (resendTimer === 0) {
      stopTimer();
    }
  }, [resendTimer]);

  const diffSecound = () => {
    let endDate = lastSendTime + Number(maxSecoundToResendCode * 1000);
    let nowDate = Date.now();
    let diff = Math.floor((endDate - nowDate) / 1000);
    if (diff <= 0) diff = 0;
    return diff;
  };

  const startTimer = () => {
    let timerInit = setInterval(() => {
      let diff = diffSecound();
      setResendTimer(diff);
      if (diff <= 0) {
        console.log("diff:", diff);
        // stopTimer();
      }
    }, 1000);
    setTimerInterval(timerInit);
  };
  const stopTimer = () => {
    return clearInterval(timerInterval);
  };
  const filterPhoneNumber = () =>
    phoneNumber
      .split("")
      .filter((n) => n !== " ")
      .join("");

  const handleChangeMobile = () => {
    setLastSendTime(null);
    setError("");
    setLevel(1);
  };
  const handleResendCode = () => {
    //send code to mobile
    // console.log("send code to mobile");
    setCode(null);
    setError("");
    stopTimer();
    setLastSendTime(Date.now());
    handleSendMobile();
  };

  const handleResendCodeByCall = () => {
    //call to mobile and say code
    setCode(null);
    stopTimer();
    setLastSendTime(Date.now());
  };

  const handleSendMobile = async () => {
    let phone = filterPhoneNumber();
    let validate = phoneRegex(phone);
    if (validate) {
      setError("");
      setLoading(true);
      try {
        const res = await sendPhoneNumberApi(phone);
        const {
          data: { status, message, loginCode, mobile },
        } = res;
        if (status) {
          // console.log(mobile);
          setMobile(mobile);
          toast(loginCode);
          setLastSendTime(Date.now());
          setLevel(2);
        } else {
          toast.error(message);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setError("شماره موبایل تایید شده نمیباشد");
    }
  };

  const handleSendCode = async () => {
    let loginCode = code
      ? code
          .split("-")
          .filter((n) => n !== " ")
          .join("")
      : "";
    // console.log(loginCode);

    let validate = loginCodeRegex(loginCode);
    if (validate) {
      setError("");
      setLoading(true);
      try {
        const res = await sendLoginCodeApi(filterPhoneNumber(), loginCode);
        const { data } = res;
        console.log(data);
        const {
          data: { status, message, user },
        } = res;
        if (status) {
          toggleAuth();
          navigate("/");
        } else {
          // console.log(message);
          toast.error(message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setError("کد را به صورت صحیح وارد کنید");
    }
    // console.log(validate);
  };

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
          item
          xs={12}
          sx={{
            height: "40vh",
            backgroundImage: detalBaseLinearGradient,
          }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Container maxWidth="lg">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "primary",
                "&:hover": {
                  backgroundColor: "primary",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <img style={{ width: "120px" }} src={DetalLogo} />
            </Box>
            <Typography
              display="flex"
              justifyContent="center"
              sx={{ color: colors.common.white, fontSize: "0.8rem", mt: 1 }}
            >
              نسخه ی آزمایشی
            </Typography>
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
          alignItems="flex-start"
        >
          {level === 1 ? (
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              xs={12}
              md={6}
              lg={6}
              sx={{ direction: "ltr", pt: 3 }}
            >
              <Grid container xs={12} sm={6} md={9} lg={6}>
                <PhoneCustomInput
                  error={error}
                  seter={(number) => setPhoneNumber(number)}
                />
              </Grid>
              <Typography sx={{ fontSize: "0.8rem", color: red[600] }}>
                {error && JSON.stringify(error)}
              </Typography>
              <Typography
                sx={{ mt: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                برای ورود یا ثبت نام در سایت شماره موبایل خود را در بخش بالا
                وارد نمایید و سپس دکمه ی ارسال کد را بزنید
              </Typography>

              <Typography
                sx={{ mt: 5, fontSize: { xs: "0.8rem", sm: "1rem" } }}
              >
                با ثبت نام و ورود به سایت شما قوانین استفاده ازآن را قبول میکنید
              </Typography>

              <Typography
                sx={{ my: 2, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
              >
                <Link to="/terms-of-use">
                  <LinkComponent>مشاهده قوانین استفاده از دتال</LinkComponent>
                </Link>
              </Typography>
              <Grid container xs={12} sm={6} md={9} lg={6}>
                <DetalButton
                  disabled={loading}
                  onClick={handleSendMobile}
                  variant="contained"
                >
                  ارسال کد تایید
                </DetalButton>
              </Grid>
              {loading && <CircularProgress sx={{ mt: 3 }} size="1.5rem" />}
            </Grid>
          ) : (
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
              <Grid container xs={12} sm={7} md={9} lg={5}>
                <LoginCodeCostumInput
                  error={error}
                  seter={(number) => setCode(number)}
                />
              </Grid>
              <Typography sx={{ fontSize: "0.8rem", color: red[600] }}>
                {error && JSON.stringify(error)}
              </Typography>
              <Typography
                sx={{ mt: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                برای شما یک پیامک حاوی کد تایید ارسال شده است ، لطفا کد ارسال
                شده را در بخش بالا وارد نمایید.{" "}
                <LinkComponent
                  sx={{ cursor: "pointer" }}
                  onClick={handleChangeMobile}
                >
                  تغییر شماره تلفن
                </LinkComponent>
              </Typography>

              {resendTimer > 0 ? (
                <Typography
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontSize: { xs: "0.8rem", sm: "1rem", fontWeight: "bold" },
                  }}
                >
                  {resendTimer} ثانیه بعد میتوانید مجدد از یکی از روش های زیر
                  برای دریافت کد تایید استفاده کنید
                </Typography>
              ) : (
                <Typography
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontSize: { xs: "0.8rem", sm: "1rem", fontWeight: "bold" },
                  }}
                >
                  کدی دریافت نکرده اید؟ از یکی از روش های زیر برای دریافت مجدد
                  کد تایید استفاده کنید
                </Typography>
              )}

              <Grid container xs={12} sm={6} md={9} lg={6}>
                <ResendButton
                  onClick={handleResendCode}
                  variant="contained"
                  sx={{ mb: 1 }}
                  disabled={resendTimer !== 0}
                >
                  <ChatIcon sx={{ mr: 2 }} />
                  ارسال مجدد کد از طریق پیامک
                </ResendButton>
                <ResendButton
                  onClick={handleResendCodeByCall}
                  variant="contained"
                  sx={{ mb: 2 }}
                  disabled={resendTimer !== 0}
                >
                  <CallIcon sx={{ mr: 2 }} />
                  ارسال مجدد کد از طریق تماس صوتی مکانیزه
                </ResendButton>

                <DetalButton
                  disabled={loading}
                  onClick={handleSendCode}
                  variant="contained"
                >
                  ورود
                </DetalButton>
              </Grid>
              {loading && <CircularProgress sx={{ mt: 3 }} size="1.5rem" />}
            </Grid>
          )}
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

const ResendButton = styled(Button)(({ theme }) => ({
  color: grey[700],
  backgroundColor: grey[200],
  "&:hover": {
    backgroundColor: grey[300],
  },
  width: "100%",
  height: "50px",
}));

export default LoginPage;
