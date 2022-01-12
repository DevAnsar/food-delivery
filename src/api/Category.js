import { AuthAxios, getHeaders } from "./Axios";

const getAllCategoryApi = () => AuthAxios.get(`/categories`);
const getSubCategoryDelivers = (categoryId=0, subCategoryId=0) =>AuthAxios.get( `/providers/${categoryId}/${subCategoryId}`,{headers:getHeaders()});

export { getAllCategoryApi, getSubCategoryDelivers };
