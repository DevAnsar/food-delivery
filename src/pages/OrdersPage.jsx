import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Paper,
  Divider,
  Typography,
  colors,
} from "@mui/material";
import { getMyOrderApi } from "../api";

import toast from "react-hot-toast";
import EmpityOrderList from "../components/orders/EmpityOrderList";
import {detalBaseLinearGradient} from './../configs/variables'

function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handlegetMyOrders();
  }, []);

  const handlegetMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await getMyOrderApi();
      const { status, message, myOrders } = data;
      // console.log(data);
      if (status) {
        setOrders([...orders, ...myOrders]);
      } else {
        // console.log(message);
        toast.error(message);
      }
      setLoading(false);
    } catch (error) {
      setOrders([]);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Box
        sx={{
          backgroundImage: detalBaseLinearGradient,
        }}
      >
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
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.9rem",
                    md: "0.95rem",
                    lg: "1rem",
                  },
                  color:colors.common.white
                }}
              >
                سفارشات من
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container sx={{ pt: 1, pb: 1 }}>
          <Grid xs={12}>
            {
              orders?.length === 0 && (
                <EmpityOrderList />
              )
            }
            {orders?.map((order, index) => {
              return (
                <React.Fragment key={`provider-${index}`}>
                  {/* order component */}
                  <Divider />
                </React.Fragment>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default OrdersPage;
