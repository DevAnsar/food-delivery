import { AuthAxios } from "./Axios";

const getCenterApi = (id) => AuthAxios.get(`/deliveries/${id}`);


export { getCenterApi };
