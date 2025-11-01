import React, { createContext, useState, useEffect, useContext } from 'react';
import useGeoLocation from './useGeoLocation';

const CordinatesContext = createContext(null);

export const CordinatesProvider = ({ children }) => {
  const [coords, setCoords] = useState(null);
  const { locationInfo, status: geoStatus } = useGeoLocation();

  useEffect(() => {
    if (geoStatus === 'success') {
      setCoords({ lat: locationInfo.latitude, lng: locationInfo.longitude });
    } else if (geoStatus === 'error') {
      setCoords({ lat: 26.8566528, lng: 80.9435136 });
    }
  }, [geoStatus, locationInfo]);

  const contextValue = { coords, setCoords };

  return (
    <CordinatesContext value={contextValue}>
      {children}
    </CordinatesContext>
  );
};

export const useLocation = () =>{
  return useContext(CordinatesContext);
}

export default CordinatesContext;
