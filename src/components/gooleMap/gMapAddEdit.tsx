/* eslint-disable import/no-extraneous-dependencies, no-multi-assign, react/no-array-index-key, jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus, no-continue */
import { useEffect, useRef, useState } from 'react';
import type { roofDetails } from '@/redux/services/types';
import { getPanelSuggest } from '@/utils/helpers';
import { InfoCircleIcon } from '../theme/icons/infoCircleIcon';
import DrawManagerMap from './DrawManagerMap';
import { useLoadScript } from '@react-google-maps/api';
import { GOOGLE_API_KEY, libraries } from '@/utils/constants';

export interface GMapAddEditProps {
  isLoaded: boolean | undefined;
  handleChange: (d: any, data: any, nextC: any) => void;
  setSelectedRoof: (d: roofDetails) => void;
  currentPinLocation: any;
  roof: roofDetails;
  allRoofs: roofDetails[];
  handleCancel: (d: any) => void;
  setCloseText: ((d: string) => void) | undefined;
  isEdit: boolean;
  handleClearRoof: () => void;
  zoomed: number;
  setIsValidateRedraw: (d: boolean) => void;
  isValideRedraw: boolean;
  setNewDraw: (d: any) => void;
  isModalPopup: boolean;
  setGenericPopupOpen: (d: boolean) => void;
  setGenericPopupText: (d: any) => void;
  setIsHelpPopup: (d: boolean) => void;
  setDisableScroll: (d: boolean) => void;
}

const GMapAddEdit = ({
  handleChange,
  setSelectedRoof,
  currentPinLocation,
  allRoofs,
  roof,
  handleCancel,
  isEdit,
  handleClearRoof,
  zoomed,
  isValideRedraw,
  setIsValidateRedraw,
  setNewDraw,
  isModalPopup,
  setGenericPopupOpen,
  setGenericPopupText,
  setIsHelpPopup,
  setDisableScroll,
  setCloseText,
}: GMapAddEditProps) => {
  const [drawStatus, setDrawStatus] = useState<'start' | 'done'>('start');
  const [mapKey, setMapKey] = useState(Math.floor(Math.random() * 1000) + 1);
  const [isClear, setIsClear] = useState(!roof.draw_points ? true :false);
  const [isValidDrawRoof, setValidIsDrawRoof] = useState(false);
  const drawnShapes = useRef<{ type: string }[]>([]);
  const drawingManagerRef = useRef<any>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY as string,
    libraries: libraries as any,
  });

  const overlayCompleteListenerMain = (coordinates: google.maps.LatLngLiteral[]) => {
    const tmpNewArr = coordinates.map(({ lat, lng }) => ({ lat, lng }));
    const area = google.maps.geometry.spherical.computeArea(coordinates);

    const calculatedArea = Number(area.toFixed(2));
    if (calculatedArea < 5 || calculatedArea > 90) {
      setValidIsDrawRoof(true);
    } else {
      if (tmpNewArr.length > 0) {
        roof.draw_points = tmpNewArr;
        roof.suggested_roof_area = calculatedArea;
        roof.suggested_panel = getPanelSuggest(calculatedArea);
        setSelectedRoof(roof);
      }
      setDrawStatus('done');
      scrollToElement('google-ids');
    }
  };

  const emptyRoof = {
    id: roof.id,
    index: roof.index,
    draw_points: null,
    roofShading: null,
    roof_pitch: null,
    roof_direction: null,
    suggested_roof_area: null,
    suggested_panel: null,
  };

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = () => {
    setMapKey((prevKey) => prevKey + 1);
    if (roof.draw_points) {
      roof.draw_points = null;
      setSelectedRoof(emptyRoof);
      drawingManagerRef.current = null;
    }
    setDrawStatus('start');
    setValidIsDrawRoof(false);
    setTimeout(() => scrollToElement("google-maps"), 100);
  };

  const handleClear = () => {
    setCloseText?.('Save');
    setMapKey((prevKey) => prevKey + 1);
    setIsClear(true);
    if (roof.draw_points) {
      roof.draw_points = null;
      setSelectedRoof(roof);
      drawingManagerRef.current = null;
    }
    setDrawStatus('start');
    handleClearRoof();
    setValidIsDrawRoof(false);
    setTimeout(() => scrollToElement("google-maps"), 50);
  };

  useEffect(() => {
    if (isValideRedraw) {
      handleDelete();
      handleClear();
      setIsValidateRedraw(false);
    }
  }, [isValideRedraw]);

  const handleSelectedRoof = () => {
    setSelectedRoof(roof);
    handleChange(1, { gMap: true }, 'roof-pitch');
    setNewDraw(roof);
  };

  const handleSeletedLocation = () => { };

  useEffect(() => {
    setGenericPopupText('help you draw your initial roof design');
  }, []);
  useEffect(() => {
    console.log({ roof },allRoofs)
  }, []);

  return (
    <div id="google-maps" className="displayContents your-property" style={{ zIndex: 30 }}>
      {drawStatus === 'start' && (
        <p id="add-edit-modalId" className='questionHeader'>
          Click on a corner of your roof to begin
        </p>
      )}

      {drawStatus === 'done' && (
        <p id="add-edit-modalId" className="yp mt-1">
          Job done!
        </p>
      )}

      <ul>
        {drawnShapes.current.map((shape, index) => (
          <li key={index}>{shape.type}</li>
        ))}
      </ul>

      <div className="mt-0 mb-1 d-flex align-items-center w-96">
        {isLoaded && (
          <DrawManagerMap
            {...{
              handleSeletedLocation,
              currentPinLocation,
              isLoaded,
              zoomed,
              overlayCompleteListenerMain,
              isClear,
              setIsClear,
              allRoofs,
              roof,
              isEdit,
              handleClearRoof: handleDelete,
              drawStatus,
              handleSelectedRoof,
              isModalPopup,
              isValidDrawRoof,
              handleClearEdit: handleClear
            }}
            key={mapKey}
          />
        )}
      </div>

      <div className='HelpPopupAddEdit'>
        <button
          type="button"
          className="find-address-btn mt-4 d-flex align-items-center"
          onClick={() => setGenericPopupOpen(true)}
        >
          <InfoCircleIcon />{' '}
          <b className="helpText" onClick={() => { setIsHelpPopup(true); setDisableScroll(true); }}>
            Having trouble? We can draw your roof design for you
          </b>
        </button>
      </div>

      {!isValidDrawRoof && isEdit && !isClear && (
        <div className="container w-100 d-flex align-items-center infoWrapper">
          <p className="infoDivLessText">
            Click &nbsp;
            <u role="tab" className="cursor-pointer" onClick={handleClear}>
              clear
            </u> &nbsp;
            to re-draw, or &nbsp;
            <u
              role="tab"
              style={{ paddingRight: '5px' }}
              className="cursor-pointer"
              onClick={(e) => {
                handleCancel(e);
                document.body.style.overflow = 'unset';
              }}
            >
              cancel
            </u>
            and go back
          </p>
        </div>
      )}

      {isValidDrawRoof && (
        <div className="container w-100 d-flex align-items-center infoWrapper">
          <p className="infoDiv">
            Something doesn&apos;t look quite right with what&apos;s been drawn there. It&apos;s either too small to fit a solar panel, or the area is too big. The recommended range for a roof area is between 5 to 90.
          </p>
        </div>
      )}
    </div>
  );
};

export default GMapAddEdit;
