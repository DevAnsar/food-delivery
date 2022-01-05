import { Grid, Container, Typography, IconButton, colors } from "@mui/material";
import { ArrowBack, AddCircle } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";

function HeaderBox() {
  const {
    user: { name },
  } = useAuth();
  const navigate = useNavigate();
  const handleIncreaseInventory = () => {
    toast("بخش افزایش موجودی فعلا در حال توسعه میباشد");
  };

  const handleToBack = (e) => {
    e.preventDefault();
    navigate.go(-1);
  };

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid
          xs={12}
          sx={{
            pt: { xs: 8, sm: 10, md: 11, lg: 12 },
            pb: { xs: 1, sm: 2, md: 3 },
          }}
          display="flex"
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid xs={2} lg={1}></Grid>
          <Grid
            xs={8}
            lg={9}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              sx={{
                color: colors.common.white,
                fontSize: { xs: "1rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              {name || "کاربر جدید"}
            </Typography>

            <Typography
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              sx={{
                color: colors.common.white,
                fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
              }}
            >
              موجودی حساب شما {0} تومان است
            </Typography>

            <Typography
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              sx={{
                color: colors.common.white,
                fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
              }}
              onClick={handleIncreaseInventory}
            >
              <AddCircle
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                }}
              />
              افزایش موجودی
            </Typography>
          </Grid>
          <Grid xs={2} display="flex" flexDirection="row-reverse">
            <IconButton>
              <ArrowBack
                onClick={handleToBack}
                sx={{
                  color: colors.common.white,
                  fontSize: { xs: "1.5rem", sm: "1.6rem", md: "2rem" },
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
export default HeaderBox;
