import { AuthAxios, getHeaders } from "./Axios";

//create provider
const createProviderApi = (data)=>AuthAxios.post(`/auth/providers/create`, data, { headers: getHeaders() });


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

const deleteProductApi = (menuId, productId) =>
  AuthAxios.delete(`/my-shop/menus/${menuId}/products/${productId}`, {
    headers: getHeaders(),
  });

const editProductApi = (menuId, productId, data) =>
  AuthAxios.put(`/my-shop/menus/${menuId}/products/${productId}`, data, {
    headers: getHeaders(),
  });

const getProductApi = (menuId, productId) =>
  AuthAxios.get(`/my-shop/menus/${menuId}/products/${productId}`, {
    headers: getHeaders(),
  });

const createProductApi = (menuId, data) =>
  AuthAxios.post(`/my-shop/menus/${menuId}/products`, data, {
    headers: getHeaders(),
  });

//shop information
const getInformationApi = () =>
  AuthAxios.get(`/my-shop/information`, { headers: getHeaders() });

const informationEditApi = (data) =>
AuthAxios.put(`/my-shop/information/edit`,data, { headers: getHeaders() });


export {
  getMyMenusApi,
  deleteMenuApi,
  getMenuApi,
  createMenuApi,
  editMenuApi,
  getMyProductsApi,
  deleteProductApi,
  editProductApi,
  getProductApi,
  createProductApi,
  getInformationApi,
  informationEditApi,
  createProviderApi
};
