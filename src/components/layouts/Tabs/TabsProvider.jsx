import React, { useState, createContext } from "react";
const TabContext = createContext(undefined);

function TabsProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  );
}
export {TabContext}
export default TabsProvider;
