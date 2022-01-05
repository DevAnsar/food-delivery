import * as React from "react";
import {
  Dialog,
  Grid,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Divider,
  colors,
} from "@mui/material";
import { Close as CloseIcon , ArrowBack } from "@mui/icons-material";
import { common } from "@mui/material/colors";
import toast from "react-hot-toast";
import { detalBaseLinearGradient } from "../../configs/variables";
import {
  useActionShoppingBasket,
  useShoppingBasket,
} from "./../../hooks/useShoppingBasket";
import CenterProduct from "./CenterProduct";
import { BrownButton } from "./../buttons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function ShoppingBasket() {
  const { isShow, setIsShow, getTotalAmount } = useActionShoppingBasket();
  const basket = useShoppingBasket();
  // console.log('basket',basket);
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    if (!loading) {
      setIsShow(false);
    }
  };

  return (
    <Dialog
      fullScreen
      open={isShow()}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          borderBottom: 1,
          borderColor: "divider",
          backgroundImage: detalBaseLinearGradient,
        }}
      >
        <Toolbar>
          <Container maxWidth="md">
            <Grid container >
            <Grid display='flex'  alignItems='center' xs={2}>
              <Typography
                sx={{
                  color: common.white,
                  fontSize: { xs: "0.8rem" },
                }}
                variant="h6"
                component="div"
              >
                توضیحات
              </Typography>
            </Grid>
            <Grid display='flex' flexDirection='column'  justifyContent='center' alignItems='center' xs={8}>
              <Typography
                sx={{
                  color: common.white,
                  fontSize: { xs: "0.8rem" }
                }}
                variant="h6"
                component="div"
              >
                سبد خرید
              </Typography>
            </Grid>
            <Grid display='flex' flexDirection='row-reverse'  xs={2}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                sx={{ color: common.white, fontSize: { xs: "0.9rem" } }}
              >
                <ArrowBack />
              </IconButton>
            </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          height: "100vh",
        }}
        maxWidth="md"
      >
        <Grid
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            xs={12}
            sx={{ pt: 3 }}
            display="flex"
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            {basket?.map((product, productIndex) => (
              <React.Fragment key={`key-${productIndex}`}>
                <CenterProduct product={product} />
                <Divider />
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Container>

      <AppBar
        sx={{
          position: "relative",
          borderBottom: 1,
          borderColor: "divider",
          backgroundImage: detalBaseLinearGradient,
        }}
      >
        <Toolbar>
          <Container maxWidth="md">
            <Grid
              display="flex"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{
                  color: colors.common.white,
                  fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                }}
              >
                جمع کل: {getTotalAmount()} تومان
              </Typography>
              <BrownButton>
                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                  }}
                >
                  تکمیل خرید
                </Typography>
              </BrownButton>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}
export default ShoppingBasket;
