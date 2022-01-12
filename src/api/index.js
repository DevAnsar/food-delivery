import { AuthAxios , getHeaders } from "./Axios";

const getSearchApi = (query) => AuthAxios.get(`/search?search=${query}`,{headers:getHeaders()});
const getMyOrderApi = () => AuthAxios.get(`/my-orders`,{headers:getHeaders()});
const getMyOrderTrackingApi = () => AuthAxios.get(`/my-order-tracking`,{headers:getHeaders()});

const getAuthUserApi = () => AuthAxios.get(`/user/me`,{headers:getHeaders()});
const getAuthUserUpdatApi = (params) => AuthAxios.patch("/user/me", params,{headers:getHeaders()});

export {
  getSearchApi,
  getMyOrderApi,
  getMyOrderTrackingApi,
  getAuthUserApi,
  getAuthUserUpdatApi,
};
