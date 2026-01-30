import React from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import stylesSurvey from "../../styles/modulesStyles/survey.module.scss";
import { QUESTION } from '@/utils/constants';
import Image from 'next/image';
import { event, EVENTENUMS } from '../Pixel/facebook/lib/fpixel';
import { useMediaQuery } from '@mui/material';
// import { zapprChatBotOpen } from '@/utils/helpers';
// import {  show } from '@intercom/messenger-js-sdk';


export interface ThirteenDrawAroundRoofProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  back: boolean;
  setIsHelpPopup: (d: boolean) => void;
  setDisableScroll: (d: boolean) => void;
}

const ThirteenDrawAroundRoof = (props: ThirteenDrawAroundRoofProps) => {
  const { handleChange,isMobile, setBack, back,    setIsHelpPopup,
    setDisableScroll, } = props;
  const questionConst = QUESTION

  const questionIndex = 15;

  const onBack = () => {
    setBack(true);
  }
  const isMobileScreen = useMediaQuery('(max-width:992px)')


  return (
    <div data-aos={
      isMobile
        ? back
          ? "fade-left"
          : "fade-right"
        : ''
    }
      className={`${styles.surveyContainer} ${styles.removeExtraPaddingThirteen}`} id={`${questionConst[questionIndex].id}`}>
        <div>
        <div className={`${styles.backButtonDiv} mobile-view backbuttonreducedHeight`} onClick={() => handleChange(questionIndex - 1, { drawAround: '' }, questionConst[questionIndex - 1].id)}
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
        <p className={`${styles.skipThisPart}`} onClick={() => {  
          // show();
          // zapprChatBotOpen()
          setIsHelpPopup(true),
          setDisableScroll(true)}}
          >
            Skip this part and we will design it for you!</p>
      </div>
      <div className={`${styles.roofMapImgParentDiv}`}>
        {isMobileScreen?
        questionConst[questionIndex].opt2.map((option : string, index : number) => {
          return (
            <div
              key={index}
              className={`${styles.roofDrawMapDiv}`}
            > 
            <div className={`${styles.drawMapImgDiv}`}>
              <div className={`${styles.roofDrawMapText}`}>
                {option}
              </div>
              </div>
              <div className={`${styles.drawMapDiv}`}>
                <Image quality={100} className={`${styles.roofDrawMapImg}`} src={questionConst[questionIndex].optVal[index]} alt = 'img' width={250} height={250}/>
              </div>
            </div>
          )
        })
        :questionConst[questionIndex].opt.map((option : string, index : number) => {
          return (
            <div
              key={index}
              className={`${styles.roofDrawMapDiv}`}
            > 
            <div className={`${styles.drawMapImgDiv}`}>
              <div className={`${styles.roofDrawMapText}`}>
                {option}
              </div>
              </div>
              <div className={`${styles.drawMapDiv}`}>
                <Image quality={100} className={`${styles.roofDrawMapImg}`} src={questionConst[questionIndex].optVal[index]} alt = 'img' width={250} height={250}/>
              </div>
            </div>
          )
        })}
      </div>
      <div>


      </div>
      <div className={`${styles.answerDiv} `}>
        <div className={`${styles.drawBottomText}`}>
        Don &apos;t draw all the way around the whole roof, Treat each side of your roof as its own seperate shape to outline
        </div>
        <div>
          {/* <div className='animationBorder rounded-pill z-0'>
            <div className='m1px position-rel z-1 w-100'>
            </div>
          </div> */}
              <button
                type="button"
                onClick={() => {
                  event(EVENTENUMS.customiseProduct);
                  handleChange(questionIndex + 1, { drawAround: 'drawAround' }, questionConst[questionIndex + 1].id);
                }}
                className={`  ${styles.StartDrawButtonDiv}`}
              >
                <div className={`${stylesSurvey.startDrawButtonTxt}`}>
                  Start Drawing
                </div>
              </button>
        </div>
      </div>
    </div>
  )
}
export default ThirteenDrawAroundRoof