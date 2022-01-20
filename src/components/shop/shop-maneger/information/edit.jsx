import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { ArrowBack } from "@mui/icons-material";
import { getInformationApi, informationEditApi } from "../../../../api/Shop";
import { useNavigate, useParams } from "react-router-dom";
import GreyButton from "../../../buttons/GreyButton";
import { serverErrorMessage } from "../../../../configs/variables";
import { useForm } from "react-hook-form";

function FormInformation() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = async () => {
    try {
      setLoading(true);
      let { data } = await getInformationApi();
      let {
        status,
        message,
        data: { delivery },
      } = data;
      if (status) {
        setValue("name", delivery.name);
        setValue("description", delivery.description);
        setValue("deliveryTime", delivery.deliveryTime);
      } else {
        toast.error(message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(serverErrorMessage);
    }
  };
  const handleGoBack = () => {
    navigate("/my-shop/information");
  };
  const handleForm = async (formData) => {
    try {
      setLoading(true);
      let res = await informationEditApi(formData);
      let { status, message } = res.data;
      if (status) {
        toast.success(message);
        navigate("/my-shop/information");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(serverErrorMessage);
    }
  };
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mt: 2, mb: 4 }}
      >
        <Typography>{"ویرایش اطلاعات فروشگاه"}</Typography>
        <IconButton onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
      </Grid>
      <Grid
        container
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Grid container maxWidth="sm">
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(handleForm)}>
              <Grid
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="outlined-basic"
                  label="عنوان فروشگاه"
                  variant="outlined"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "عنوان فروشگاه خود را وارد کنید",
                    },
                    minLength: {
                      value: 3,
                      message: "عنوان  باید بیشتر از سه کاراکتر باشد",
                    },
                  })}
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="outlined-basic"
                  label="توضیحات فروشگاه"
                  variant="outlined"
                  {...register("description", {
                    required: {
                      value: false,
                    },
                  })}
                  error={errors.description ? true : false}
                  helperText={errors.description?.message}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="outlined-basic"
                  label="مدت زمان تحوبل سفارش به دقیقه "
                  variant="outlined"
                  {...register("deliveryTime", {
                    required: {
                      value: true,
                      message: "مدت زمان تحویل سفارش را مشخص کنید",
                    },
                  })}
                  error={errors.deliveryTime ? true : false}
                  helperText={errors.deliveryTime?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <GreyButton sx={{ my: 2 }} disabled={loading} type="submit">
                  {"ویرایش"}
                </GreyButton>
                {loading && <CircularProgress size={20} />}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default FormInformation;
