import React, { useState, useEffect } from "react";
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
  Button,
  colors,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { common } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { saveAddressApi, editAddressApi } from "../../api/Address";
import toast from "react-hot-toast";
import { detalBaseLinearGradient } from "./../../configs/variables";
import { useSelectedAddress, useAllAddress } from "../../hooks/useAddress";

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

function AddressFormModal({ open, setOpen, editAddress, setEditAddress }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useSelectedAddress();
  const [, setAllAddress] = useAllAddress();
  const [loading, setLoading] = useState(false);
  const [selectedCityUnits, setSelectedCityUnits] = useState([]);
  const [formStatus, setFormStatus] = useState(true);

  useEffect(() => {
    if (editAddress !== null) {
      // console.log("name", editAddress);
      setValue("name", editAddress.name);
      setValue("city", editAddress.city);
      setValue("unit", editAddress.unit);
      setValue("address", editAddress.address);
    } else {
      // console.log("name else", editAddress);
      setValue("name", "");
      setValue("city", "");
      setValue("unit", "");
      setValue("address", "");
    }
    setFormStatus(editAddress === null);
    setSelectedCityUnits(getDefaultSelectedCityUnits());
  }, [editAddress]);

  const getDefaultSelectedCityUnits = () => {
    if (editAddress !== null) {
      console.log(cities);
      let selectedCity = cities.filter((c) => c.name === editAddress.city);
      console.log(selectedCity[0].units);
      return selectedCity.length === 0 ? [] : selectedCity[0].units;
    } else {
      console.log("null");
      return [];
    }
  };

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
      /*
      send data for save to database
      */

      if (formStatus) {
        let res = await saveAddressApi(formData);
        const { status, address, message } = res.data;
        let first_address = false;
        if (status) {
          setAllAddress((prevAddresses) => {
            if (selectedAddress === null) {
              first_address = true;
              setSelectedAddress({ ...address });
            }
            return [...prevAddresses, { ...address }];
          });
        } else {
          toast.error(message);
        }
        setLoading(false);
        setOpen(false);
        if (first_address) {
          navigate("/");
        }
      } else {
        let res = await editAddressApi(editAddress.id, formData);
        const { status, message } = res.data;
        let first_address = false;
        if (status) {
          setAllAddress((prevAddresses) => {
            if (selectedAddress !== null) {
              setSelectedAddress((prevSelectedAddress)=>{
                if(prevSelectedAddress.id === editAddress.id){
                  return { ...formData, id: editAddress.id }
                }else{
                  return {...prevSelectedAddress}
                }
              });
            }
            let newAddresses = prevAddresses.map((prevAddress) => {
              if (prevAddress.id === editAddress.id) {
                return { ...formData, id: editAddress.id };
              } else {
                return { ...prevAddress };
              }
            });
            return newAddresses;
          });
        } else {
          toast.error(message);
        }
        setLoading(false);
        setOpen(false);
        if (first_address) {
          navigate("/");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setEditAddress(null);
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
          backgroundImage: detalBaseLinearGradient,
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
            item
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
                <Grid item xs={12} sm={6} md={9} lg={8}>
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
                    // defaultValue={editAddress !== null ? editAddress.name : ""}
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
                      })}
                      onChange={(e) => handleChangeCityInput(e)}
                      error={errors.city ? true : false}
                      helperText={errors.city?.message}
                      defaultChecked={editAddress?.city}
                      defaultValue={editAddress?.city}
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
                      defaultChecked={editAddress?.unit}
                      defaultValue={editAddress?.unit}
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
                    // defaultValue={editAddress?.address}
                  />
                </Grid>
                <Grid container xs={12} sm={6} md={9} lg={8}>
                  <Button
                    sx={{
                      color: colors.common.white,
                      backgroundColor: formStatus
                        ? colors.orange[500]
                        : colors.blue[500],
                      "&:hover": {
                        backgroundColor: formStatus
                          ? colors.orange[700]
                          : colors.blue[700],
                      },
                      width: "100%",
                      height: "50px",
                      mt: 4,
                    }}
                    disabled={loading}
                    type="submit"
                    variant="contained"
                  >
                    {formStatus ? "ثبت آدرس جدید" : "ویرایش آدرس"}
                  </Button>
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
