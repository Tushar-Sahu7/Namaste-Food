import { useState, useEffect } from "react";

const useGeoLocation = () =>{
  const [locationInfo, setLocationInfo]= useState(null);
  const [locationError, setLocationError]= useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const {geolocation} = navigator;

    const sucessFn = (res) =>{
      setStatus('success');
      setLocationInfo(res.coords);
    }
    
    const ErrorFn = (res) =>{
      setStatus('error');
      setLocationError(res.message);
    }

    geolocation.getCurrentPosition(sucessFn, ErrorFn);
  }, []);

  return {locationInfo, locationError, status};

}

export default useGeoLocation;