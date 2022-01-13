import { AuthAxios, getHeaders } from "./Axios";

const getAllCategoryApi = () => AuthAxios.get(`/categories`,{headers:getHeaders()});
const getSubCategoryDelivers = (categoryId = 0, subCategoryId = 0) =>
  AuthAxios.get(`/providers/${categoryId}/${subCategoryId}`, {
    headers: getHeaders(),
  });
const likeDelivery = (providerId, status) =>
  AuthAxios.post(
    `/providers/${providerId}/like`,
    { status },
    { headers: getHeaders() }
  );
export { getAllCategoryApi, getSubCategoryDelivers ,likeDelivery };
