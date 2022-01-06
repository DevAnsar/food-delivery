import {createContext,useState} from 'react';
const ThemeShowContext=createContext(undefined);

function ThemeProvider({children}){
    const [showTheme,setShowTheme]=useState(true);
    const [showMenu,setShowMenu]=useState(true);
    return (
        <ThemeShowContext.Provider value={{showTheme,setShowTheme , showMenu , setShowMenu }}>
            {children}
        </ThemeShowContext.Provider>
    )

}
export {ThemeShowContext}
export default ThemeProvider;