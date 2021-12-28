import {useContext} from 'react';
import {ThemeShowContext} from './../providers';

function useShowTheme(){

    const context=useContext(ThemeShowContext);
    if (context === undefined)
    throw new Error('useAuth must be within AuthProvider!')

  return context
}
export {useShowTheme}