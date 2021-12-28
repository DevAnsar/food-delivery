import {createContext,useState} from 'react';
const ThemeShowContext=createContext(undefined);

function ThemeProvider({children}){
    const [showTheme,setShowTheme]=useState(true);
    return (
        <ThemeShowContext.Provider value={{showTheme,setShowTheme}}>
            {children}
        </ThemeShowContext.Provider>
    )

}
export {ThemeShowContext}
export default ThemeProvider;