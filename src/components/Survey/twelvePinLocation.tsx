import React, { useEffect } from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import Map from '../gooleMap/map';
import { QUESTION } from '@/utils/constants';
import Image from 'next/image';
// import { zapprChatBotOpen } from '@/utils/helpers';
// import {  show } from '@intercom/messenger-js-sdk';


export interface TwelvePinLocationProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  allQuestionsData?: any;
  isLoaded: boolean | undefined;
  currentPinLocation: any;
  setCurrentPinLocation: (d: any) => void;
  setZoomed: (d: any) => void;
  questionNumber: number;
  zoomed: number;
  disableMap: boolean;
  setDisableMap: (d: any) => void;
  setGenericPopupOpen: (d: any) => void;
  setGenericPopupText: (d: any) => void;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  back: boolean;
  setIsHelpPopup: (d: boolean) => void;
  setDisableScroll: (d: boolean) => void;
}

const TwelvePinLocation = (props: TwelvePinLocationProps) => {
  const { isLoaded,
    setCurrentPinLocation,
    currentPinLocation,
    handleChange,
    questionNumber,
    setZoomed,
    zoomed,
    setDisableMap,
    disableMap,
    setGenericPopupText,
    isMobile, setBack, back,
    setIsHelpPopup,
    setDisableScroll, 
    allQuestionsData
  } = props;
  const questionConst = QUESTION
  // const [giveAnswer,] = useState(0);

  const questionIndex = 14; //Change index to 14 from 12

  const onBack = () => {
    setBack(true);
  }

  const getCenterPosition = () => {
    const zoomeds = JSON.parse(localStorage.getItem('findZoom') || '');
    const centerData = JSON.parse(localStorage.getItem('pinCenter') || '');
    setCurrentPinLocation(centerData);
    setZoomed(zoomeds);
  };

  useEffect(() => {
    if (currentPinLocation) {
      localStorage.setItem('pinCenter', JSON.stringify(currentPinLocation));
    }
  }, [currentPinLocation]);

  useEffect(() => {
    setGenericPopupText('help select the right house');
  }, []);

  return (
    <div data-aos={
      isMobile
        ? back
          ? "fade-left"
          : "fade-right"
        : ''
    }
      className={`${styles.surveyContainer} ${styles.surveyContainerMobileTwelve}`} id={`${questionConst[questionIndex].id}`}>
      <div>
        <div className={`${styles.backButtonDiv} mobile-view`} onClick={() => handleChange(questionIndex - 1, {}, questionConst[questionIndex - 1].id)}
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
        <div className={`${styles.questionHeader}`}> {questionConst[questionIndex].qhead} </div>
        <p className={`${styles.questionText}`}>{questionConst[questionIndex].qtxt}</p>
      </div>

      <div>
        <div className='your-property'>



          <div className="w-100 d-flex align-items-center position-relative ">
            <Map
              {...{
                // zoomed: zoomed,
                zoomed: window?.innerWidth < 768 ? 20 : zoomed,
                isLoaded,
                currentPinLocation,
                setCurrentPinLocation,
                questionNumber,
                disableMap,
              }}
            />
            <button
              type="button"
              onClick={() => {
                if(allQuestionsData.solar_system_size){
                  handleChange(questionIndex + 2, { pinLocation: currentPinLocation }, questionConst[questionIndex + 2].id);
                }else{
                  handleChange(questionIndex + 1, { pinLocation: currentPinLocation }, questionConst[questionIndex + 1].id);
                }
                getCenterPosition();
                setDisableMap(true);
              }}
              className={`  ${styles.nextButtonDiv1}`}
            >
              <div className={`${styles.nextButtonTextDark}`}>
                Next
              </div>
            </button>
          </div>
        </div>
        <div className={`${styles.pinLocationBottomDiv}`}>
          <div className={`${styles.backButtonDiv}`} style={{ width: '100%', height: '50px' }} onClick={() => { setIsHelpPopup(true), setDisableScroll(true) }}>
            <div>
              <div>
                <Image quality={100} src="/images/question.svg" width={21} height={24} alt="question" className={`${styles.questionIcon}`} />
              </div>
            </div>
            <div
              onClick={() => {
                // show()
                // zapprChatBotOpen() 
              }}
            >
              <div className={`${styles.pinTextLightResponsive}`}> We can help select your house</div>
              <div className={`${styles.pinTextDarkResponsive}`}> Request Help</div>
            </div>
          </div>
          {/* <div className="align-items-center mt-2 desktop-view">
            <button
              type="button"
              disabled={disableMap}
              onClick={() => {
                handleChange(questionIndex + 1, { pinLocation: currentPinLocation }, questionConst[questionIndex + 1].id);
                getCenterPosition();
                setDisableMap(true);
              }}
              className={styles.nextButtonDiv}
            >
              <div className={`${styles.nextButtonTextDark}`}>
                Next
              </div>
            </button>
          </div> */}
          {/* <div className="align-items-center mt-2 mobile-view">
            <button
              type="button"
              // disabled={disableMap}
              onClick={() => {
                handleChange(questionIndex + 1, { pinLocation: currentPinLocation }, questionConst[questionIndex + 1].id);
                getCenterPosition();
                // setDisableMap(true);
              }}
              className={styles.nextButtonDiv}
            >
              <div className={`${styles.nextButtonTextDark}`}>
                Next
              </div>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default TwelvePinLocation