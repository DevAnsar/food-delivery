import React, { useState, createContext } from "react";

const SearchContext = createContext(undefined);
function SearchProvider({ children }) {
  const [results, setResults] = useState(null);
  return (
    <SearchContext.Provider value={{ results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}
export {SearchContext};
export default SearchProvider;
