import { AuthAxios } from "./Axios";

const getCenterApi = (id) => AuthAxios.get(`/delivery/dtl/${id}`);

export { getCenterApi };
