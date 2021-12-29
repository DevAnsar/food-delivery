import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "./../hooks/useLocalStorage";
const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [storageValue, setLocalStorageValue] = useLocalStorage("user", {
    loggedIn: false,
    level : 1,
    lastSendTime:null
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
      level
    }));
  };

    
  const setLastSendTime = (lastSendTime) => {
    setUser((prev) => ({
      ...prev,
      lastSendTime
    }));
  };

  return (
    <AuthContext.Provider value={{ user, toggleAuth ,setLevel,setLastSendTime }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
export default AuthProvider;
