import { AuthAxios } from "./Axios";

const getAllCategoryApi = () => AuthAxios.get(`/categories`);
const getSubCategoryDelivers = (categoryId, subCategoryId) =>{

    let query=`?categoryId=${categoryId}`;
    if(subCategoryId != 0){
        query += `&subCategoryId=${subCategoryId}`
    }

    return AuthAxios.get( `/delivery${query}`);
}

export { getAllCategoryApi, getSubCategoryDelivers };
