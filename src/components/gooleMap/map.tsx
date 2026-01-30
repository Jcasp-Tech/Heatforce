import { GoogleMap } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import styles from "../../styles/modulesStyles/survey.module.scss";

export interface GMapProps {
  isLoaded: boolean | undefined;
  currentPinLocation: any;
  disableMap: boolean;
  zoomed: number;
}
const Map = (props: GMapProps) => {
  const {
    // isLoaded, 
    currentPinLocation, disableMap, zoomed } = props;
    console.log('disableMapVal_', disableMap);
  const pinMapRef = useRef(null);
  const [mapRef, setMapRef] = useState<any>(null);
  const handleOnLoad = (map: any) => {
    setMapRef(map);
  };

  const handleChangeZoom = () => {
    if (mapRef) {
      // Store the zoom value in the local storage
      const findZoom = mapRef.getZoom();
      localStorage.setItem('findZoom', JSON.stringify(findZoom));
    }
  };

  const handleCenterChanged = () => {
    if (mapRef) {
      const newCenter = mapRef.getCenter();
      const tmpArrCenter = [
        {
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        },
      ];

      if (tmpArrCenter.length > 0) {
        // Store the lat lng of the local storage
        localStorage.setItem('pinCenter', JSON.stringify(tmpArrCenter[0]));
      }
    }
  };

  return (
    <div
      id="googlePinMap"
      className="googlemap-size"
      style={{ position: 'relative', width: '100%' }}
    >
      {(
        <GoogleMap
          id="map"
          onLoad={(map) => { return handleOnLoad(map) }}
          options={{
            fullscreenControl: false,
            zoomControl: false,
            scaleControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            scrollwheel: true,
            // draggable: !disableMap,
            draggable: true,
            zoom: zoomed,
            minZoom: 18,
            maxZoom: 50,
            mapTypeId: 'satellite',
            tilt: 0,
            rotateControl: false,
            // gestureHandling: 'cooperative',
            gestureHandling: 'greedy',
          }}
          zoom={zoomed}
          mapTypeId="satellite"
          center={currentPinLocation}
          onCenterChanged={handleCenterChanged}
          onZoomChanged={handleChangeZoom}
          ref={pinMapRef}
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            // minHeight:'35vw',
            borderRadius: '20px',
          }}
        >
          <div className={styles.crosshair}>
            <div className={styles.verticalLine} />
            <div className={styles.horizontalLine} />
            <div className={styles.pin} />
          </div>
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
