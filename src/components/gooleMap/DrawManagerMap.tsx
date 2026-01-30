/* eslint-disable import/no-extraneous-dependencies,   no-multi-assign, react/no-array-index-key, react/no-unused-prop-types, react/jsx-no-useless-fragment, jsx-a11y/no-static-element-interactions */
import { GoogleMap, Marker, Polygon, Polyline } from '@react-google-maps/api';
import $ from 'jquery';
import React, { useEffect, useRef, useState } from 'react';
import styles from "../../styles/modulesStyles/survey.module.scss";

import type { roofDetails } from '@/redux/services/types';
import { ColorOfRoof } from '@/utils/AppConfig';

import { ReloadIcon } from '../theme/icons/reloadIcon';
import Image from 'next/image';

export interface DrawWithMagnifierMapProps {
  isLoaded: boolean | undefined;
  currentPinLocation: any;
  zoomed: any;
  overlayCompleteListenerMain: (coordinates: any) => void;
  roof?: roofDetails;
  allRoofs?: roofDetails[];
  isClear: boolean;
  isEdit?: boolean;
  handleClearRoof: (d: any) => void;
  drawStatus: string;
  handleSelectedRoof: (d: any) => void;
  handleSeletedLocation: (d: any) => void;
  isModalPopup?: boolean;
  isValidDrawRoof?: boolean;
  handleClearEdit?: (d: any) => void;
}

