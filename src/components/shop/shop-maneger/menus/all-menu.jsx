import React, { useState, useEffect } from "react";
import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import {
  Delete as DeleteIcon,
  Menu as MenuIcon,
  Mode,
} from "@mui/icons-material";
import { getMyMenusApi, deleteMenuApi } from "./../../../../api/Shop";
import YesNoModal from "./../../../layouts/YesNoModal";
import { useNavigate } from "react-router-dom";
import GreyButton from "./../../../buttons/GreyButton";
import MyShopNavigation ,{MyShopNavigationList} from './../navigation/Navigations';


function AllMenu() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMenuId, setDeleteMenuId] = useState(0);

  useEffect(() => {
    getMyMenus();
  }, []);
  const getMyMenus = async () => {
    try {
      let { data } = await getMyMenusApi();
      let {
        status,
        message,
        data: { menus },
      } = data;
      if (status) {
        setMenus(menus);
      } else {
        toast.error(message);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("مشکلی در دریافت اطلاعات به وجود آمد");
    }
  };
  const handleDeleteAlert = (menuId) => {
    setDeleteMenuId(menuId);
    setShowDeleteModal(true);
  };
  const handleDeleteAlertClose = () => {
    setDeleteMenuId(0);
    setShowDeleteModal(false);
  };
  const handleDeleteMenu = async () => {
    try {
      setDeleteLoading(true);
      let { data } = await deleteMenuApi(deleteMenuId);
      let { status, message } = data;
      if (status) {
        setMenus((prevMenus) => {
          let newMenus = prevMenus.filter((menu) => menu.id !== deleteMenuId);
          return [...newMenus];
        });
        toast.success(message);
      } else {
        toast.error(message);
      }
      setDeleteLoading(false);
      setShowDeleteModal(false);
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
    }
  };
  const handleEdit = (menuId) => {
    navigate(`/my-shop/menus/${menuId}/edit`);
  };
  const handleNewMenu = () => {
    navigate(`/my-shop/menus/create`);
  };
  const handleGoToProducts = (menuId) => {
    navigate(`/my-shop/menus/${menuId}/products`);
  };

  return (
    <Grid container>
      <MyShopNavigation selected={MyShopNavigationList['menus'].path} />

      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography sx={{ fontWeight: "bold" }}>
          لیست منوی فروشگاه شما
        </Typography>
        <GreyButton sx={{ width: "100px" }} onClick={handleNewMenu}>
          افزودن منو
        </GreyButton>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
            <TableBody>
              {menus.map((menu, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Grid
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      onClick={() => handleGoToProducts(menu.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <IconButton size="small">
                        <MenuIcon />
                      </IconButton>{" "}
                      <Typography sx={{ fontWeight: "bold" }}>
                        {menu.title}
                      </Typography>
                      <Typography sx={{ ml: 1 }}>
                        {"("}
                        {menu.productCount}
                        {" آیتم) "}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <DeleteIcon onClick={() => handleDeleteAlert(menu.id)} />
                    </IconButton>
                    <IconButton>
                      <Mode onClick={() => handleEdit(menu.id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        {loading && (
          <Grid
            container
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{ my: 5 }}
          >
            <CircularProgress size={25} />
          </Grid>
        )}
      </Grid>
      <YesNoModal
        open={showDeleteModal}
        onClose={handleDeleteAlertClose}
        handleAction={handleDeleteMenu}
        actionLoading={deleteLoading}
        message={
          "آیا مایل به حذف این منو میباشید؟ همه ی محصولات آن حذف خواهد شد"
        }
      />
    </Grid>
  );
}
export default AllMenu;
