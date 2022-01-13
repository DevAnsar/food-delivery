import axios from "axios";
const getHeaders = ()=>{
    return {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    };
}

// const BASE_URL="http://localhost:8000/api/v1";
const BASE_URL="http://192.168.1.103:8000/api/v1";

const Axios = axios.create({
    baseURL :BASE_URL,
    withCredentials :true

});

const AuthAxios = axios.create({
    baseURL :BASE_URL,
    withCredentials:true,
    headers :getHeaders()

});
export {Axios,AuthAxios,getHeaders};