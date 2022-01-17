const detalBaseLinearGradient =`linear-gradient(120deg, #FAD961 0%, #F76B1C 57%)`;
const phoneRegex=(phone)=>/^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/.test(phone);
const loginCodeRegex=(code)=>/^\d{4}$/.test(code);
const currencyFormatted = (amount)=> amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const serverErrorMessage="متاسفانه مشکلی در دریافت اطلاعات بوجود آمد";
export {
    detalBaseLinearGradient,
    phoneRegex,
    loginCodeRegex,
    currencyFormatted,
    serverErrorMessage
}