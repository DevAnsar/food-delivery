import * as React from "react";
import {
  Dialog,
  Grid,
  Container,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { common } from "@mui/material/colors";
import { OrangeButton } from "../buttons";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { saveAddressApi } from "../../api/Address";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cities = [
  {
    id: 1,
    name: "urmia",
    title: "ارومیه",
    units: [
      { id: 2, name: "molavi", title: "مولوی" },
      { id: 3, name: "meysan", title: "میثم" },
    ],
  },
  {
    id: 4,
    name: "tabriz",
    title: "تبریز",
    units: [
      { id: 5, name: "abbasi", title: "محله عباسی" },
      { id: 5, name: "zaferanie", title: "زعفرانیه" },
    ],
  },
];
function AddressFormModal({ open, setOpen, address }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [, setLocalStorageAddress] = useLocalStorage("user-address", null);

  const [loading, setLoading] = React.useState(false);
  const [selectedCityUnits, setSelectedCityUnits] = React.useState([]);

  const handleChangeCityInput = (e) => {
    // e.preventDefault();
    // console.log(e);
    let { value } = e.target;
    let units = cities.filter((city) => city.name === value)[0].units;
    setSelectedCityUnits(units);
  };
  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      // console.log(data);
      /*
      send data for save to database
      */
      const res = await saveAddressApi(formData);
      const { data } = res;
      console.log(data);
      setLocalStorageAddress("user-address", data);

      setLoading(false);
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          borderBottom: 1,
          borderColor: "divider",
          backgroundImage: "linear-gradient(120deg, #FAD961 0%, #F76B1C 57%)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ color: common.white, fontSize: { xs: "0.9rem" } }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{
              pr: 4,
              flex: 1,
              color: common.white,
              fontSize: { xs: "0.8rem" },
              textAlign: "center",
            }}
            variant="h6"
            component="div"
          >
            آدرس جدید
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          height: "100vh",
        }}
        maxWidth="lg"
      >
        <Grid
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            xs={12}
            md={6}
            lg={6}
            sx={{ pt: 3 }}
            display="flex"
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Typography
                sx={{ mt: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                لطفا اطلاعات آدرس خود را به صورت دقیق وارد نمایید. ورود صحیح
                اطلاعات جهت نمایش خدمات قابل ارائه و تحویل سفارشات به شما مورد
                نیاز است.{" "}
              </Typography>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid xs={12} sm={6} md={9} lg={8}>
                  <TextField
                    sx={{ mt: 3 }}
                    id="outlined-basic"
                    label="نام مستعار آدرس"
                    variant="outlined"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "ورود نام مستعار آدرس الزامی هست",
                      },
                      minLength: {
                        value: 2,
                        message: "نام مستعار باید بیشتر از 2 کاراکتر باشد",
                      },
                    })}
                    fullWidth
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                  />

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="demo-simple-select-label">شهر</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="شهر"
                      {...register("city", {
                        required: {
                          value: true,
                          message: "انتخاب شهر الزامی هست",
                        },
                        onChange: (e) => handleChangeCityInput(e),
                      })}
                      error={errors.city ? true : false}
                      helperText={errors.city?.message}
                    >
                      {cities.map((city, index) => (
                        <MenuItem
                          key={`cities-${index + Date.now() + Math.random()}`}
                          value={city.name}
                        >
                          {city.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="demo-simple-select-label">محله</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="محله"
                      {...register("unit", {
                        required: {
                          value: true,
                          message: "انتخاب محله الزامی هست",
                        },
                      })}
                      error={errors.unit ? true : false}
                      helperText={errors.unit?.message}
                    >
                      {selectedCityUnits.map((unit, index) => (
                        <MenuItem
                          key={`unit-${index + Date.now() + Math.random()}`}
                          value={unit.name}
                        >
                          {unit.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    sx={{ mt: 2 }}
                    id="outlined-multiline-static"
                    label="آدرس"
                    multiline
                    rows={2}
                    {...register("address", {
                      required: {
                        value: true,
                        message: "آدرس دقیق خود را وارد کنید",
                      },
                      minLength: {
                        value: 10,
                        message: "آدرس شما حتما باید بیشتر از 10 کاراکتر باشد",
                      },
                    })}
                    fullWidth
                    error={errors.address ? true : false}
                    helperText={errors.address?.message}
                  />
                </Grid>
                <Grid container xs={12} sm={6} md={9} lg={8}>
                  <OrangeButton
                    sx={{ mt: 4 }}
                    disabled={loading}
                    type="submit"
                    variant="contained"
                  >
                    ثبت آدرس جدید
                  </OrangeButton>
                </Grid>
                {loading && <CircularProgress sx={{ mt: 3 }} size="1.5rem" />}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}
export default AddressFormModal;
