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
import { getMenuApi, createMenuApi, editMenuApi } from "./../../../api/Shop";
import { useNavigate, useParams } from "react-router-dom";
import GreyButton from "./../../buttons/GreyButton";
import { serverErrorMessage } from "./../../../configs/variables";
import { useForm } from "react-hook-form";

function FormMenu({ mode }) {
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
      getMenu();
    }else{
        setLoading(false);
    }
  }, []);

  const getMenu = async () => {
    try {
      setLoading(true);
      let { data } = await getMenuApi(params.id);
      let {
        status,
        message,
        data: { menu },
      } = data;
      if (status) {
        setValue("title", menu.title);
      } else {
        toast.error(message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(serverErrorMessage);
    }
  };
  const handleGoMenus = () => {
    navigate("/my-shop");
  };
  const handleForm = async (formData) => {
    try {
      let res;
      if (mode === "edit") {
        res = await editMenuApi(params.id, formData);
      } else {
        res = await createMenuApi(formData);
      }
      let { status, message } = res.data;
      if (status) {
        toast.success(message);
        navigate("/my-shop");
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
          {mode === "edit" ? "ویرایش منو" : "افزودن منو برای فروشگاه"}
        </Typography>
        <IconButton onClick={handleGoMenus}>
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
                  label="عنوان منو"
                  variant="outlined"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "عنوان منوی خود را وارد کنید",
                    },
                    minLength: {
                      value: 2,
                      message: "عنوان منو باید بیشتر از دو کاراکتر باشد",
                    },
                  })}
                  error={errors.title ? true : false}
                  helperText={errors.title?.message}
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
export default FormMenu;
