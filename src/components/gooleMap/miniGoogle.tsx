import { GoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

import { ColorOfRoof } from '@/utils/AppConfig';

export interface MiniMapProps {
  isLoaded: boolean | undefined;
  selectedRoof: any;
  index: number;
}

const MiniMap = (props: MiniMapProps) => {
  const { 
    // isLoaded, 
    selectedRoof, index } = props;

  const [polygon, setPolygon] = useState<any>(null);
  const [centerLocation, setCenterLocation] = useState<any>({
    lat: 0,
    lng: 0,
  });

  const [mapKey] = useState(Math.floor(Math.random() * 1000) + 1);

  useEffect(() => {
    if (selectedRoof && selectedRoof.length > 0) {
      // setPolygon(selectedRoof);
      const calculateCenter = (coordinates: any) => {
        if (coordinates?.length === 0) {
          return null;
        }
        let sumLat = 0;
        let sumLng = 0;
        for (const coordinate of coordinates) {
          sumLat += coordinate.lat;
          sumLng += coordinate.lng;
        }
        const avgLat = sumLat / coordinates.length;
        const avgLng = sumLng / coordinates.length;
        return { lat: avgLat, lng: avgLng };
      };
      setCenterLocation(calculateCenter(selectedRoof));
    }
  }, [selectedRoof]);

  useEffect(() => {
    if (selectedRoof && selectedRoof.length > 0) {
      const polygons = new window.google.maps.Polygon({
        paths: selectedRoof,
        strokeColor: ColorOfRoof[index]?.strokeColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: ColorOfRoof[index]?.fillColor,
        //fillOpacity: 0.35,
        clickable: false,
        editable: false,
        draggable: false,
      });
      setPolygon(polygons);
    }
  }, [selectedRoof]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {polygon && (
        <GoogleMap
          id="map"
          onLoad={(map) => {
            setTimeout(() => {
              polygon.setMap(map);
            }, 100);
          }}
          options={{
            clickableIcons: false,
            fullscreenControl: false,
            zoomControl: false,
            scaleControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            draggable: false,
            zoom: 20,
            minZoom: 3,
            mapTypeId: 'satellite',
            tilt: 0,
            rotateControl: false,
          }}
          zoom={20}
          mapTypeId="satellite"
          center={centerLocation}
          mapContainerStyle={{
            width: '100%',
            height: '150px',
            borderRadius: '10px',
          }}
          key={mapKey}
        />
      )}
    </div>
  );
};

export default MiniMap;
