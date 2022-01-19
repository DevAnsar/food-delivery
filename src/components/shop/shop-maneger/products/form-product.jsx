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
import {
  getProductApi,
  createProductApi,
  editProductApi,
} from "../../../../api/Shop";
import { useNavigate, useParams } from "react-router-dom";
import GreyButton from "../../../buttons/GreyButton";
import { serverErrorMessage } from "../../../../configs/variables";
import { useForm } from "react-hook-form";

function FormProduct({ mode }) {
  const navigate = useNavigate();
  const params = useParams();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === "edit") {
      getProduct();
    } else {
      setLoading(false);
    }
  }, [mode]);

  const getProduct = async () => {
    try {
      setLoading(true);
      let { data } = await getProductApi(params.menuId, params.productId);
      let {
        status,
        message,
        data: { product },
      } = data;
      if (status) {
        setValue("title", product.title);
        setValue("price", product.price);
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
    navigate(`/my-shop/menus/${params.menuId}/products`);
  };
  const handleForm = async (formData) => {
    try {
      let res;
      if (mode === "edit") {
        res = await editProductApi(params.menuId, params.productId, formData);
      } else {
        res = await createProductApi(params.menuId, formData);
      }
      let { status, message } = res.data;
      if (status) {
        toast.success(message);
        navigate(`/my-shop/menus/${params.menuId}/products`);
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
        <Typography>
          {mode === "edit" ? "ویرایش محصول" : "افزودن محصول برای فروشگاه"}
        </Typography>
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
                  fullWidth
                  id="outlined-basic"
                  label="عنوان محصول"
                  variant="outlined"
                  sx={{mb:3}}
                  {...register("title", {
                    required: {
                      value: true,
                      message: "عنوان محصول خود را وارد کنید",
                    },
                    minLength: {
                      value: 2,
                      message: "عنوان محصول باید بیشتر از دو کاراکتر باشد",
                    },
                  })}
                  error={errors.title ? true : false}
                  helperText={errors.title?.message}
                  autoFocus
                />

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="قیمت محصول"
                  variant="outlined"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "قیمت محصول خود را وارد کنید",
                    },
                    min: {
                      value: 1000,
                      message: "عنوان محصول باید بیشتر از هزار تومان  باشد",
                    },
                  })}
                  error={errors.price ? true : false}
                  helperText={errors.price?.message}
                  autoFocus
                />

                <GreyButton sx={{ my: 2 }} disabled={loading} type="submit">
                  {mode === "edit" ? "ویرایش" : "افزودن"}
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
export default FormProduct;
