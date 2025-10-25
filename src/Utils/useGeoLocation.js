import { useState, useEffect } from "react";

const useGeoLocation = () =>{
  const [locationInfo, setLocationInfo]= useState(null);
  const [locationError, setLocationError]= useState(null);
  
  useEffect(() => {
    const {geolocation} = navigator;

    const sucessFn = (res) =>{
      setLocationInfo(res.coords);
    }
    
    const ErrorFn = (res) =>{
      setLocationError(res.message);
    }

    if(!locationError && !locationInfo){
      geolocation.getCurrentPosition(sucessFn, ErrorFn);
    }
  }, []);

  return {locationInfo, locationError};

}

export default useGeoLocation;