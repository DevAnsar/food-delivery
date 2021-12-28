import { useContext } from 'react';
import {AuthContext} from './../providers/AuthProvider';
function useAuth(){
    const context = useContext(AuthContext)

    if (context === undefined)
      throw new Error('useAuth must be within AuthProvider!')
  
    return context
}
export {useAuth}