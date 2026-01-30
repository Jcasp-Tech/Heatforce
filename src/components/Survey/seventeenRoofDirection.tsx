import React from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";

import { QUESTION } from '@/utils/constants';
import { roofDetails } from '@/redux/services/types';
import DGMap from '../gooleMap/mapdirections';

export interface SeventeenRoofDirectionProps {
  isLoaded: boolean | undefined;
  handleChange: (ans: any, data: any, nextC: any) => void;
  roof: roofDetails;
  allRoofs: roofDetails[];
  currentPinLocation: any;
  handleRoofDetails: (data: roofDetails) => void;
  indexNumber?: number | null | undefined;
  zoomed: number;
  setDirectionValidationOpen: (data: boolean) => void;
  isMobile: boolean;
  setGenericPopupOpen: (d: any) => void;
  setGenericPopupText: (d: any) => void;
  setBack: (d: boolean) => void;
  back: boolean;
  isAddEditRoof?: boolean;
  setIsHelpPopup: (d: boolean) => void;
  setDisableScroll: (d: boolean) => void;
  onProcessingComplete?: (data: boolean) => void;
}

const SeventeenRoofDirection = (props: SeventeenRoofDirectionProps) => {
  const { 
    isLoaded,
    roof,
    allRoofs,
    handleChange,
    currentPinLocation,
    handleRoofDetails,
    indexNumber,
    zoomed,
    setDirectionValidationOpen,
    isMobile,
    // setBack,
     back ,
    // isAddEditRoof = false ,
    setIsHelpPopup,
    setDisableScroll,
    onProcessingComplete,
    // setGenericPopupOpen,
    // setGenericPopupText,
   } = props;

  const questionConst = QUESTION

  const questionIndex = 19; //from 17 to 19

  // const onBack = () => {
  //   setBack(true);
  // }

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
        <p className={`${styles.questionText}`}>{questionConst[questionIndex].qtxt}</p>
        

      </div>
      <div>
      <div className="your-property padding0">
      <span id="roof-direction" />
      <span id="roof-direction_mobile" />
      <div className="w-100 mt-2  d-flex flex-column align-items-center">
        <DGMap
          {...{
            setDirectionValidationOpen,
            zoomed,
            isLoaded,
            roof,
            allRoofs,
            handleChange,
            currentPinLocation,
            handleRoofDetails,
            indexNumber,
            onProcessingComplete,
          }}
        />
      <p className={`${styles.skipThisPart}`} onClick={() => {setIsHelpPopup(true),setDisableScroll(true)}}><u>Unsure which way your roof is facing? Let us do it for you</u></p>
      </div>
    </div>
      </div>
      {/* <div className='my-4'>
        {!isAddEditRoof&& (
        <div className={`${styles.backButtonDivSmall} mobile-view`} onClick={() => handleChange(questionIndex - 1, { }, questionConst[questionIndex - 1].id)}
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
      )}
      </div> */}
    </div>
  )
}

export default SeventeenRoofDirection