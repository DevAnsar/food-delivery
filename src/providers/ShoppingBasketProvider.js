import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const ShoppingBasketContext = createContext(undefined);

function ShoppingBasketProvider({ children }) {
  const [storageValue, setLocalStorageValue] = useLocalStorage("shopping-basket",[]);

  const [basket, setBasket] = useState(storageValue);

  useEffect(() => {
    setLocalStorageValue("shopping-basket", basket);
  }, [basket]);


  return (
    <ShoppingBasketContext.Provider
      value={{ basket ,setBasket }}
    >
      {children}
    </ShoppingBasketContext.Provider>
  );
}
export { ShoppingBasketContext };
export default ShoppingBasketProvider;
