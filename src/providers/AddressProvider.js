import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getMyAllAddressApi } from "../api/Address";
import toast from "react-hot-toast";

const AddressContext = createContext(undefined);

function AddressProvider({ children }) {
  const [storageValue, setLocalStorageValue] = useLocalStorage(
    "user-address",
    null
  );
  const [address, setAddress] = useState(storageValue);
  const [allAddress, setAllAddress] = useState([]);

  useEffect(() => {
    getUserAllAddresses();
  }, []);

  useEffect(() => {
    setLocalStorageValue("user-address", address);
  }, [address]);

  const getUserAllAddresses = async () => {
    try {
      const { data } = await getMyAllAddressApi();
      const { status, message, addresses } = data;
      if (status) {
        setAllAddress(addresses);
        if (storageValue !== null) {
          let defaultAddress = addresses.filter(
            (a) => a.id === storageValue.id
          );
          if (defaultAddress.length > 0) {
            setLocalStorageValue("user-address", defaultAddress[0]);
          }
        }
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddressContext.Provider
      value={{ address, setAddress, allAddress, setAllAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
}
export { AddressContext };
export default AddressProvider;
