import {useContext} from 'react';
import {ThemeShowContext} from '../providers';

function useSideMenu(){

    const context=useContext(ThemeShowContext);
    if (context === undefined)
    throw new Error('useAuth must be within AuthProvider!')

    let showMenu=context.showMenu;
    let setShowMenu=context.setShowMenu;
  return {showMenu,setShowMenu}
}
export {useSideMenu}