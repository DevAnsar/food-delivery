import { AuthAxios ,Axios ,getHeaders } from "./Axios";

const getMyAllAddressApi = () => AuthAxios.get(`/user/address`,{headers:getHeaders()});
const saveAddressApi = (data) => AuthAxios.post(`/user/address`,data,{headers:getHeaders()});
const deleteAddressApi = (id) => AuthAxios.delete(`/user/address/${id}`,{headers:getHeaders()});
const editAddressApi = (id,data)=>AuthAxios.patch(`/user/address/${id}`,data,{headers:getHeaders()});
const getAllCitiesApi = ()=>Axios.get(`/cities`);
export { getMyAllAddressApi , saveAddressApi , deleteAddressApi ,editAddressApi,getAllCitiesApi};
