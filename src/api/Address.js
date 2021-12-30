import { AuthAxios } from "./Axios";

const getMyAllAddressApi = () => AuthAxios.get(`/user/address`);
const saveAddressApi = (data) => AuthAxios.post(`/user/address`,data);

export { getMyAllAddressApi , saveAddressApi };
