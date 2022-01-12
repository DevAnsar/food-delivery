import React, { useEffect, useState } from "react";
import { Grid, Typography, colors, Divider, InputBase } from "@mui/material";
import { AlternateEmail, PhoneIphone } from "@mui/icons-material";
import { CustomSwitch, RedButton } from "./../buttons";
import { getAuthUserApi, getAuthUserUpdatApi } from "./../../api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "./../../hooks/useAuth";
const styles = {
  init: {
    color: colors.grey[800],
    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
    py: 1,
  },
  icon: {
    color: colors.grey[500],
    fontSize: { xs: "1rem", sm: "1rem", md: "1rem" },
    mr: 2,
  },
};

function PersonalData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const {
    user: { name, email, mobile, birth, newsletter },
    setPersonalData,
  } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("render : presonal data");
    setValue("name",name);
    setValue("email",email);
    setValue("birth",birth);
    setValue("newsletter",newsletter);

    getAuthUser();
  }, []);

  const getAuthUser = async () => {
    try {
      setLoading(true);
      const { data } = await getAuthUserApi();
      const { status, message, data:{user} } = data;
      // console.log(data);
      if (status) {
        setValue("name",user.name);
        setValue("email",user.email);
        setValue("birth",user.birth);
        setValue("newsletter",user.newsletter);
        
        setPersonalData({
          ...{ name, email, mobile, birth, newsletter },
          user,
        });
      } else {
        // console.log(message);
        toast.error(message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmitPersonalData = async (formData) => {
    try {
      setLoading(true);
      const { data } = await getAuthUserUpdatApi(formData);
      const { status, message, data :{user} } = data;
      if (status) {
        setPersonalData(user);
      } else {
        // console.log(message);
        toast.error(message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Grid container>
      <form onSubmit={handleSubmit(handleSubmitPersonalData)}>
        <Grid xs={12}>
          <Grid display="flex" flexDirection="row" flex="1" sx={{ py: 1 }}>
            <Typography sx={styles.init}>
              لطفا اطلاعات حساب خود را به صورت دقیق وارد کنید تا از رسیدن به
              موقع سفارشات به دستتان مطمئن شوید. همچنین با وارد کردن آدرس ایمیل
              خود میتوانید از آخرین تخفیف های دتال وجشنواره ها از طریق خبرنامه
              هفتگی با خبر شوید.
            </Typography>
          </Grid>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Grid display="flex" flexDirection="row" flex="1">
            <Grid
              display="flex"
              flex="1"
              flexDirecion="row"
              justifyContent="center"
              sx={{ py: 1 }}
            >
              <Typography sx={styles.init}>آقا</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              display="flex"
              flex="1"
              flexDirecion="row"
              justifyContent="center"
              sx={{ py: 1 }}
            >
              <InputBase
                error
                sx={styles.init}
                placeholder="نام و نام خانوادگی"
                inputProps={{ "aria-label": "user name" }}
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "نام و نام خانوادگی باید بیشتر از 3 کاراکتر باشد",
                  },
                })}
              />
              {/* <Typography ></Typography> */}
            </Grid>
          </Grid>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Grid
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={{ py: 1 }}
          >
            <Typography
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={styles.init}
            >
              <AlternateEmail sx={styles.icon} />
              آدرس ایمیل :
            </Typography>
            <InputBase
              sx={styles.init}
              placeholder="آدرس ایمیل"
              inputProps={{ "aria-label": "user name" }}
              {...register("email", {
                pattern: {
                  value: "",
                  message: "ایمیل مشکل داره",
                },
              })}
            />
          </Grid>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Grid
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={{ py: 1 }}
          >
            <Typography
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={styles.init}
            >
              <PhoneIphone sx={styles.icon} />
              شماره موبایل :
            </Typography>
            <Typography sx={styles.init}>{mobile}</Typography>
          </Grid>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Grid
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={{ py: 1 }}
          >
            <Typography
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={styles.init}
            >
              {/* <PhoneIphone sx={styles.icon} /> */}
              تاریخ تولد :
            </Typography>
            <Typography sx={styles.init}>
              <InputBase
                sx={styles.init}
                placeholder="تاریخ تولد"
                inputProps={{ "aria-label": "user name" }}
                {...register("birth")}
              />
            </Typography>
          </Grid>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Grid
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={{ py: 1 }}
          >
            <Typography
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{
                ...styles.init,
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
              }}
            >
              تخفیف ها و جشنواره ها را از طریق پیامک و ایمیل برای من ارسال کنید.
            </Typography>
            <CustomSwitch
              defaultChecked={newsletter}
              {...register("newsletter")}
            />
          </Grid>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Grid
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{ py: 1 }}
          >
            <Grid xs={12} sm={6} md={4} lg={3}>
              <RedButton type="submit">ذخیره اطلاعات</RedButton>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      </form>
    </Grid>
  );
}
export default PersonalData;
