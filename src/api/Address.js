import { AuthAxios } from "./Axios";

const getMyAllAddressApi = () => AuthAxios.get(`/user/address`);
const saveAddressApi = (data) => AuthAxios.post(`/user/address`,data);
const deleteAddressApi = (id) => AuthAxios.delete(`/user/address/${id}`);
const editAddressApi = (id,data)=>AuthAxios.patch(`/user/address/${id}`,data);
export { getMyAllAddressApi , saveAddressApi , deleteAddressApi ,editAddressApi};
