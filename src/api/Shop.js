import { AuthAxios, getHeaders } from "./Axios";

const getMyMenusApi = () =>
  AuthAxios.get(`/my-shop/menus`, { headers: getHeaders() });

const deleteMenuApi = (menuId) =>
  AuthAxios.delete(`/my-shop/menus/${menuId}`, { headers: getHeaders() });

const getMenuApi = (menuId) =>
  AuthAxios.get(`/my-shop/menus/${menuId}`, { headers: getHeaders() });

const createMenuApi = (data) =>
  AuthAxios.post(`/my-shop/menus`,data, { headers: getHeaders() });
  
const editMenuApi = (menuId,data) =>
  AuthAxios.put(`/my-shop/menus/${menuId}`,data, { headers: getHeaders() });

export { getMyMenusApi, deleteMenuApi, getMenuApi, createMenuApi, editMenuApi };
