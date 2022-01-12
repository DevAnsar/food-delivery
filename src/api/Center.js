import { AuthAxios,getHeaders } from "./Axios";

const getCenterApi = (slug) => AuthAxios.get(`/providers/${slug}`,{headers:getHeaders()});

export { getCenterApi };
