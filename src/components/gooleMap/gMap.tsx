/* eslint-disable import/no-extraneous-dependencies, no-multi-assign */
import { useEffect, useState } from 'react';

import type { roofDetails } from '@/redux/services/types';
import { getPanelSuggest } from '@/utils/helpers';

import { InfoCircleIcon } from '../theme/icons/infoCircleIcon';
import DrawManagerMap from './DrawManagerMap';
import Image from 'next/image';

export interface GMapProps {
  isLoaded: boolean | undefined;
  handleChange: (d: any, data: any, nextC: any) => void;
  currentPinLocation: any;
  handleRoofDetails: (d: roofDetails) => void;
  roof: roofDetails;
  zoomed: any;
  handleSeletedLocation: (d: any) => void;
  isValideRedraw: boolean;
  setIsValidateRedraw: (d: boolean) => void;
  setNewDraw: (d: any) => void;
  setHelpInfoModalOpen: (d: any) => void;
  setIsHelpPopup: (d: boolean) => void;
  setDisableScroll: (d: boolean) => void;
}

const GMap = (props: GMapProps) => {
  const {
    isLoaded,
    handleChange,
    currentPinLocation,
    handleRoofDetails,
    roof,
    zoomed,
    handleSeletedLocation,
    isValideRedraw,
    setIsValidateRedraw,
    setNewDraw,
    setHelpInfoModalOpen,
    setIsHelpPopup,
    setDisableScroll,
  } = props;

  const [state, setState] = useState({
    polygons: [] as any[],
    drawStatus: 'start',
    mapKey: 0,
    isDrawRoof: false,
    suggestRoofArea: 0,
    suggestPanel: 0,
    isClear: false,
    area: 0,
  });

  const { polygons, drawStatus, mapKey, isDrawRoof, suggestRoofArea, suggestPanel, isClear } = state;

  const overlayCompleteListenerMain = (coordinates: any) => {
    const area = google.maps.geometry.spherical.computeArea(coordinates);


    setState(prevState => {
      const calculatedArea = Number(area.toFixed(2));
      const isValidArea = calculatedArea >= 5 && calculatedArea <= 90;

      return {
        ...prevState,
        area: calculatedArea,
        polygons: coordinates.map(({ lat, lng }) => ({ lat, lng })),
        suggestRoofArea: calculatedArea,
        suggestPanel: getPanelSuggest(calculatedArea),
        drawStatus: isValidArea ? 'done' : 'start',
        isDrawRoof: !isValidArea,
      };
    });



    setTimeout(() => {
      document.getElementById('google-id-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleDeleteRoof = () => {
    setState(prevState => ({
      ...prevState,
      polygons: [],
      isDrawRoof: false,
      drawStatus: 'start',
    }));

    handleRoofDetails({
      ...roof,
      draw_points: null,
      suggested_roof_area: null,
      suggested_panel: null,
      roof_direction: null,
    });

    handleChange(13, {}, 'roof-pitch');
    setState(prevState => ({ ...prevState, mapKey: prevState.mapKey + 1 }));

    setTimeout(() => {
      document.getElementById('google-map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleSelectedRoof = () => {
    if (polygons.length > 0) {
      handleRoofDetails({
        ...roof,
        draw_points: polygons,
        suggested_roof_area: suggestRoofArea,
        suggested_panel: suggestPanel,
      });

      handleChange(14, {}, 'roof-pitch');
      setIsValidateRedraw(false);
      setNewDraw(polygons);
    }
  };

  useEffect(() => {
    document.getElementById('google-map_mobile')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (isValideRedraw) {
      handleDeleteRoof();
    }
  }, [isValideRedraw]);

  return (
    <div className="your-property1" style={{ minHeight: '100vh' }}>
      <span id="google-map" />
      {drawStatus === 'start' ? (
        <>
          <p className="yp mt-1">Click on a corner of your roof to begin</p>
        </>
      ) : drawStatus === 'done' ? (
        <>
          <div className="mt-5">
            <Image
          height={60}
          width={60} src="/survey/job-done.png" alt="job-done" className="img-size" />
          </div>
          <p className="yp mt-1">Job done!</p>
        </>
      ) : null}

      <div className="w-100 d-flex align-items-center" id="google-id-content">
        {isLoaded && (
          <DrawManagerMap
            currentPinLocation={currentPinLocation}
            isLoaded={isLoaded}
            zoomed={zoomed}
            overlayCompleteListenerMain={overlayCompleteListenerMain}
            isClear={isClear}
            // setIsClear={(value: boolean) => setState(prevState => ({ ...prevState, isClear: value }))}
            roof={roof}
            handleClearRoof={handleDeleteRoof}
            handleSelectedRoof={handleSelectedRoof}
            drawStatus={drawStatus}
            handleSeletedLocation={handleSeletedLocation}
            key={mapKey}
          />
        )}
      </div>

      <div className="d-flex align-items-center mt-2 mb-4">
        <button
          type="button"
          className="find-address-btn mt-4 d-flex align-items-center"
          onClick={() => setHelpInfoModalOpen(true)}
        >
          <InfoCircleIcon />{' '}
          <b className="helpText" onClick={() => { setIsHelpPopup(true); setDisableScroll(true); }}>
            Having trouble? We can draw your roof design for you
          </b>
        </button>
      </div>

      {isDrawRoof && (
        <div className="container w-100 desc-media d-flex align-items-center mt-4 p-4">
          <p className="infoDiv">
            Something doesn&apos;t look quite right with what&apos;s been drawn there. It&apos;s either too small to fit a solar panel, or the area is too big. The recommended range is between 5 to 90 square meters.
            <u
              onClick={handleDeleteRoof}
              onKeyUp={handleDeleteRoof}
              role="tab"
              tabIndex={0}
              className="cursor-pointer"
            >
              Please redraw your roof space.
            </u>
          </p>
        </div>
      )}
    </div>
  );
};

export default GMap;
