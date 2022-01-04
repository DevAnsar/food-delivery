import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "./../hooks/useLocalStorage";
const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [storageValue, setLocalStorageValue] = useLocalStorage("user", {
    loggedIn: false,
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
  }, [user]);

  const toggleAuth = () => {
    setUser((prev) => ({
      ...prev,
      loggedIn: !prev.loggedIn,
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
      value={{ user, toggleAuth, setLevel, setLastSendTime ,setPersonalData,setMobile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
export default AuthProvider;
