import { GoogleMap } from '@react-google-maps/api';
import { memo, useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

import { ColorOfRoof } from '@/utils/AppConfig';
import { isImageUrlValid, updateErrorLogs, uploadBase64FileAPI } from '@/redux/services/general.api';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPointers } from '@/redux/slices/pointers/pointerReducer';

export interface GMapAddEditProps {
  isLoaded: boolean | undefined;
  roof: any;
  allRoofs: any;
  quoteData: any;
  setShowMapPointerToShowMapAfterSavingImage?: any;
}
const calculateCenter = (roofData) => {
  if (!roofData || roofData.length === 0) {
    return null;
  }

  let sumLat = 0;
  let sumLng = 0;
  let totalPoints = 0;

  // Iterate over all roofs and add up the coordinates
  roofData.forEach(roof => {
    if (roof && roof.length > 0) {
      roof.forEach(coordinate => {
        sumLat += coordinate.lat;
        sumLng += coordinate.lng;
        totalPoints++;
      });
    }
  });

  // Calculate average lat and lng
  const avgLat = sumLat / totalPoints;
  const avgLng = sumLng / totalPoints;

  return { lat: avgLat, lng: avgLng };
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const SummaryDisplayMap = (props: GMapAddEditProps) => {
  const { isLoaded, roof, quoteData, setShowMapPointerToShowMapAfterSavingImage } = props;
  console.log("props data",props)

  const googleMapRef = useRef(null);
  const googleMapRef1 = useRef(null);
  const pinLocation = { lat: parseFloat(quoteData?.pinLocation_lat || 51.6199013), lng: parseFloat(quoteData?.pinLocation_lng || -3.9825554) }
  const { mapDrawingModePointer } = useSelector((state: any) => state.Pointer)
  const dispatch = useDispatch()

  const [findZoom, setFindZoom] = useState<any>(parseFloat(quoteData?.findZoom) || 18.5);
  const [centerLocation, setCenterLocation] = useState<any>(pinLocation);

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: false,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.MARKER,
      ],
    },
    polygonOptions: {
      strokeColor: ColorOfRoof[roof.index]?.strokeColor || '#0A1E34',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillColor: ColorOfRoof[roof.index]?.fillColor || '#0A1E34',
      //fillOpacity: 0.35,
      clickable: true,
      editable: true,
      draggable: false,
    },
  });
  const drawingManager1 = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: false,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.MARKER,
      ],
    },
    polygonOptions: {
      strokeColor: ColorOfRoof[roof.index]?.strokeColor || '#0A1E34',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillColor: ColorOfRoof[roof.index]?.fillColor || '#0A1E34',
      //fillOpacity: 0.35,
      clickable: true,
      editable: true,
      draggable: false,
    },
  });
  const base64imgref = useRef<any>(null);
  const apiCalled = useRef(false)
  let handlecapturetimeout: any = useRef(null)

  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 1000;

  const uploadBase64Image = async (image?: any, randomstring?: any, lead_image?: any) => {
    try {

      const data = await uploadBase64FileAPI({ Base64Image: image, randomstring: randomstring, lead_image: lead_image })
      updateErrorLogs({
        module_name: "SummaryDisplayMap",
        record_id: quoteData?.id,
        logs: { "line": "116", "function": "uploadBase64FileAPI" },
      })
      console.log("inside data......", data)
      if (data.path && quoteData.randomstring) {
        quoteData.lead_image = data
      }
      if (setShowMapPointerToShowMapAfterSavingImage) {
        await setShowMapPointerToShowMapAfterSavingImage(true)
      }
      dispatch(setPointers({ mapDrawingModePointer: 'none' }))
      return data;
    } catch (error) {
      console.log("error while uploading image for preview in admin panel", error)
    }
    return null;
  }
  const handleCapture = () => {
    if (handlecapturetimeout.current) clearTimeout(handlecapturetimeout.current);

    handlecapturetimeout.current = setTimeout(() => {
      console.log(`Inside handleCapture timeout`);

      updateErrorLogs({
        module_name: "SummaryDisplayMap",
        record_id: quoteData?.id,
        logs: { "line": "136", "function": "handleCapture" },
      })

      apiCalled.current = false;
      captureWithRetry(MAX_RETRIES);
    }, 800);
  };
  const elementNotFoundRef = useRef(0);
  const captureWithRetry = async (retriesLeft: number) => {
    const element = document.getElementById('googleclonemaptest') as HTMLElement | null;

    console.log(`Inside captureWithRetry start`);

    if (!element) {
      if (elementNotFoundRef.current === 0) {
        elementNotFoundRef.current = 1;
        setIsValidImage(false);
        setCapture(true);
        await delay(2000); // wait 2 seconds
        retriesLeft = 3;
      }
      return retryOrFail("Inside Element not found", retriesLeft);
    }

    try {
      const canvas = await html2canvas(element, {
        onclone: (clonedDoc) => {
          const msg = "Inside DOM cloned for capture"
          console.log(msg, clonedDoc);

          updateErrorLogs({
            module_name: "SummaryDisplayMap",
            record_id: quoteData?.id,
            logs: { "line": "171", "function": "onclone", "msgLog": { msg: msg, clonedDoc: clonedDoc || '' } },
          })

        },
        allowTaint: true,
        useCORS: true,
        logging: true,
        scale: 1,
        backgroundColor: '#ffff',
      });
      console.log(`Inside Canvas captured data`, canvas);
      updateErrorLogs({
        module_name: "SummaryDisplayMap",
        record_id: quoteData?.id,
        logs: { "line": "185", "function": "onclone", "msgLog": { msg: "Inside Canvas captured data", canvas: { width: canvas.width || 0, height: canvas.height || 0 } } },
      })

      // Validate canvas object
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        return retryOrFail("Inside Canvas is invalid or has zero dimensions", retriesLeft);
      }

      const dataURL = canvas.toDataURL('image/png', 1.0);

      // Validate dataURL
      if (!dataURL || dataURL === 'data:,' || dataURL.length < 100) {
        return retryOrFail("Inside Canvas data URL is invalid or empty", retriesLeft);
      }

      // Check if canvas is all white (very basic blank detection)
      const ctx = canvas.getContext('2d');
      const pixelData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
      if (pixelData) {
        let isAllWhite = true;
        for (let i = 0; i < pixelData.length; i += 4 * 100) { // sample every 100th pixel
          if (pixelData[i] !== 255 || pixelData[i + 1] !== 255 || pixelData[i + 2] !== 255) {
            isAllWhite = false;
            break;
          }
        }
        if (isAllWhite) {
          return retryOrFail("Inside Canvas appears blank (all white)", retriesLeft);
        }
      }

      base64imgref.current = dataURL;

      console.log(`Inside Canvas captured successfully`, dataURL);
      setCapture(true);
      if (!apiCalled.current) {
        apiCalled.current = true;
        const uploadBase64ImageData = await uploadBase64Image(dataURL, quoteData.randomstring, quoteData.lead_image);
        if (!uploadBase64ImageData || !uploadBase64ImageData?.path || uploadBase64ImageData == 'Bad response from server') {
          apiCalled.current = false;
          return retryOrFail("Inside uploadBase64Image Failed", retriesLeft, uploadBase64ImageData);
        }
      }

    } catch (err) {
      return retryOrFail("Inside Capture failed", retriesLeft, err);
    }
    console.log(`Inside captureWithRetry end`);
  };


  const retryOrFail = (msg: string, retriesLeft: number, err?: any) => {
    const msgLog = `Inside ${msg}. Retries left: ${retriesLeft}`
    console.warn(msgLog);
    updateErrorLogs({
      module_name: "SummaryDisplayMap",
      record_id: quoteData?.id,
      logs: { "line": "227", "function": "retryOrFail", "msgLog": { msg: msgLog, err: err || '' } },
    })
    if (retriesLeft > 0) {
      setTimeout(() => captureWithRetry(retriesLeft - 1), RETRY_DELAY_MS);
    } else {
      const msgLogElse = `Inside ${msg} after maximum retries.`
      console.error(msgLogElse);
      updateErrorLogs({
        module_name: "SummaryDisplayMap",
        record_id: quoteData?.id,
        logs: { "line": "240", "function": "retryOrFail", "msgLog": { msg: msgLogElse, err: err || '' } },
      })
    }
  };

  useEffect(() => {
    if (quoteData?.roofData && quoteData?.roofData.length > 0) {
      // Determine the zoom level
      const zoom = parseFloat(quoteData?.findZoom) || findZoom;
      setFindZoom(zoom - 1.5); // Subtract 1.5 as per your requirement

      if (!centerLocation) {
        // First check if quoteData contains a pin location
        if (quoteData.pinLocation_lat && quoteData.pinLocation_lng) {
          setCenterLocation({
            lat: parseFloat(quoteData.pinLocation_lat),
            lng: parseFloat(quoteData.pinLocation_lng)
          });
        } else {
          // Use all roofs to calculate the center
          const calculatedCenter = calculateCenter(quoteData?.roofData);
          if (calculatedCenter) {
            setCenterLocation(calculatedCenter);
          }
        }
      }
    }
  }, [quoteData?.roofData]);


  const searchParams = useSearchParams();
  const updateMap = searchParams.get('updatemap');

  const [capture, setCapture] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isValidImage, setIsValidImage] = useState(false);
  const [isValidImageSet, setIsValidImageSet] = useState(false);
  useEffect(() => {
    console.log("handleCaptureImages isValidImageSet ", mapDrawingModePointer, updateMap)
    if (quoteData) {
      if (quoteData?.lead_image?.path && mapDrawingModePointer !== 'edited' && updateMap !== "1") {
        const checkImage = async () => {
          const isValid = await isImageUrlValid(quoteData?.lead_image?.path);
          setIsValidImage(isValid);
          setIsValidImageSet(true);
          console.log("handleCaptureImages checkImage", isValidImageSet)
          // setCapture(true);
        };
        checkImage();
      } else {
        setIsValidImageSet(true);
      }
    }
  }, [quoteData, drawingManager])


  useEffect(() => {
    if (quoteData?.roofData && quoteData?.roofData.length > 0 && isLoaded && drawingManager) {

      if (drawingManager !== undefined) {
        for (let index = 0; index < quoteData?.roofData.length; index++) {
          const tmpRoof = quoteData?.roofData?.[index]?.draw_points;
          if (tmpRoof) {
            const tmpOp = {
              paths: tmpRoof,
              strokeColor: ColorOfRoof[index + 1]?.strokeColor || '#0A1E34',
              strokeOpacity: 0.8,
              strokeWeight: 4,
              fillColor: ColorOfRoof[index + 1]?.fillColor || '#0A1E34',
              //fillOpacity: 0.35,
              editable: false,
              draggable: false,
            }
            const polygon = new window.google.maps.Polygon(tmpOp);
            const polygon1 = new window.google.maps.Polygon(tmpOp);
            setTimeout(() => {
              if (drawingManager) {
                polygon.setMap(drawingManager.getMap());
              }
              if (drawingManager1) {
                polygon1.setMap(drawingManager1.getMap());
              }
            }, 200);
          }
        }
        setMapLoaded(true)
      }
    }
  }, [drawingManager, drawingManager1, findZoom]);

  let t: any;
  const handleCaptureImages = async function () {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(async () => {
      updateErrorLogs({
        module_name: "SummaryDisplayMap",
        record_id: quoteData?.id,
        logs: { "line": "340", "function": "handleCaptureImages", "msgLog": { isValidImageSet, isValidImage, mapDrawingModePointer } },
      })
      console.log("handleCaptureImages 1", isValidImageSet)
      // if (isValidImageSet) {
      if (mapDrawingModePointer === 'edited') {
        console.log("handleCaptureImages 2")
        setIsValidImage(false);
        console.log("handleCaptureImages 3")
        await handleCapture()
        console.log("handleCaptureImages 4")
        return await setShowMapPointerToShowMapAfterSavingImage(true)
      } else if (!isValidImage) {
        console.log("handleCaptureImages 5")
        setIsValidImage(false);
        console.log("handleCaptureImages 6")
        await handleCapture()
        console.log("handleCaptureImages 7")
        return await setShowMapPointerToShowMapAfterSavingImage(true)
      } else {
      }
      return await setShowMapPointerToShowMapAfterSavingImage(true)
      // }
    }, 1500)
    // return () => {
    //   clearTimeout(t)
    // }
  }
  useEffect(() => {
    if (mapLoaded && !capture && drawingManager) {
      // handleCaptureImages();
      updateErrorLogs({
        module_name: "SummaryDisplayMap",
        record_id: quoteData?.id,
        logs: { "line": "371", "function": "handleCaptureImages Before", "msgLog": { mapLoaded, isValidImageSet, drawingManager, capture } },
      })
    }
    return () => {
      clearTimeout(t)
    }
  }, [findZoom, drawingManager, mapLoaded, isValidImage, isValidImageSet]);
  return (
    <div
      id="summary-google-id"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {quoteData?.roofData && quoteData?.roofData.length > 0 &&
        <GoogleMap
          id="googleclonemaptest"
          onLoad={(map) => {
            drawingManager1.setMap(map);
            // handleCaptureImages();
            const listener = map.addListener("idle", async () => {
              updateErrorLogs({
                module_name: "SummaryDisplayMap",
                record_id: quoteData?.id,
                logs: { "line": "185", "function": "onclone idle", "msgLog": { msg: "Map fully rendered - calling capture", "drawingManager1": "googleclonemaptest" } },
              })
              console.log("Map fully rendered - calling capture");
              // Optional: wait for a few frames to stabilize
              await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
              await new Promise((resolve) => setTimeout(resolve, 300)); // short delay buffer
              await handleCaptureImages(); // Now safe to call
              // Remove the listener after first run
              google.maps.event.removeListener(listener);
            });
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
            zoom: findZoom,
            minZoom: 3,
            mapTypeId: 'satellite',
            rotateControl: false,
            tilt: 0,
            gestureHandling: 'none'
          }}
          zoom={20}
          mapTypeId="satellite"
          center={centerLocation}
          mapContainerStyle={{
            width: '428px',
            height: '282px',
            position: 'absolute',
            top: '0',
            left: '0',
            pointerEvents: 'none',
            touchAction: 'none',
            opacity: capture ? "0" : "1",
            zIndex: capture ? "-1" : "1",
          }}
          key={"googleclonemaptest" + findZoom}
          ref={googleMapRef1}
        />
      }

      {quoteData?.roofData && quoteData?.roofData.length > 0 &&
        <GoogleMap
          id="googleclonemap"
          onLoad={(map) => {
            drawingManager.setMap(map);
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
            zoom: findZoom,
            minZoom: 3,
            mapTypeId: 'satellite',
            rotateControl: false,
            tilt: 0,
            gestureHandling: 'none'
          }}
          zoom={20}
          mapTypeId="satellite"
          center={centerLocation}
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            pointerEvents: 'none',
            touchAction: 'none',
            zIndex: "1"
          }}
          key={"googleclonemap" + findZoom}
          ref={googleMapRef}
        />
      }

    </div>
  );
};

export default memo(SummaryDisplayMap);
