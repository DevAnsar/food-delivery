import { useEffect, useState }  from 'react';
import Splash from '../components/layouts/Splash';
function SplashProvider({children}){
    const [splash,setSplash]=useState(true);
    useEffect(()=>{
      setTimeout(() => {
        setSplash(false)
      }, 1500);
    },[]);
    return splash ? <Splash /> : children

}
export default SplashProvider;