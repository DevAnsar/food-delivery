import { useEffect, useState } from "react";
import { Grid, Container, Typography, Divider ,CircularProgress, colors } from "@mui/material";
import { AddressFormModal } from "../components/address";
import { OrangeButton } from "../components/buttons";
import { getMyAllAddressApi } from "../api/Address";
import AddressRow from "../components/address/AddressRow";
import { Box } from "@mui/system";

function AddressesPage() {
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAllAddresses();
  }, []);

  const getUserAllAddresses = async () => {
    try {
      setLoading(true);
      const res = await getMyAllAddressApi();
      const { data } = res;
      console.log(data);
      setLoading(false);
      setAddresses(data);
    } catch (error) {}
  };

  return (
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
          md={8}
          lg={6}
          sx={{ pt: 3 }}
          display="flex"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid xs={12} sm={6} md={9} lg={8}>
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
                    {...address}
                  />
                ))}

                {loading && (
                  <Typography
                    sx={{
                      mt: { xs: 10 }
                    }}
                    textAlign="center"
                  >
                    <CircularProgress sx={{ color:colors.red[500] }} size="2rem" />
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
              <OrangeButton
                type="submit"
                variant="contained"
                onClick={() => setAddressModalOpen(true)}
              >
                افزودن آدرس جدید
              </OrangeButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AddressFormModal
        address={null}
        open={addressModalOpen}
        setOpen={setAddressModalOpen}
      />
    </Container>
  );
}
export default AddressesPage;
