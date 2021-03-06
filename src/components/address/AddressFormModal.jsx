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
import { useSelectedAddress, useAllAddress ,useAddress } from "../../hooks/useAddress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddressFormModal({ open, setOpen, editAddress, setEditAddress }) {
  const {cities} =useAddress();
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
      // console.log("editAddress:", editAddress);
      setValue("name", editAddress.name);
      setValue("cityId", editAddress.cityId);
      setValue("areaId", editAddress.areaId);
      setValue("address", editAddress.address);
    } else {
      // console.log("name else", editAddress);
      setValue("name", "");
      setValue("cityId", "");
      setValue("areaId", "");
      setValue("address", "");
    }
    setFormStatus(editAddress === null);
    setSelectedCityUnits(getDefaultSelectedCityUnits());
  }, [editAddress]);

  const getDefaultSelectedCityUnits = () => {
    if (editAddress !== null) {
      // console.log(cities);
      let selectedCity = cities.filter((c) => c.id === editAddress.cityId);
      console.log(selectedCity[0].areas);
      return selectedCity.length === 0 ? [] : selectedCity[0].areas;
    } else {
      // console.log("null");
      return [];
    }
  };

  const handleChangeCityInput = (e) => {
    // e.preventDefault();
    // console.log(e);
    let { value } = e.target;
    let areas = cities.filter((city) => city.id === value)[0].areas;
    setSelectedCityUnits(areas);
  };
  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      /*
      send data for save to database
      */

      if (formStatus) {
        let res = await saveAddressApi(formData);
        const { status, message ,data : {address} } = res.data;
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
          setOpen(false);
          if (first_address) {
            navigate("/");
          }
        } else {
          toast.error(message);
        }
        setLoading(false);
        

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
            ???????? ????????
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
                ???????? ?????????????? ???????? ?????? ???? ???? ???????? ???????? ???????? ????????????. ???????? ????????
                ?????????????? ?????? ?????????? ?????????? ???????? ?????????? ?? ?????????? ?????????????? ???? ?????? ????????
                ???????? ??????.{" "}
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
                    label="?????? ???????????? ????????"
                    variant="outlined"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "???????? ?????? ???????????? ???????? ???????????? ??????",
                      },
                      minLength: {
                        value: 2,
                        message: "?????? ???????????? ???????? ?????????? ???? 2 ?????????????? ????????",
                      },
                    })}
                    fullWidth
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                    // defaultValue={editAddress !== null ? editAddress.name : ""}
                  />

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="demo-simple-select-label">??????</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="??????"
                      {...register("cityId", {
                        required: {
                          value: true,
                          message: "???????????? ?????? ???????????? ??????",
                        },
                      })}
                      onChange={(e) => handleChangeCityInput(e)}
                      error={errors.cityId ? true : false}
                      helperText={errors.cityId?.message}
                      defaultChecked={editAddress?.cityId}
                      defaultValue={editAddress?.cityId}
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
                    <InputLabel id="demo-simple-select-label">????????</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="????????"
                      {...register("areaId", {
                        required: {
                          value: true,
                          message: "???????????? ???????? ???????????? ??????",
                        },
                      })}
                      error={errors.areaId ? true : false}
                      helperText={errors.areaId?.message}
                      defaultChecked={editAddress?.areaId}
                      defaultValue={editAddress?.areaId}
                    >
                      {selectedCityUnits.map((unit, index) => (
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
                    label="????????"
                    multiline
                    rows={2}
                    {...register("address", {
                      required: {
                        value: true,
                        message: "???????? ???????? ?????? ???? ???????? ????????",
                      },
                      minLength: {
                        value: 10,
                        message: "???????? ?????? ???????? ???????? ?????????? ???? 10 ?????????????? ????????",
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
                    {formStatus ? "?????? ???????? ????????" : "???????????? ????????"}
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
