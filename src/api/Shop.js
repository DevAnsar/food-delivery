import { AuthAxios, getHeaders } from "./Axios";

//menus api
const getMyMenusApi = () =>
  AuthAxios.get(`/my-shop/menus`, { headers: getHeaders() });

const deleteMenuApi = (menuId) =>
  AuthAxios.delete(`/my-shop/menus/${menuId}`, { headers: getHeaders() });

const getMenuApi = (menuId) =>
  AuthAxios.get(`/my-shop/menus/${menuId}`, { headers: getHeaders() });

const createMenuApi = (data) =>
  AuthAxios.post(`/my-shop/menus`, data, { headers: getHeaders() });

const editMenuApi = (menuId, data) =>
  AuthAxios.put(`/my-shop/menus/${menuId}`, data, { headers: getHeaders() });

//products api
const getMyProductsApi = (menuId) =>
  AuthAxios.get(`/my-shop/menus/${menuId}/products`, { headers: getHeaders() });

const deleteProductApi = (productId) =>
  AuthAxios.delete(`/my-shop/products/${productId}`, { headers: getHeaders() });

export {
  getMyMenusApi,
  deleteMenuApi,
  getMenuApi,
  createMenuApi,
  editMenuApi,
  getMyProductsApi,
  deleteProductApi,
};
