import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "./../hooks/useLocalStorage";
const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [storageValue, setLocalStorageValue] = useLocalStorage("user", {
    loggedIn: false,
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
  return (
    <AuthContext.Provider value={{ user, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
export default AuthProvider;
