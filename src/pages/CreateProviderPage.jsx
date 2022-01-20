import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShowTheme } from "../hooks/useShowTheme";
import {
  Container,
  Grid,
  Typography,
  Link as LinkComponent,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  colors,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createProviderApi } from "./../api/Shop";
import { orange, common, grey } from "@mui/material/colors";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useAddress } from "./../hooks/useAddress";
import { detalBaseLinearGradient } from "../configs/variables";
import { OrangeButton } from "../components/buttons";

function CreateProviderPage() {
  const { cities } = useAddress();
  const [selectedCityAreas, setSelectedCityAreas] = useState([]);
  const {
    user: { loggedIn, provider },
    setProvider,
  } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  // const { setShowTheme } = useShowTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setShowTheme(false);
    if(provider !== null ){
      navigate("/")
    }
    // return ()=>setShowTheme(true);
  }, []);

  const handleChangeCityInput = (e) => {
    let { value } = e.target;
    let areas = cities.filter((city) => city.id === value)[0].areas;
    setSelectedCityAreas(areas);
  };

  const handleSendForm = async (formData) => {
    try {
      setLoading(true);

        let {data} = await createProviderApi(formData);
        const { status, message ,data : {provider} } = data;
        if (status) {
          setProvider(provider);
          navigate("/my-shop");
        } else {
          toast.error(message);
        }
        setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
            height: "10vh",
            backgroundImage: detalBaseLinearGradient,
          }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Container maxWidth="lg">
            <Typography
              display="flex"
              justifyContent="center"
              sx={{ color: colors.common.white, fontSize: "0.8rem", mt: 1 }}
            >
              ثبت نام فروشگاه
            </Typography>
          </Container>
        </Grid>
      </Grid>

      <Container
        sx={{
          height: "90vh",
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
          <form onSubmit={handleSubmit(handleSendForm)}>
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
              <Grid item xs={12} sm={6} md={9} lg={8}>
                <TextField
                  sx={{ mt: 3 }}
                  id="outlined-basic"
                  label="نام فروشگاه "
                  variant="outlined"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "ورود نام فروشگاه الزامی هست",
                    },
                    minLength: {
                      value: 2,
                      message: "نام فروشگاه باید بیشتر از 2 کاراکتر باشد",
                    },
                  })}
                  fullWidth
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                />

                <TextField
                  multiline
                  rows={2}
                  sx={{ mt: 3 }}
                  id="outlined-basic"
                  label="توضیحات فروشگاه "
                  variant="outlined"
                  {...register("description", {
                    required: false,
                  })}
                  fullWidth
                  error={errors.description ? true : false}
                  helperText={errors.description?.message}
                />

                <TextField
                  sx={{ mt: 3 }}
                  id="outlined-basic"
                  label="زمان تحویل سفارش برحسب دقیقه"
                  variant="outlined"
                  {...register("deliveryTime", {
                    required: {
                      value: true,
                      message: "ورود زمان تحویل سفارش الزامی هست",
                    },
                  })}
                  fullWidth
                  error={errors.deliveryTime ? true : false}
                  helperText={errors.deliveryTime?.message}
                />

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="demo-simple-select-label">شهر</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="شهر"
                    {...register("cityId", {
                      required: {
                        value: true,
                        message: "انتخاب شهر الزامی هست",
                      },
                    })}
                    onChange={(e) => handleChangeCityInput(e)}
                    error={errors.cityId ? true : false}
                    helperText={errors.cityId?.message}
                  >
                    {cities.map((city, index) => (
                      <MenuItem
                        key={`cities-${index + Date.now() + Math.random()}`}
                        value={city.id}
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
                    {...register("areaId", {
                      required: {
                        value: true,
                        message: "انتخاب محله الزامی هست",
                      },
                    })}
                    error={errors.areaId ? true : false}
                    helperText={errors.areaId?.message}
                  >
                    {selectedCityAreas.map((unit, index) => (
                      <MenuItem
                        key={`unit-${index + Date.now() + Math.random()}`}
                        value={unit.id}
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
                  // defaultValue={editAddress?.address}
                />
              </Grid>

              <Grid
                container
                xs={12}
                sm={6}
                md={9}
                lg={6}
                sx={{ mt: 2, mb: 4 }}
              >
                <OrangeButton
                  disabled={loading}
                  variant="contained"
                  type="submit"
                >
                  ارسال کد تایید
                </OrangeButton>
              </Grid>
              {loading && <CircularProgress sx={{ mt: 3 }} size="1.5rem" />}
            </Grid>
          </form>
        </Grid>
      </Container>
    </Grid>
  );
}

export default CreateProviderPage;
