/* eslint-disable import/no-extraneous-dependencies, no-multi-assign , func-names */
import { GoogleMap, Marker, Polygon, Polyline } from '@react-google-maps/api';
import $ from 'jquery';
import React, { useEffect, useRef, useState } from 'react';

import useWindowDimensions from '@/customhook/UseWindowDimension';
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
}

const DrawWithMagnifierMap = (props: DrawWithMagnifierMapProps) => {
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
  } = props;

  const designTool: any = useRef(null);
  const googlemapDiv: any = useRef(null);
  const googleMapRef: any = useRef(null);
  const magnifierContainer: any = useRef(null);
  const magnifier: any = useRef(null);
  const magnifierCrosshair: any = useRef(null);
  const mapCrosshair: any = useRef(null);
  const magnifierContent: any = useRef(null);

  const [mapFirstClickPosition, setMapFirstClickPosition] = useState<number>(0);
  const [mapFirstClickPositionY, setMapFirstClickPositionY] =
    useState<number>(0);
  const [mapClickedCount, setMapClickedCount] = useState<number>(0);
  const [drawingCompleted, setDrawingCompleted] = useState<boolean>(false);
  const [currentXCursorPosition, setCurrentXCursorPosition] =
    useState<number>(0);
  const [currentYCursorPosition, setCurrentYCursorPosition] =
    useState<number>(0);
  const [isNearByXCursorPosition, setIsNearByXCursorPosition] =
    useState<boolean>(false);
  const [, setIsMouseMoving] = useState<boolean>(false);

  const { width } = useWindowDimensions();

  // const [isMobileDevice, setIsMobileDevice] = useState<boolean>(width <= 768);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(width <= 992);

  const [isCurrentlyDrawing, setIsCurrentlyDrawing] = useState<boolean>(true);
  const [latlng, setlatlng] = useState<Array<any>>([]);
  const [movinglatlng, setmovinglatlng] = useState<any>([]);

  const [isClearButton, setIsClearButton] = useState(false);

  const overlayCompleteListener = () => {
    setIsClearButton(false);
    setIsCurrentlyDrawing(false);
    setMapFirstClickPosition(0);
    overlayCompleteListenerMain(latlng);
  };

  const handleMapClick = (e: any) => {
    const mouseX = e.pixel.x;
    const mouseY = e.pixel.y;

    if (mapFirstClickPosition === 0) {
      setMapFirstClickPosition(mouseX);
    }

    if (mapFirstClickPositionY === 0) {
      setMapFirstClickPositionY(mouseY);
    }

    setMapClickedCount((prev) => prev + 1);
    mapCrosshair.current.style.display = 'none';
  };

  const handleMouseMove = (event: any) => {
    setIsMouseMoving(true);
    mapCrosshair.current.style.display = 'block';
    const mouseX = event.pixel.x;
    const mouseY = event.pixel.y;
    if (mapClickedCount >= 0) {
      setCurrentXCursorPosition(mouseX);
      setCurrentYCursorPosition(mouseY);
    }
  };

  // const handleTouchStart = (e: any) => {
  //   const targetRect = e.currentTarget.getBoundingClientRect();
  //   const touch = e.touches[0];

  //   const mouseX = touch.clientX - targetRect.left;
  //   const mouseY = touch.clientY - targetRect.top;

  //   setCurrentXCursorPosition(mouseX);
  //   setCurrentYCursorPosition(mouseY);

  //   setMapFirstClickPosition((prev: number) => {
  //     if (prev === 0) {
  //       return mouseX;
  //     }
  //     return prev;
  //   });

  //   setMapFirstClickPositionY((prev: number) => {
  //     if (prev === 0) {
  //       return mouseY;
  //     }
  //     return prev;
  //   });

  //   setMapClickedCount((prev: number) => {
  //     return prev + 1;
  //   });
  //   // setTouchPosition({ x: touch.clientX, y: touch.clientY });
  // };

  const handleTouchMove = (e: any) => {
    setIsMouseMoving(true);
    const targetRect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];

    const mouseX = touch.clientX - targetRect.left;
    const mouseY = touch.clientY - targetRect.top;
    setCurrentXCursorPosition(mouseX);
    setCurrentYCursorPosition(mouseY);
  };

  // const handleTouchStartCapture = () => {
  //   if (magnifier.current) {
  //     const ele = magnifier.current;
  //     ele.classList.remove('d-none');
  //   }
  // };

  // const handleTouchEndCapture = () => {
  //   if (magnifier.current) {
  //     const ele = magnifier.current;
  //     ele.classList.add('d-none');
  //   }
  // };

  const handleMapMouseUp = (e: any) => {
    setIsMouseMoving(false);
    mapCrosshair.current.style.display = 'none';
    let isDisplay = false;
    if (isEdit) {
      if (isClear) {
        isDisplay = true;
      }
    } else {
      isDisplay = true;
    }

    if (isDisplay && !drawingCompleted) {
      setIsClearButton(true);
      const Lat: any = e.latLng?.lat();
      const Lng: any = e.latLng?.lng();
      setlatlng([...latlng, { lat: Lat, lng: Lng }]);
      setmovinglatlng(null);
    } else {
      setIsClearButton(false);
    }
  };

  useEffect(() => {
    if (roof && roof?.index) {
      const polyline = new google.maps.Polyline({
        path: latlng,
        strokeColor: ColorOfRoof[roof?.index]?.strokeColor || '#0A1E34',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        zIndex: -99999,
      });
      polyline.setMap(googleMapRef.current);
      google.maps.event.addListener(polyline, 'mouseup', function (e: any) {
        if (!drawingCompleted) {
          // if (isNearByXCursorPosition) {
          //   setDrawingCompleted(true);
          // }
          setMapClickedCount((prev: number) => {
            return prev + 1;
          });

          handleMapMouseUp(e);
        }
      });

      google.maps.event.addListener(polyline, 'mousemove', function (e: any) {
        if (!drawingCompleted) {
          const Lat: any = e.latLng?.lat();
          const Lng: any = e.latLng?.lng();
          // setlatlng((prev: any) => {
          //   return [
          //     ...prev.slice(0, prev.length - 1),
          //     { lat: Lat, lng: Lng },
          //   ];
          // });
          setmovinglatlng({ lat: Lat, lng: Lng });
        }
      });
    }
  }, [latlng]);

  useEffect(() => {
    if (drawingCompleted) {
      overlayCompleteListener();

      document.body.style.overflow = 'unset';

      if (mapCrosshair.current) {
        mapCrosshair.current.classList.add('d-none');
      }
    }
  }, [drawingCompleted]);

  useEffect(() => {
    // setIsMobileDevice(width <= 768);
    setIsMobileDevice(width <= 992);
  }, []);

  useEffect(() => {
    if (!mapFirstClickPosition) {
      return;
    }
    const clonedElement = googlemapDiv.current.cloneNode(true);
    clonedElement.id = 'design-map-clone';
    const MagnifierContent = magnifierContent.current;
    MagnifierContent.innerHTML = '';
    MagnifierContent.appendChild(clonedElement);

    MagnifierContent.style.height = `${googlemapDiv.current.clientHeight}px`;
    MagnifierContent.style.width = `${googlemapDiv.current.clientWidth}px`;
    MagnifierContent.style.transform = 'scale(1)';
    MagnifierContent.style.left = `${-(currentXCursorPosition - 75)}px`;
    MagnifierContent.style.top = `${-(currentYCursorPosition - 75)}px`;

    const gmap: any = $(
      `.googlemapDiv_${roof?.index}_${isEdit ? 'edit' : 'new'}`
    )[0];
    const cgmap: any = $(
      `.magnifier-content_${roof?.index}_${isEdit ? 'edit' : 'new'}`
    )[0];
    const originalCanvas = gmap.querySelectorAll('canvas');
    const clonedCanvas = cgmap.querySelectorAll('canvas');

    if (
      originalCanvas.length > 0 &&
      originalCanvas.length === clonedCanvas.length
    ) {
      for (let index = 0; index < originalCanvas.length; index++) {
        clonedCanvas[index]
          .getContext('2d')
          .drawImage(originalCanvas[index], 0, 0);
      }
    }

    if (mapFirstClickPosition > 0 && mapClickedCount > 2) {
      const isNearby = !!(
        mapFirstClickPosition > currentXCursorPosition - 10 &&
        mapFirstClickPosition < currentXCursorPosition + 10 &&
        mapFirstClickPositionY > currentYCursorPosition - 10 &&
        mapFirstClickPositionY < currentYCursorPosition + 10
      );

      setIsNearByXCursorPosition(isNearby);
    }

    // const width = window.innerWidth;
    const ele = magnifier.current;

    if (ele) {
      let xOffset = 50;
      let yOffset = 75;

      // if (width <= 768) {
      if (width <= 992) {
        xOffset = 80;
        yOffset = 85;
      }
      ele.style.left = `${currentXCursorPosition - xOffset}px`;
      ele.style.top = `${currentYCursorPosition - yOffset}px`;

      if (mapFirstClickPosition === 0 || drawingCompleted) {
        ele.classList.add('d-none');
      } else {
        ele.style.display = 'block';
      }

      if (isEdit && !drawingCompleted) {
        if (isClear) {
          ele.classList.remove('d-none');
          ele.style.display = 'block';
        } else {
          ele.classList.add('d-none');
          ele.style.display = 'none';
        }
      }
    }
  }, [
    mapFirstClickPosition,
    currentXCursorPosition,
    currentYCursorPosition,
    mapClickedCount,
    drawingCompleted,
  ]);

  useEffect(() => {
    if (magnifierCrosshair.current) {
      const ele = magnifierCrosshair.current;
      if (isNearByXCursorPosition) {
        ele.classList.add('poly-complete');
      } else {
        ele.classList.remove('poly-complete');
      }
    }
  }, [isNearByXCursorPosition]);

  useEffect(() => {
    const ele = magnifierContainer.current;
    if (ele) {
      ele.style.left = `${currentXCursorPosition}px`;
      ele.style.top = `${currentYCursorPosition}px`;
    }
  }, [magnifierContainer, currentXCursorPosition]);

  useEffect(() => {
    const ele = mapCrosshair.current;
    if (ele) {
      ele.style.left = `${currentXCursorPosition}px`;
      ele.style.top = `${currentYCursorPosition}px`;

      if (isNearByXCursorPosition) {
        ele.classList.add('poly-complete');
      } else {
        ele.classList.remove('poly-complete');
      }

      if (isCurrentlyDrawing) {
        ele.classList.add('crosshair-image');
      } else {
        ele.classList.remove('crosshair-image');
      }

      if (drawingCompleted) {
        ele.classList.add('d-none');
      } else {
        ele.classList.remove('d-none');
      }
    }
  }, [mapCrosshair, currentXCursorPosition]);

  useEffect(() => {
    if (isEdit) {
      magnifier.current.style.display = 'none';
      if (isClear) {
        mapCrosshair.current.style.display = 'block';
      } else {
        mapCrosshair.current.style.display = 'none';
      }
    }
  }, [isEdit, isClear]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (mapCrosshair.current) {
      mapCrosshair.current.classList.remove('d-none');
    }
  }, []);

  return (
    <div className="design-tool" ref={designTool}>
      <div
        ref={googlemapDiv}
        className={`googlemapDiv crsrPointer googlemap-size googlemapDiv_${roof?.index
          }_${isEdit ? 'edit' : 'new'}`}
        style={{ position: 'relative', width: '100%', zIndex: 30 }}
        onTouchMove={handleTouchMove}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            pointerEvents: 'none',
            top: '0%',
            left: '50%',
            transform: 'translate(-50%)',
            zIndex: 10,
            paddingTop: '10px',
          }}
        >
          <Image
          height={60}
          width={60}
            className="img-n"
            src="/images/white_arrow.png"
            alt="arrow"
            style={{ zIndex: 20, transform: 'rotate(-90deg)' }}
          />
          <span className="text-n">N</span>
        </div>
        <div
          className="tabvisible"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
            pointerEvents: 'none',
            top: '50%',
            right: '0%',
            transform: 'translate(-0%,-50%)',
            zIndex: 10,
            paddingRight: '10px',
          }}
        >
          <span className="text-e">E</span>
          <Image
          height={60}
          width={60}
            className="img-e"
            src="/images/white_arrow.png"
            alt="arrow"
            style={{ zIndex: 20, transform: 'rotate(0deg)' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'start',
            alignItems: 'center',
            position: 'absolute',
            pointerEvents: 'none',
            left: '50%',
            bottom: '0%',
            transform: 'translate(-50%)',
            zIndex: 10,
            paddingBottom: '10px',
          }}
        >
          <Image
          height={60}
          width={60}
            className="img-s"
            src="/images/white_arrow.png"
            alt="arrow"
            style={{ zIndex: 20, transform: 'rotate(90deg)' }}
          />

          <span className="text-s">S</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            position: 'absolute',
            pointerEvents: 'none',
            left: '0%',
            top: '50%',
            transform: 'translate(-0%,-50%)',
            zIndex: 10,
            paddingLeft: '10px',
          }}
        >
          <Image
          height={60}
          width={60}
            className="img-w"
            src="/images/white_arrow.png"
            alt="arrow"
            style={{ transform: 'rotate(180deg)' }}
          />

          <span className="text-w">w</span>
        </div>

        {(
          <GoogleMap
            onMouseUp={(e: any) => {
              if (!drawingCompleted) {
                handleMapClick(e);
                if (isEdit && isClear) {
                  handleMapMouseUp(e);
                } else if (!isEdit) {
                  handleMapMouseUp(e);
                }
              }
            }}
            onMouseMove={(e: any) => {
              if (!drawingCompleted) {
                if (isEdit) {
                  if (isClear) {
                    handleMouseMove(e);
                    const Lat: any = e.latLng?.lat();
                    const Lng: any = e.latLng?.lng();
                    setmovinglatlng({ lat: Lat, lng: Lng });
                  }
                } else {
                  handleMouseMove(e);

                  const Lat: any = e.latLng?.lat();
                  const Lng: any = e.latLng?.lng();
                  setmovinglatlng({ lat: Lat, lng: Lng });
                }
              }
            }}
            onLoad={(map) => {
              googleMapRef.current = map;
              if (map) {
                if (allRoofs && allRoofs.length > 0) {
                  for (let index = 0; index < allRoofs.length; index++) {
                    const tmpRoof = allRoofs[index];
                    if (tmpRoof?.draw_points) {
                      const polygon = new google.maps.Polygon({
                        paths: tmpRoof.draw_points,
                        zIndex: -100,
                        strokeColor:
                          ColorOfRoof[tmpRoof.index]?.strokeColor || '#0A1E34',
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                        fillColor:
                          ColorOfRoof[tmpRoof.index]?.fillColor || '#0A1E347f',
                        //fillOpacity: 0.51,
                        editable: false,
                        draggable: false,
                      });

                      polygon.setMap(map);
                    }
                  }
                }
              }
            }}
            zoom={zoomed}
            mapTypeId="satellite"
            center={currentPinLocation}
            mapContainerStyle={{
              width: '100%',
              height: '100%',
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
              zoom: zoomed,
              mapTypeId: 'satellite',
              rotateControl: false,
              tilt: 0,
            }}
          >
            {latlng.length > 0 &&
              latlng.map((data: any, i: number) => {
                return i === 0 ? (
                  <Marker
                    clickable={mapClickedCount > 2}
                    onMouseOut={() => {
                      setIsNearByXCursorPosition(false);
                    }}
                    onMouseOver={() => {
                      if (mapClickedCount >= 3) {
                        setIsNearByXCursorPosition(true);
                      }
                    }}
                    onClick={() => {
                      if (mapClickedCount >= 3) {
                        setDrawingCompleted(true);
                      }
                    }}
                    key={`draw${i + 1}`}
                    position={data}
                    zIndex={9999999}
                    icon={{
                      path: 'M -0.4 -26 C -14.5158 -26 -26 -14.5158 -26 -0.4 s 11.4842 25.6 25.6 25.6 s 25.6 -11.4842 25.6 -25.6 S 13.7158 -26 0 -26 z M -0.4 22.64 C -13.1249 22.64 -23.44 12.3249 -23.44 -0.4 S -13.1249 -23.44 -0.4 -23.44 S 22.64 -13.1249 22.64 -0.4 S 12.3249 22.64 -0.4 22.64 z',
                      fillColor: roof
                        ? ColorOfRoof[roof.index]?.fillColor
                        : '#0F3B59',
                      //fillOpacity: 10,

                      strokeWeight: 2,
                      strokeColor: roof
                        ? ColorOfRoof[roof.index]?.strokeColor
                        : '#0F3B59',
                      strokeOpacity: 0.8,
                      scale: 0.3,
                    }}
                  />
                ) : (
                  <Marker
                    clickable={false}
                    onMouseOut={() => {
                      setIsNearByXCursorPosition(false);
                    }}
                    onMouseOver={() => {
                      if (mapClickedCount >= 3) {
                        setIsNearByXCursorPosition(true);
                      }
                    }}
                    onClick={() => {
                      if (mapClickedCount >= 3) {
                        setDrawingCompleted(true);
                      }
                    }}
                    key={`draw${i + 1}`}
                    position={data}
                    zIndex={9999999}
                    icon={{
                      path: 'M -0.4 -26 C -14.5158 -26 -26 -14.5158 -26 -0.4 s 11.4842 25.6 25.6 25.6 s 25.6 -11.4842 25.6 -25.6 S 13.7158 -26 0 -26 z M -0.4 22.64 C -13.1249 22.64 -23.44 12.3249 -23.44 -0.4 S -13.1249 -23.44 -0.4 -23.44 S 22.64 -13.1249 22.64 -0.4 S 12.3249 22.64 -0.4 22.64 z',
                      fillColor: roof
                        ? ColorOfRoof[roof.index]?.fillColor
                        : '#0A1E347f',
                      //fillOpacity: 10,

                      strokeWeight: 2,
                      strokeColor: roof
                        ? ColorOfRoof[roof.index]?.strokeColor
                        : '#0A1E34',
                      strokeOpacity: 0.8,
                      scale: 0.3,
                    }}
                  />
                );
              })}

            {!drawingCompleted && latlng.length > 0 ? (
              latlng.length > 0 && (
                <Polyline
                  draggable={false}
                  editable={false}
                  visible={!drawingCompleted}
                  onMouseMove={() => {
                    // handleMouseMove(e);
                    // if (!drawingCompleted) {
                    //   const Lat: any = e.latLng?.lat();
                    //   const Lng: any = e.latLng?.lng();
                    // // setlatlng((prev: any) => {
                    // //   return [
                    // //     ...prev.slice(0, prev.length - 1),
                    // //     { lat: Lat, lng: Lng },
                    // //   ];
                    // // });
                    //   //setmovinglatlng({ lat: Lat, lng: Lng });
                    // }
                  }}
                  onMouseUp={(e: any) => {
                    if (!drawingCompleted) {
                      if (isNearByXCursorPosition) {
                        setDrawingCompleted(true);
                      } else {
                        setMapClickedCount((prev: number) => {
                          return prev + 1;
                        });

                        handleMapMouseUp(e);
                      }
                    }
                  }}
                  path={[latlng[latlng.length - 1], movinglatlng]}
                  options={{
                    zIndex: 99999,
                    strokeColor: roof
                      ? ColorOfRoof[roof.index]?.strokeColor
                      : '#0A1E34',
                    strokeOpacity: 1,
                    strokeWeight: 2,
                  }}
                />
              )
            ) : (
              <Polygon
                paths={latlng}
                draggable={false}
                editable={false}
                options={{
                  fillColor: roof
                    ? ColorOfRoof[roof.index]?.fillColor
                    : '#0A1E347f',
                  //fillOpacity: 0.51,
                  strokeColor: roof
                    ? ColorOfRoof[roof.index]?.strokeColor
                    : '#0A1E34',
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        )}
      </div>

      <div
        className={`magnifier-container ${isMobileDevice ? 'is_mobile' : 'is_desktop'
          }`}
        ref={magnifierContainer}
      >
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
          className={`map-crosshair index-${roof?.index}`}
          ref={mapCrosshair}
        />
      </div>

      <div className="grad-bottom" />

      {isClearButton && (
        <button
          type="button"
          className="clear-button text-xl fw-bold"
          onClick={handleClearRoof}
        >
          {' '}
          <ReloadIcon /> Clear
        </button>
      )}
    </div>
  );
};

export default DrawWithMagnifierMap;
