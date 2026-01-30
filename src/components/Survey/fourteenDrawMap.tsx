import React, { useEffect, useState } from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import { QUESTION } from '@/utils/constants';
import { roofDetails } from '@/redux/services/types';
import { getPanelSuggest } from '@/utils/helpers';
import DrawManagerMap from '../gooleMap/DrawManagerMap';
import Image from 'next/image';


export interface FourteenDrawMapProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  isLoaded: boolean | undefined;
  currentPinLocation: any;
  handleRoofDetails: (d: roofDetails) => void;
  roof: roofDetails;
  zoomed: any;
  handleSeletedLocation: (d: any) => void;
  isValideRedraw: boolean;
  setIsValidateRedraw: (d: boolean) => void;
  setNewDraw: (d: any) => void;
  setHelpInfoModalOpen: (d: any) => void;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  back: boolean;
  setIsHelpPopup: (d: boolean) => void;
  setDisableScroll: (d: boolean) => void;
  allQuestionsData?: any;
}

const FourteenDrawMap = (props: FourteenDrawMapProps) => {
  const { isLoaded,
    handleChange,
    currentPinLocation,
    handleRoofDetails,
    roof,
    zoomed,
    handleSeletedLocation,
    isValideRedraw,
    setIsValidateRedraw,
    setNewDraw,
    isMobile, setBack, back,
    setIsHelpPopup,
    setDisableScroll,
    allQuestionsData,
    // setHelpInfoModalOpen,
  } = props;
  const questionConst = QUESTION
  const [polygons, setPolygons] = useState<any>([]);
  const [drawStatus, setDrawStatus] = useState('start');
  const [mapKey, setMapKey] = useState(0);
  const [isDrawRoof, setIsDrawRoof] = useState(false);
  const [suggestRoofArea, setSuggestRoofArea] = useState(0);
  const [suggestPanel, setSuggestPanel] = useState<any>(0);
  const [isClear, setIsClear] = useState(false);
  const [, setArea] = useState<any>(null);

  const questionIndex = 16;

  const onBack = () => {
    setBack(true);
  }

  const overlayCompleteListenerMain = (coordinates: any) => {
    const area = google.maps.geometry.spherical.computeArea(coordinates);
    setArea(Number(area.toFixed(2)));
    const tmproof = coordinates.map((coord: any) => ({
      lat: coord.lat,
      lng: coord.lng,
    }));

    if (Number(area.toFixed(2)) < 5 || Number(area.toFixed(2)) > 90) {
      setIsDrawRoof(true);
    } else {
      setPolygons(tmproof);

      const tmpArea = Number(area.toFixed(2));
      setSuggestRoofArea(tmpArea);
      setSuggestPanel(getPanelSuggest(tmpArea));
      if (coordinates.length > 0) {
        setDrawStatus('done');
      }
    }

    setTimeout(() => {
      const element = document.getElementById('google-id-content');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleDelete = () => {
    setPolygons(null);
    setIsDrawRoof(false);
    setDrawStatus('start');
    roof.draw_points = null;
    roof.suggested_roof_area = null;
    roof.suggested_panel = null;
    roof.roof_direction = null;
    handleRoofDetails(roof);
    handleChange(questionIndex, {}, 'roof-pitch');
    setMapKey((prevKey) => prevKey + 1);
    // setTimeout(() => {
    //   const element = document.getElementById('google-map');
    //   element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }, 0);
  };

  const handleSelectedRoof = () => {
    if(isMobile)
    {

    if (polygons.length > 0) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        
        roof.draw_points = polygons;
        roof.suggested_roof_area = suggestRoofArea;
        roof.suggested_panel = suggestPanel;
        handleRoofDetails(roof);
        handleChange(questionIndex + 1, {}, questionConst[questionIndex + 1].id);
        setIsValidateRedraw(false);
        setNewDraw(polygons);
      },200)
    }
  }
  else
  {
    if (polygons.length > 0) {
      roof.draw_points = polygons;
      roof.suggested_roof_area = suggestRoofArea;
      roof.suggested_panel = suggestPanel;
      handleRoofDetails(roof);
      handleChange(questionIndex + 1, {}, questionConst[questionIndex + 1].id);
      setIsValidateRedraw(false);
      setNewDraw(polygons);
    }
  }
  };

  useEffect(() => {
    const element = document.getElementById('google-map_mobile');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (isValideRedraw) {
      handleDelete();
    }
  }, [isValideRedraw]);


  return (
    <div data-aos={
      isMobile
        ? back
          ? "fade-left"
          : "fade-right"
        : ''
    }
      className={`${styles.padding0} ${styles.surveyContainer}`} id={`${questionConst[questionIndex].id}`}>
      <div>

        <div className={`${styles.questionHeader}`}> {questionConst[questionIndex].qhead} </div>
        <p className={`${styles.questionText}`}>
          {allQuestionsData.solar_system_size ? questionConst[questionIndex].qtxt1 : questionConst[questionIndex].qtxt }
        </p>
        <p className={`${styles.skipThisPart}`} onClick={() => { setIsHelpPopup(true), setDisableScroll(true) }}>Having trouble? We can draw your roof design for you</p>
      </div>
      <div className={styles.fourteenDrawMapParentDiv} >
        <div className="your-property">
          <span id="google-map" />
          {/* {drawStatus === 'start' && (
        <>
          <div className="md:mt-5" id="google-map_mobile">
            <img
              src="/survey/draw-around.png"
              alt="draw-around"
              className="img-size"
            />
          </div>
        </>
      )} */}

          {drawStatus === 'done' && (
            <>
              {/* <div className="mt-5">
            <img
              src="/survey/job-done.png"
              alt="job-done"
              className="img-size"
            />
          </div> */}

              <p className="yp mt-1">Job done!</p>
            </>
          )}
          <div className="w-100 d-flex align-items-center " id="google-id-content">
            {isLoaded && (
              <DrawManagerMap
                {...{
                  currentPinLocation,
                  isLoaded,
                  zoomed,
                  overlayCompleteListenerMain,
                  isClear,
                  setIsClear,
                  roof,
                  handleClearRoof: handleDelete,
                  handleSelectedRoof,
                  drawStatus,
                  handleSeletedLocation,

                }}
                key={mapKey}
              />
            )}
          </div>

          {drawStatus === 'done' && (
            <>
              {/* <div className="container w-100 desc-media d-flex align-items-center mt-4 p-4 infoWrapper">

            <p className="infoDivLessText">
              Click ‘Next’ if you are happy with the drawing, or &nbsp;
              <u
                onClick={() => {
                  handleDelete();
                  document.body.style.overflow = 'hidden';
                }}
                onKeyUp={handleDelete}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="tab"
                tabIndex={0}
                className="cursor-pointer"
              >
                click here to re-draw
              </u>
              .
            </p>
          </div> */}
            </>
          )}

          {isDrawRoof && (
            <div className="container w-100 desc-media d-flex align-items-center mt-4 p-4 infoWrapper">
              <p className="infoDiv">
                Something doesn&apos;t look quite right with what&apos;s been drawn
                there. It&apos;s either too small to fit a solar panel, or the area
                is too big. The recommended range is between 5 to 90 square meters.
                <u
                  onClick={handleDelete}
                  onKeyUp={handleDelete}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="tab"
                  tabIndex={0}
                  className="cursor-pointer"
                >
                  Please redraw your roof space.
                </u>
                .
              </p>
            </div>
          )}

        </div>
        <div className={`${styles.backButtonDiv} mobile-view`} onClick={() => {
          if (typeof window !== 'undefined') {
            document.body.style.touchAction = 'auto'
          }


          ; handleChange(questionIndex - 1, {}, questionConst[questionIndex - 1].id)
        }}
        >
          <div>
            <div  >
              <Image quality={100} src="/images/backIcon.svg" width={35} height={35} alt="back" className={`${styles.backIcon}`} />
            </div>
          </div>
          <div>
            <div className={`${styles.backButtonTextLight}`}> Made a mistake ?</div>
            <div className={`${styles.backButtonTextDark}`} onClick={onBack}> Go Back</div>
          </div>
        </div>
      </div>

      <div>


      </div>
    </div>
  )
}

export default FourteenDrawMap