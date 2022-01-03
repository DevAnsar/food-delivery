import { AuthAxios } from "./Axios";

const getSearchApi = (query) => AuthAxios.get(`/search?search=${query}`);


export { getSearchApi };