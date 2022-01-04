import { useContext } from 'react';
import {SearchContext} from '../providers/SearchProvider';
function useSearch(){
    const context = useContext(SearchContext)

    if (context === undefined)
      throw new Error('useAuth must be within AuthProvider!')
  
    return context
}
export {useSearch}