const DrawManagerMap = (props: DrawWithMagnifierMapProps) => {
  const {
    currentPinLocation,
    // isLoaded,
    zoomed,
    overlayCompleteListenerMain,
    allRoofs,
    roof,
    isClear,
    isEdit,
    handleClearRoof,
    drawStatus,
    handleSelectedRoof,
    handleSeletedLocation,
    isModalPopup,
    isValidDrawRoof,
    handleClearEdit,
  } = props;

  const googlemapDiv: any = useRef(null);
  const googleMapRef: any = useRef(null);

  const magnifierContainer: any = useRef(null);
  const magnifier: any = useRef(null);
  const magnifierCrosshair: any = useRef(null);
  const mapCrosshair: any = useRef(null);
  const magnifierContent: any = useRef(null);

  const [mapMarkers, setMapMarkers] = useState<{ lat: number; lng: number }[]>(
    []
  );
  const [cursorPosition, setCursorPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isClearButton, setIsClearButton] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isMobileMagnifier] = useState<boolean>(true);
  const [drawingCompleted, setDrawingCompleted] = useState<boolean>(false);
  const [isCurrentlyDrawing, setIsCurrentlyDrawing] = useState<boolean>(true);

  // Use the throttle function for mouse move events
  let lastCall = 0;
  const throttle = (callback: Function, limit: number) => {
    return function (...args: any) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        callback(...args);
      }
    };
  };

  const handleMouseMoveEventLogic = (mouseX: number, mouseY: number, latLng: google.maps.LatLng) => {
    // Manage cursor position
    // console.log('handleMouseMoveEventLogic', mouseX, mouseY);
    if (isCurrentlyDrawing) {
      setCursorPosition({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });

      if (mapCrosshair.current) {
        mapCrosshair.current.style.left = `${mouseX}px`;
        mapCrosshair.current.style.top = `${mouseY}px`;
      }
      if (mapMarkers.length > 2 && mapMarkers[0]?.lat && mapMarkers[0]?.lng) {
        const clickedPoint = new window.google.maps.LatLng(
          mapMarkers[0].lat,
          mapMarkers[0].lng
        );

        const distance =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            clickedPoint,
            latLng
          );

        if (distance <= 1) {
          mapCrosshair.current.classList.add('poly-complete');
          magnifierCrosshair.current.classList.add('poly-complete');
        } else {
          mapCrosshair.current.classList.remove('poly-complete');
          magnifierCrosshair.current.classList.remove('poly-complete');
        }
      }

      // if (screenWidth >= 768 || isMobileMagnifier) {
      if (screenWidth >= 992 || isMobileMagnifier) {
        const googleMapDiv = googlemapDiv.current;
        if (googleMapDiv) {
          const clonedElement = googleMapDiv.cloneNode(true) as HTMLElement;
          clonedElement.id = 'design-map-clone';
          const MagnifierContent = magnifierContent.current;
          if (MagnifierContent) {
            MagnifierContent.innerHTML = '';
            MagnifierContent.appendChild(clonedElement);

            MagnifierContent.style.height = `${googlemapDiv.current.clientHeight}px`;
            MagnifierContent.style.width = `${googlemapDiv.current.clientWidth}px`;
            MagnifierContent.style.transform = 'scale(1)';
            MagnifierContent.style.left = `${-(mouseX - 65)}px`;
            MagnifierContent.style.top = `${-(mouseY - 65)}px`;

            const gmap: any = $(`.googlemapDiv_${roof?.index}_${isEdit ? 'edit' : 'new'}`)[0];
            const cgmap: any = $(`.magnifier-content_${roof?.index}_${isEdit ? 'edit' : 'new'}`)[0];


            const originalCanvas = gmap.querySelectorAll('canvas');
            const clonedCanvas = cgmap.querySelectorAll('canvas');

            if (originalCanvas.length > 0 && originalCanvas.length === clonedCanvas.length) {
              for (let index = 0; index < originalCanvas.length; index++) {
                const original = originalCanvas[index];
                const cloned = clonedCanvas[index];

                if (original && cloned) {
                  const context = cloned.getContext('2d');
                  if (context) {
                    context.drawImage(original, 0, 0);
                  }
                }
              }
            }

            if (magnifier.current) {
              let xOffset = 50;
              let yOffset = 75;
              if (mouseX <= 150) {
                xOffset = -50;
              }

              if (mouseY <= 150) {
                yOffset = -75;
              }

              // if (screenWidth <= 768) {
              if (screenWidth <= 992) {
                xOffset = 80;
                yOffset = 85;

                if (mouseX <= 100) {
                  xOffset = -80;
                }

                if (mouseY <= 100) {
                  yOffset = -85;
                }
              }

              magnifier.current.style.left = `${mouseX - xOffset}px`;
              magnifier.current.style.top = `${mouseY - yOffset}px`;
              magnifier.current.style.display = 'block';

              // if (screenWidth <= 768 && isMobileMagnifier) {
              if (screenWidth <= 992 && isMobileMagnifier) {
                magnifier.current.style.display = 'none';
              }
            }
          }
        }
      }
    }
  };
  // Wrap the logic with throttle
  const handleMouseMoveEvent = throttle(handleMouseMoveEventLogic, 500); // Adjust the limit as needed


  const handleMapMouseMove = (event: any) => {
    const mouseX: number = event.pixel.x;
    const mouseY: number = event.pixel.y;

    const { latLng } = event;

    // not touchscreen
    if (!window.matchMedia('(pointer: coarse)').matches) {
      handleMouseMoveEvent(mouseX, mouseY, latLng);
    }
  };

  const handleTouchMove = (event: any) => {
    if (isCurrentlyDrawing) {
      // if (screenWidth <= 768 && isMobileMagnifier) {
      if (screenWidth <= 992 && isMobileMagnifier) {
        const touch = event.changedTouches[0];
        const mouseX =
          touch.clientX - event.target.getBoundingClientRect().left;
        const mouseY = touch.clientY - event.target.getBoundingClientRect().top;

        const topRight = googleMapRef.current
          .getProjection()
          .fromLatLngToPoint(googleMapRef.current.getBounds().getNorthEast());
        const bottomLeft = googleMapRef.current
          .getProjection()
          .fromLatLngToPoint(googleMapRef.current.getBounds().getSouthWest());
        const scale = 2 ** googleMapRef.current.getZoom();
        const worldPoint = new google.maps.Point(
          mouseX / scale + bottomLeft.x,
          mouseY / scale + topRight.y
        );
        const latLng = googleMapRef.current
          .getProjection()
          .fromPointToLatLng(worldPoint);

        if (latLng) {
          handleMouseMoveEvent(mouseX, mouseY, latLng);
        }

        magnifier.current.style.display = 'block';
      }
    }
  };

  const handleMouseUpEventLogic = (latLng: any) => {
    const lat = latLng.lat();
    const lng = latLng.lng();
    if (isCurrentlyDrawing) {
      let isValid = true;

      if (mapMarkers.length > 0) {
        const lastLat = mapMarkers.at(-1)?.lat;
        const lastLng = mapMarkers.at(-1)?.lng;
        if (lastLat && lastLng) {
          const clickedPoint = new window.google.maps.LatLng(lastLat, lastLng);

          const distance =
            window.google.maps.geometry.spherical.computeDistanceBetween(
              clickedPoint,
              latLng
            );

          if (distance <= 1) {
            isValid = false;
          }
        }
      }

      if (isValid) {
        if (mapMarkers.length > 2 && mapMarkers[0]?.lat && mapMarkers[0]?.lng) {
          const clickedPoint = new window.google.maps.LatLng(
            mapMarkers[0].lat,
            mapMarkers[0].lng
          );

          const distance =
            window.google.maps.geometry.spherical.computeDistanceBetween(
              clickedPoint,
              latLng
            );
          if (distance <= 1) {
            setMapMarkers([...mapMarkers, mapMarkers[0]]);
            setIsClearButton(true);
            setIsCurrentlyDrawing(false);
            setDrawingCompleted(true);
            overlayCompleteListenerMain(mapMarkers);
            magnifier.current.style.display = 'none';
            mapCrosshair.current.style.display = 'none';
            mapCrosshair.current.classList.remove('poly-complete');
          } else {
            setMapMarkers([...mapMarkers, { lat, lng }]);
            setIsClearButton(true);
          }
        } else {
          setMapMarkers([...mapMarkers, { lat, lng }]);
          setIsClearButton(true);
        }

        // if (screenWidth <= 768 && isMobileMagnifier) {
        if (screenWidth <= 992 && isMobileMagnifier) {
          magnifier.current.style.display = 'none';
        }
      }
    }
  };
  // Wrap the logic with throttle
  const handleMouseUpEvent = throttle(handleMouseUpEventLogic, 500); // Adjust the limit as needed

  const handleMapMouseUp = (event: any) => {
    // not touchscreen
    if (!window.matchMedia('(pointer: coarse)').matches) {
      const mouseX = event.clientX - event.target.getBoundingClientRect().left;
      const mouseY = event.clientY - event.target.getBoundingClientRect().top;

      if (isCurrentlyDrawing) {
        const topRight = googleMapRef.current
          .getProjection()
          .fromLatLngToPoint(googleMapRef.current.getBounds().getNorthEast());
        const bottomLeft = googleMapRef.current
          .getProjection()
          .fromLatLngToPoint(googleMapRef.current.getBounds().getSouthWest());
        const scale = 2 ** googleMapRef.current.getZoom();
        const worldPoint = new google.maps.Point(
          mouseX / scale + bottomLeft.x,
          mouseY / scale + topRight.y
        );
        const latLng = googleMapRef.current
          .getProjection()
          .fromPointToLatLng(worldPoint);

        if (latLng) {
          handleMouseUpEvent(latLng);
        }
      }
    }
  };


  const handleTouchEnd = (event: any) => {
    const touch = event.changedTouches[0];

    const mouseX = touch.clientX - event.target.getBoundingClientRect().left;
    const mouseY = touch.clientY - event.target.getBoundingClientRect().top;

    if (isCurrentlyDrawing) {
      const topRight = googleMapRef.current
        .getProjection()
        .fromLatLngToPoint(googleMapRef.current.getBounds().getNorthEast());
      const bottomLeft = googleMapRef.current
        .getProjection()
        .fromLatLngToPoint(googleMapRef.current.getBounds().getSouthWest());
      const scale = 2 ** googleMapRef.current.getZoom();
      const worldPoint = new google.maps.Point(
        mouseX / scale + bottomLeft.x,
        mouseY / scale + topRight.y
      );
      const latLng = googleMapRef.current
        .getProjection()
        .fromPointToLatLng(worldPoint);

      if (latLng) {
        handleMouseUpEvent(latLng);
      }
    }
  };

  const handleClear = (event: any) => {
    // Clear map markers and reset states
    setMapMarkers([]);
    setCursorPosition(null);
    setIsCurrentlyDrawing(true);
    setDrawingCompleted(false);
    setIsClearButton(false);

    // Reset crosshairs and magnifier display
    if (mapCrosshair.current) {
      mapCrosshair.current.classList.remove('poly-complete');
      mapCrosshair.current.style.display = 'block';
    }

    if (magnifierCrosshair.current) {
      magnifierCrosshair.current.classList.remove('poly-complete');
    }

    if (magnifier.current) {
      magnifier.current.style.display = 'none';
    }

    // Call to handle clearing the roof
    handleClearRoof(event);
  };


  const showCompletedRoofs = () => {
    if (!allRoofs || allRoofs.length === 0) {
      return; // Early return if there are no roofs to show
    }
console.log(allRoofs,"all roofs")
    allRoofs.forEach((tmpRoof) => {
      if (tmpRoof?.draw_points && tmpRoof?.roof_direction) {
        const polygon = new google.maps.Polygon({
          paths: tmpRoof.draw_points,
          zIndex: -100,
          strokeColor: ColorOfRoof[tmpRoof.index]?.strokeColor || '#0A1E34',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          fillColor: ColorOfRoof[tmpRoof.index]?.fillColor || '#0A1E347f',
          editable: false,
          draggable: false,
        });

        polygon.setMap(googleMapRef.current);
      }
    });
  };


  const manageDrawable = () => {
    if (isEdit && !isClear) {
      googleMapRef.current = null; // Clear the map reference
      setIsCurrentlyDrawing(false); // Stop drawing state
    }
  };


  useEffect(() => {
    console.log("isCurrentlyDrawing_isCurrentlyDrawing_", isCurrentlyDrawing)
    if (window?.innerWidth < 768) {
      document.body.style.touchAction = isCurrentlyDrawing ? 'none' : 'auto';
    } else {
      document.body.style.touchAction = 'auto';
    }

    return () => {
      document.body.style.touchAction = 'auto'; // Cleanup on unmount or dependency change
    };
  }, [isCurrentlyDrawing, window?.innerWidth]);

  useEffect(() => {
    const handleResize = throttle(() => {
      setScreenWidth(window.innerWidth);
    }, 100); // Adjust the limit as needed

    setScreenWidth(window.innerWidth); // Initial screen width set
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
    };
  }, []);

  const directionMapping = {
    N: 'North',
    E: 'East',
    S: 'South',
    W: 'West',
  };
  return (
    //surveyContainer
    <div className={`${styles.mapContainer}  ${styles.surveyContainer}`}>
      <div className={`${styles.designToolMap}`} >
        <div
          className={`googlemapDiv ${styles.crsrPointer} ${styles.googlemapSize} googlemapDiv_${roof?.index
            }_${isEdit ? 'edit' : 'new'} googledrsmap-size`}
          style={{ position: 'relative', width: '100%', zIndex: 30 }}
          ref={googlemapDiv}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseUp={handleMapMouseUp}
        >


          {Object.entries(directionMapping).map(([direction, fullName]) => (
            <div key={direction} className={styles[fullName.toLowerCase()]}>
              {['N', 'W'].includes(direction) && (
                <Image height={80} width={80} className={`img-${direction.toLowerCase()}`} src="/images/white_arrow.png" alt="arrow" />
              )}
              <span className={`text-${direction.toLowerCase()}`}>{direction}</span>
              {['E', 'S'].includes(direction) && (
                <Image height={80} width={80} className={`img-${direction.toLowerCase()}`} src="/images/white_arrow.png" alt="arrow" />
              )}
            </div>
          ))}


          {
            (

              <GoogleMap
                onMouseMove={handleMapMouseMove}
                onLoad={(map) => {
                  googleMapRef.current = map;
                  showCompletedRoofs();
                  manageDrawable();
                }}
                zoom={zoomed}
                mapTypeId="satellite"
                center={currentPinLocation}
                options={{
                  clickableIcons: false,
                  fullscreenControl: false,
                  zoomControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  scrollwheel: false,
                  // draggable: false,
                  draggable: true,
                  zoom: zoomed,
                  mapTypeId: 'satellite',
                  rotateControl: false,
                  tilt: 0,
                  gestureHandling: "none",
                }}
                mapContainerStyle={{
                  width: '100%',
                  height: '100%',
                }}
              >
                {mapMarkers.length > 0 &&
                  mapMarkers.map((marker, index) => {
                    const isLastMarker = drawingCompleted && index === mapMarkers.length - 1;
                    return !isLastMarker ? (
                      <Marker
                        key={`marker-${index}`}
                        position={marker}
                        clickable={false}
                        icon={{
                          path: google.maps.SymbolPath.CIRCLE,
                          fillColor: roof ? ColorOfRoof[roof.index]?.fillColor : '#0A1E347f',
                          strokeWeight: 2,
                          strokeColor: roof ? ColorOfRoof[roof.index]?.strokeColor : '#0A1E34',
                          strokeOpacity: 1,
                          scale: 6,
                        }}
                      />
                    ) : null;
                  })}

                {isCurrentlyDrawing && mapMarkers.length > 0 && (
                  <Polyline
                    draggable={false}
                    editable={false}
                    path={cursorPosition ? [...mapMarkers, cursorPosition] : mapMarkers}
                    options={{
                      zIndex: 99999,
                      strokeColor: roof ? ColorOfRoof[roof.index]?.strokeColor : '#0A1E34',
                      strokeOpacity: 1,
                      strokeWeight: 2,
                    }}
                  />
                )}

                {drawingCompleted && mapMarkers.length > 0 && (
                  <Polygon
                    paths={mapMarkers}
                    draggable={false}
                    editable={false}
                    options={{
                      fillColor: roof ? ColorOfRoof[roof.index]?.fillColor : '#0A1E347f',
                      strokeColor: roof ? ColorOfRoof[roof.index]?.strokeColor : '#0A1E34',
                      strokeOpacity: 1,
                      strokeWeight: 2,
                    }}
                  />
                )}
              </GoogleMap>


            )
          }
        </div>

        <div className="magnifier-container" ref={magnifierContainer}>
          <div className="magnifier" ref={magnifier}>
            <div
              className={`magnifier-crosshair crosshair-image index-${roof?.index}`}
              ref={magnifierCrosshair}
            />
            <div
              className={`magnifier-content magnifier-content_${roof?.index}_${isEdit ? 'edit' : 'new'
                }`}
              ref={magnifierContent}
            />
            <div className="magnifier-glass" />
          </div>
          <div
            className={`map-crosshair crosshair-image index-${roof?.index}`}
            ref={mapCrosshair}
          />
        </div>

        <div className="grad-bottom" />

        {!isValidDrawRoof && isEdit && !isClear && (
          <button
            type="button"
            className="clear-button text-xl fw-bold"
            onClick={handleClearEdit}
          >
            Clear
          </button>
        )}

        {isClearButton && (
          <button
            type="button"
            className="clear-button text-xl fw-bold"
            onClick={handleClear}
          >
            <ReloadIcon /> Clear
          </button>
        )}

        {drawStatus === 'done' && (
          <button
            type="button"
            onClick={handleSelectedRoof}
            className="button-format button-absolute "
          >
            Next
          </button>
        )}

        {drawStatus !== 'done' && !isModalPopup && (
          <button
            type="button"
            onClick={(e: any) => {
              handleSeletedLocation(e);
              document.body.style.overflow = 'unset';
              document.body.style.touchAction = 'auto';

            }}
            className="button-format button-absolute"
          >
            {/* <span style={{ marginBottom: '5px' }}> &#8592;</span>  */}
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default DrawManagerMap;
