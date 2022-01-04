import { AuthAxios } from "./Axios";

const getSearchApi = (query) => AuthAxios.get(`/search?search=${query}`);
const getMyOrderApi = () => AuthAxios.get(`/my-orders`);

export { getSearchApi, getMyOrderApi };
