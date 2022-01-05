import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const ShoppingBasketContext = createContext(undefined);

function ShoppingBasketProvider({ children }) {
  const [storageValue, setLocalStorageValue] = useLocalStorage("shopping-basket",{
    provider : null,
    products : []
  });
  const [basket, setBasket] = useState(storageValue);
  const [showBasket,setShowBasket]=useState(false);

  useEffect(() => {
    setLocalStorageValue("shopping-basket", basket);
  }, [basket]);


  return (
    <ShoppingBasketContext.Provider
      value={{ basket ,setBasket , showBasket , setShowBasket }}
    >
      {children}
    </ShoppingBasketContext.Provider>
  );
}
export { ShoppingBasketContext };
export default ShoppingBasketProvider;
