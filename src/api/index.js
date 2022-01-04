import { AuthAxios } from "./Axios";

const getSearchApi = (query) => AuthAxios.get(`/search?search=${query}`);
const getMyOrderApi = () => AuthAxios.get(`/my-orders`);
const getMyOrderTrakingApi = () => AuthAxios.get(`/my-order-traking`);

const getAuthUserApi = () => AuthAxios.get(`/user/me`);
const getAuthUserUpdatApi = (params) => AuthAxios.patch("/user/me", params);

export {
  getSearchApi,
  getMyOrderApi,
  getMyOrderTrakingApi,
  getAuthUserApi,
  getAuthUserUpdatApi,
};
