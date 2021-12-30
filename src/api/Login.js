import {Axios} from "./Axios";

const sendPhoneNumberApi = (phone) => Axios.post(`/auth/phone`, { phone });
const sendLoginCodeApi = (phone , code) => Axios.post(`/auth/code`, { phone , code });

export { sendPhoneNumberApi, sendLoginCodeApi };
