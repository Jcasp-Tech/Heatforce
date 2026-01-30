import { GoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

import type { roofDetails } from '@/redux/services/types';
import { ColorOfRoof } from '@/utils/AppConfig';
import { QUESTION } from '@/utils/constants';
import { ifProcessingComplete } from '@/utils/helpers';
import Image from 'next/image';

export interface DGMapProps {
  isLoaded: boolean | undefined;
  roof: roofDetails;
  allRoofs: roofDetails[];
  handleChange: (ans: any, data: any, nextC: any) => void;
  currentPinLocation: any;
  handleRoofDetails: (data: roofDetails) => void;
  zoomed: number;
  setDirectionValidationOpen: (data: boolean) => void;
}

const DGMap = (props: DGMapProps) => {
  const {
    // isLoaded,
    roof,
    allRoofs,
    zoomed,
    handleChange,
    currentPinLocation,
    handleRoofDetails,
    setDirectionValidationOpen,
  } = props;
  const [polygon, setPolygon] = useState<any[]>([]);

  const [mapKey, setMapKey] = useState(Math.floor(Math.random() * 1000) + 1);

  const questionIndex = 19;
  const questionConst = QUESTION

  const handleSetData = (drs: string) => {
    roof.roof_direction = drs;
    handleRoofDetails(roof);
    handleChange(questionIndex+1, { roof_direction: drs }, questionConst[questionIndex + 1].id);
  };

  const handleValidateDrSetData = (cdrs: string) => {
    roof.roof_direction = cdrs;
    handleRoofDetails(roof);
  };

  useEffect(() => {
    if (allRoofs && allRoofs.length > 0) {
      const tmpPolygon: any[] = [];
      for (let index = 0; index < allRoofs.length; index++) {
        const tmpRoof = allRoofs[index];
        if (tmpRoof?.draw_points) {
          const mapData = tmpRoof.draw_points || [];
          const tmp = new window.google.maps.Polygon({
            paths: mapData,
            strokeColor: ColorOfRoof[tmpRoof.index]?.strokeColor || '#0A1E34',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            fillColor: ColorOfRoof[tmpRoof.index]?.fillColor || '#0A1E34',
            //fillOpacity: 0.35,
            editable: false,
            draggable: false,
          });
          tmpPolygon.push(tmp);
        }
      }

      setTimeout(() => {
        setPolygon(tmpPolygon);
        setMapKey((prev) => prev + 1);
      }, 150);
    }
  }, [allRoofs]);

  return (
    <div
      id="abcd"
      className="googledrsmap-size"
      style={{ position: 'relative', width: '100%' }}
    >
      { polygon && (
        <GoogleMap
          id="map"
          onLoad={(map) => {
            const t = map;
            setTimeout(() => {
              for (let index = 0; index < polygon.length; index++) {
                const p = polygon[index];
                setTimeout(() => {
                  p.setMap(t);
                }, 200);
              }
            }, 100);
          }}
          options={{
            clickableIcons: true,
            fullscreenControl: false,
            zoomControl: false,
            scaleControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            draggable: false,
            zoom: zoomed,
            minZoom: 3,
            mapTypeId: 'satellite',
            tilt: 0,
            rotateControl: false,
          }}
          // zoom={42}
          mapTypeId="satellite"
          center={currentPinLocation}
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
          }}
          key={mapKey}
        >
          <div className="comp-ring-wrapper-minimal  direction-img ">
            <Image
          height={160}
          width={160}
              src="/survey/direction-google-map.png"
              alt="dirimage"
              className="line map-direstion-media"
            />
          </div>
          <div className="comp-ring-wrapper comp-bg ">
            <div className="comp-ring">
              <button
                type="button"
                id="roof-direction-n"
                className={`comp-marker north fw-bold fs-4  animate__animated animate__fadeIn  ${
                  roof.roof_direction === 'N' ? 'active-drs' : ''
                }`}
                onClick={() => {
                  handleValidateDrSetData('N');
                  setDirectionValidationOpen(true);
                }}
              >
                N
              </button>
              <button
                type="button"
                id="roof-direction-e"
                className={`comp-marker east fw-bold fs-4 animate__animated animate__fadeIn animate__delay-2s ${
                  roof.roof_direction === 'E' ? 'active-drs' : ''
                }`}
                onClick={() => {
                  handleSetData('E'),
                  ifProcessingComplete();
                }}
              >
                E
              </button>
              <button
                type="button"
                id="roof-direction-s"
                className={`comp-marker south fw-bold fs-4 animate__animated animate__fadeIn animate__delay-4s ${
                  roof.roof_direction === 'S' ? 'active-drs' : ''
                }`}
                onClick={() => {
                  handleSetData('S'),
                  ifProcessingComplete();
                }}
              >
                S
              </button>
              <button
                type="button"
                id="roof-direction-w"
                className={`comp-marker west fw-bold fs-4 animate__animated animate__fadeIn animate__delay-6s ${
                  roof.roof_direction === 'W' ? 'active-drs' : ''
                }`}
                onClick={() => {handleSetData('W'),
                  ifProcessingComplete();
                }}
              >
                W
              </button>
            </div>
            <div className="comp-ring-rot">
              <button
                type="button"
                id="roof-direction-ne"
                className={` comp-marker north-east fw-bold fs-4 animate__animated animate__fadeIn animate__delay-1s ${
                  roof.roof_direction === 'NE' ? 'active-drs' : ''
                }`}
                onClick={() => {
                  handleValidateDrSetData('NE');
                  setDirectionValidationOpen(true);
                }}
              >
                NE
              </button>
              <button
                type="button"
                id="roof-direction-se"
                className={`comp-marker south-east fw-bold fs-4 animate__animated animate__fadeIn animate__delay-3s ${
                  roof.roof_direction === 'SE' ? 'active-drs' : ''
                }`}
                onClick={() => {handleSetData('SE'),
                  ifProcessingComplete();
                }}
              >
                SE
              </button>
              <button
                type="button"
                id="roof-direction-sw"
                className={`comp-marker south-west fw-bold fs-4 animate__animated animate__fadeIn animate__delay-5s ${
                  roof.roof_direction === 'SW' ? 'active-drs' : ''
                }`}
                onClick={() => {handleSetData('SW'),
                  ifProcessingComplete();
                }}
              >
                SW
              </button>
              <button
                type="button"
                id="roof-direction-nw"
                className={`comp-marker north-west fw-bold fs-4 animate__animated animate__fadeIn animate__delay-7s ${
                  roof.roof_direction === 'NW' ? 'active-drs' : ''
                }`}
                onClick={() => {
                  handleValidateDrSetData('NW');
                  setDirectionValidationOpen(true);
                }}
              >
                NW
              </button>
            </div>
          </div>
        </GoogleMap>
      )}
    </div>
  );
};

export default DGMap;
