import { AuthAxios } from "./Axios";

const getSearchApi = (query) => AuthAxios.get(`/search?search=${query}`);
const getMyOrderApi = () => AuthAxios.get(`/my-orders`);
const getMyOrderTrakingApi = () => AuthAxios.get(`/my-order-traking`);

export { getSearchApi, getMyOrderApi, getMyOrderTrakingApi };
