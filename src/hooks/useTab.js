import {useContext} from 'react';
import {TabContext} from '../providers';

function useTab(){

    const context=useContext(TabContext);
    if (context === undefined)
    throw new Error('useAuth must be within AuthProvider!')

  return context
}
export {useTab}