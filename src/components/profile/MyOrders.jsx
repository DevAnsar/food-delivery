import React, { useEffect, useState } from "react";
import { Grid, colors, Divider } from "@mui/material";
import { getMyOrderApi } from "../../api";
import EmpityOrderList from './../orders/EmpityOrderList'
import toast from "react-hot-toast";


function MyOrders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("render my orders");
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await getMyOrderApi();
      const { status, message, myOrders } = data;
      // console.log(data);
      if (status) {
        setOrders(myOrders);
      } else {
        // console.log(message);
        toast.error(message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setOrders([]);//for test
      console.log(error);
    }
  };

  return (
    <Grid container>
      <Grid xs={12}>
        {orders?.length === 0 && <EmpityOrderList />}
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
  );
}
export default MyOrders;
