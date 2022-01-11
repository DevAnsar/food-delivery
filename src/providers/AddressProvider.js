import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getMyAllAddressApi,getAllCitiesApi } from "../api/Address";
import toast from "react-hot-toast";

const AddressContext = createContext(undefined);

function AddressProvider({ children }) {
  const [storageValue, setLocalStorageValue] = useLocalStorage(
    "user-address",
    null
  );
  const [address, setAddress] = useState(storageValue);
  const [allAddress, setAllAddress] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // getUserAllAddresses();
    getAllCities();
  }, []);

  useEffect(() => {
    setLocalStorageValue("user-address", address);
  }, [address]);

  const getUserAllAddresses = async (user) => {
    try {
      // console.log("user sended by authProvider in useEffect:", user);
      if (user && user.loggedIn) {
        // console.log("useEffect:", user);
        const { data } = await getMyAllAddressApi();
        const {
          status,
          message,
          data: { addresses },
        } = data;
        if (status) {
          // console.log('addresses api',addresses)
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCities = async () => {
    try {
      const { data } = await getAllCitiesApi();
      const {
        status,
        message,
        data: { cities },
      } = data;
      if (status) {
        setCities(cities);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress,
        allAddress,
        setAllAddress,
        getUserAllAddresses,
        cities
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
export { AddressContext };
export default AddressProvider;
