import { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Divider,
  CircularProgress,
  colors,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { AddressFormModal } from "../components/address";
import { deleteAddressApi } from "../api/Address";
import AddressRow from "../components/address/AddressRow";
import toast from "react-hot-toast";
import { useAllAddress, useSelectedAddress } from "./../hooks/useAddress";
import GreyButton from "./../components/buttons/GreyButton";

function AddressesPage() {
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useAllAddress();
  const [mainAddress, setMainAddress] = useSelectedAddress();
  const [checkedAddressId, setCheckedAddressId] = useState(
    mainAddress !== null ? mainAddress.id : 0
  );
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState(0);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    // getUserAllAddresses();
  }, []);

  const handleSelectAddress = (e) => {
    let newSelectedAddressId = Number(e.target.name);
    setCheckedAddressId(newSelectedAddressId);
  };
  const handleClickActionBtn = () => {
    if (getFormStatus()) {
      setEditingAddress(null);
      setAddressModalOpen(true);
    } else {
      let address = addresses.filter((a) => a.id === checkedAddressId);
      if (address.length > 0) {
        let seledtedNewAddress = address[0];
        // console.log(seledtedNewAddress);
        setMainAddress(seledtedNewAddress);
      }
    }
  };

  // true => add new address  | false => change main address
  const getFormStatus = () => {
    if (mainAddress === null) {
      return !!!checkedAddressId;
    } else {
      return checkedAddressId === mainAddress.id;
    }
  };
  const handleDeleteAlertShow = (addressId) => {
    // console.log(addressId);
    setDeleteAddressId(addressId);
    setShowDeleteModal(true);
  };
  const handleDeleteAlertClose = () => {
    setDeleteAddressId(0);
    setShowDeleteModal(false);
  };
  const handleDeleteAddress = async () => {
    try {
      let res = await deleteAddressApi(deleteAddressId);
      // console.log(res);
      if (res.status) {
        setAddresses((prevAddresses) => {
          let newAddresses = prevAddresses.filter(
            (address) => address.id !== deleteAddressId
          );
          return [...newAddresses];
        });
        if (mainAddress !== null) {
          if (deleteAddressId === mainAddress.id) {
            setCheckedAddressId(0);
            setMainAddress(null);
          }
        }
        if (deleteAddressId === checkedAddressId) {
          setCheckedAddressId(0);
        }

        handleDeleteAlertClose();
      } else {
        toast.error("متاسفانه مشکلی پیش اومد");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (address_id) => {
    let address = addresses.filter((a) => a.id === address_id);
    if (address.length > 0) {
      setEditingAddress(address[0]);
      setAddressModalOpen(true);
    }
  };
  return (
    <Container
      sx={{
        height: "100vh",
      }}
      maxWidth="lg"
      style={{width:'100%'}}
    >
      <Grid
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          sx={{ pt: 3 }}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid
            container
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={9} lg={8}>
              <Typography
                sx={{
                  mt: { xs: 7, md: 7 },
                  fontSize: { xs: "0.9rem", sm: "1rem", fontWeight: "bold" },
                }}
                textAlign="center"
              >
                آدرس های من
              </Typography>
              <Typography
                sx={{ my: 1, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                textAlign="center"
              >
                برای مشاهده ی خدمات قابل ارائه به شما، لطفا آدرس تحویل سفارش را
                انتخاب کنید
              </Typography>
              <Divider />

              <Box
                sx={{
                  mb: { xs: 10 },
                }}
              >
                {addresses.map((address, index) => (
                  <AddressRow
                    key={`address-${index + Math.random()}`}
                    checked={checkedAddressId === address.id}
                    handleSelectAddress={handleSelectAddress}
                    handleDelete={handleDeleteAlertShow}
                    handleEdit={handleEdit}
                    {...address}
                  />
                ))}

                {loading && (
                  <Typography
                    sx={{
                      mt: { xs: 10 },
                    }}
                    textAlign="center"
                  >
                    <CircularProgress
                      sx={{ color: colors.red[500] }}
                      size="2rem"
                    />
                  </Typography>
                )}
                {!loading && addresses.length === 0 && (
                  <Typography
                    sx={{
                      mt: { xs: 10 },
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                      },
                    }}
                    textAlign="center"
                  >
                    آدرسی در حساب کاربری شما تعریف نشده است. لطفا با انتخاب دکمه
                    زیر آدرس جدید اضافه کنید
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid container xs={12} sm={6} md={7} lg={8}>
              <Button
                sx={{
                  color: colors.common.white,
                  backgroundColor: getFormStatus()
                    ? colors.orange[500]
                    : colors.blue[500],
                  "&:hover": {
                    backgroundColor: getFormStatus()
                      ? colors.orange[700]
                      : colors.blue[700],
                  },
                  width: "100%",
                  height: "50px",
                }}
                variant="contained"
                onClick={handleClickActionBtn}
              >
                {getFormStatus()
                  ? "افزودن آدرس جدید"
                  : "انتخاب این آدرس برای ثبت سفارش"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        maxWidth="lg"
        open={showDeleteModal}
        onClose={handleDeleteAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          display="flex"
          flexDirection="row"
          justifyContent="center"
          id="alert-dialog-description"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem", lg: "1.1rem" } }}
          id="alert-dialog-title2"
        >
          توجه
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display="flex"
            flexDirection="row"
            justifyContent="center"
            id="alert-dialog-description"
            sx={{ fontSize: { xs: "0.8rem", md: "0.9rem", lg: "1rem" } }}
          >
            آیا مایل به حذف این آدرس میباشید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions
          display="flex"
          flexDirection="row"
          justifyContent="center"
          id="alert-dialog-description"
          sx={{ fontSize: { xs: "0.8rem", md: "0.9rem", lg: "1rem" } }}
        >
          <GreyButton onClick={handleDeleteAlertClose}>خیر</GreyButton>
          <GreyButton onClick={handleDeleteAddress} autoFocus>
            بله
          </GreyButton>
        </DialogActions>
      </Dialog>
      <AddressFormModal
        editAddress={editingAddress}
        setEditAddress={setEditingAddress}
        open={addressModalOpen}
        setOpen={setAddressModalOpen}
      />
    </Container>
  );
}
export default AddressesPage;
