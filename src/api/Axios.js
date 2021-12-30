import axios from "axios";
const BASE_URL="http://localhost:8000/api";

const Axios = axios.create({
    baseURL :BASE_URL,

});

const AuthAxios = axios.create({
    baseURL :BASE_URL,

});

export {Axios,AuthAxios};