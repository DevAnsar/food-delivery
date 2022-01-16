import { AuthAxios , getHeaders } from "./Axios";

const getMyMenusApi = () => AuthAxios.get(`/my-shop/menus`,{headers:getHeaders()});
const deleteMenuApi = (menuId)=>AuthAxios.delete(`/my-shop/menus/${menuId}`,{headers:getHeaders()});

export {
  getMyMenusApi,
  deleteMenuApi
};
