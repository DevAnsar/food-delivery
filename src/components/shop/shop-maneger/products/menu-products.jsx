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
import { getMyProductsApi, deleteProductApi } from "./../../../../api/Shop";
import YesNoModal from "./../../../layouts/YesNoModal";
import { useNavigate , useParams } from "react-router-dom";
import GreyButton from "./../../../buttons/GreyButton";

function MenuProducts() {
  const navigate = useNavigate();
  const params = useParams();
  const [menu, setMenu] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(0);

  useEffect(() => {
    getMyProducts();
  }, []);
  const getMyProducts = async () => {
    try {
      let { data } = await getMyProductsApi(params.menuId);
      let {
        status,
        message,
        data: { products,menu },
      } = data;
      if (status) {
        setProducts(products);
        setMenu(menu);
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
    setDeleteProductId(menuId);
    setShowDeleteModal(true);
  };
  const handleDeleteAlertClose = () => {
    setDeleteProductId(0);
    setShowDeleteModal(false);
  };
  const handleDeleteProduct = async () => {
    try {
      setDeleteLoading(true);
      let { data } = await deleteProductApi(deleteProductId);
      let { status, message } = data;
      if (status) {
        setProducts((prevProducts) => {
          let newProducts = prevProducts.filter((product) => product.id !== deleteProductId);
          return [...newProducts];
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
    navigate(`/my-shop/products/${menuId}/edit`);
  };
  const handleNewProduct = () => {
    navigate(`/my-shop/products/create`);
  };
  const handleGoToProduct = (productId)=>{
    navigate(`/my-shop/products/${menu.id}/products/${productId}`);
  }

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
        <Typography sx={{ fontWeight: "bold" }}>
          لیست محصولات در منو
          {" "}
          {menu?.title}
        </Typography>
        <GreyButton sx={{ width: "150px" }} onClick={handleNewProduct}>
          افزودن محصول جدید
        </GreyButton>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Grid
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      onClick={()=>handleGoToProduct(menu?menu.id:0,product.id)}
                      sx={{cursor:"pointer"}}
                    >
                      <IconButton size="small">
                        <MenuIcon />
                      </IconButton>{" "}
                      <Typography sx={{ fontWeight: "bold" }}>
                        {product.title}
                      </Typography>
            
                    </Grid>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <DeleteIcon onClick={() => handleDeleteAlert(product.id)} />
                    </IconButton>
                    <IconButton>
                      <Mode onClick={() => handleEdit(product.id)} />
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
        handleAction={handleDeleteProduct}
        actionLoading={deleteLoading}
        message={
          "آیا مایل به حذف این محصول میباشید؟"
        }
      />
    </Grid>
  );
}
export default MenuProducts;
