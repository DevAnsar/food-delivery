import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "./../hooks/useLocalStorage";
import { useAddress } from "./../hooks/useAddress";
const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const {getUserAllAddresses} = useAddress();
  const [storageValue, setLocalStorageValue] = useLocalStorage("user", {
    loggedIn: false,
    token: null,
    provider:null,
    level: 1,
    lastSendTime: null,
    name: null,
    email: null,
    mobile: null,
    birth:null,
    newsletter:false
  });

  const [user, setUser] = useState(storageValue);

  useEffect(() => {
    setLocalStorageValue("user", user);
    getUserAllAddresses(user);
  }, [user]);

  const toggleAuth = (loginToken=false) => {
    setUser((prev) => ({
      ...prev,
      loggedIn: !prev.loggedIn,
      token : loginToken ? loginToken : prev.token,
    }));
  };


  const setLevel = (level) => {
    setUser((prev) => ({
      ...prev,
      level,
    }));
  };

  
  const setMobile = (mobile) => {
    setUser((prev) => ({
      ...prev,
      mobile,
    }));
  };

  const setLastSendTime = (lastSendTime) => {
    setUser((prev) => ({
      ...prev,
      lastSendTime,
    }));
  };

  const setProvider = (provider) => {
    setUser((prev) => ({
      ...prev,
      provider,
    }));
  };

  const setPersonalData = ({name, gender,email,birth,newsletter}) => {
    setUser((prev) => ({
      ...prev,
      name,
      gender,
      email,
      birth,
      newsletter
    }));
  };

  return (
    <AuthContext.Provider
      value={{ user, toggleAuth,setProvider, setLevel, setLastSendTime ,setPersonalData,setMobile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
export default AuthProvider;
