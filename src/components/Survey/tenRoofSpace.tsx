import React, { useEffect, useState } from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import InfoDiv from './infoDiv';
import { DEFAULTDATA, QUESTION } from "@/utils/constants";
import Image from 'next/image';
import { zapprChatBotOpen } from '@/utils/helpers';
// import {  show } from '@intercom/messenger-js-sdk';


export interface TenRoofSpacesProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  allQuestionsData: any;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  back: boolean;
  setIsTalkItThrough: (d: boolean) => void;
  setDisableScroll: (d: boolean) => void;
  
}

const TenRoofSpaces = (props: TenRoofSpacesProps) => {
  const { handleChange, isMobile, setBack, back, allQuestionsData,setIsTalkItThrough,
    setDisableScroll, } = props;
  const questionConst = QUESTION
  const [giveAnswer, setGiveAnswer] = useState(allQuestionsData?.roof_space);
  const [isAnswered, setIsAnswered] = useState<Boolean>(allQuestionsData?.roof_space !== DEFAULTDATA?.roof_space);

  const questionIndex = 12; //Changed index 10 to 12

  const handleBackSpecial = () => {
    if (allQuestionsData.web_lead_type !== null && allQuestionsData?.web_lead_type !== "") {
      if(allQuestionsData.web_lead_type ===1)
      {

        handleChange(questionIndex - 2, { web_lead_type: allQuestionsData.web_lead_type }, questionConst[questionIndex - 2].id);
      }
      else{

        handleChange(questionIndex - 1, { web_lead_type: allQuestionsData.web_lead_type }, questionConst[questionIndex - 1].id)
      }
  
    }
  } 
  const imgPaths = [
    '/images/oneroof.webp',
    '/images/tworoof.webp',
    '/images/threeroof.webp',
  ]

  const onBack = () => {
    setBack(true);
  }

  useEffect(() => {
    if(!isAnswered){if (giveAnswer !== 0 && giveAnswer !== 4) {
      handleChange(questionIndex + 1, { roof_space: giveAnswer }, questionConst[questionIndex + 1].id);
    }}
  }, [isAnswered,giveAnswer]);

  return (
    <div data-aos={
      isMobile
        ? back
          ? "fade-left"
          : "fade-right"
        : ''
    }
      className={`${styles.surveyContainer}`} id={`${questionConst[questionIndex].id}`}>
      <div>
        <div className={`${styles.questionHeader}`}> {questionConst[questionIndex].qhead} </div>
        <p className={`${styles.questionText}`}>{questionConst[questionIndex].qtxt}</p>
      </div>

      <div className={`${styles.answerDiv3}`}>
        {questionConst[questionIndex].opt.map((option: string, index: number) => {
          const isSelected = questionConst[questionIndex].optVal[index] === giveAnswer;
          return (
            <div
              key={index}
              className={` ${isSelected ? styles.answerButtonDivSelected : `${styles.answerButtonDiv}`}`}
              style={{ justifyContent: 'space-between' }}
              onClick={() => { setGiveAnswer(questionConst[questionIndex].optVal[index]), setIsAnswered(false) }}
            >
              <div className='d-flex' style={{ justifyContent: 'flex-start', columnGap: '10px', alignItems: 'center' }}>
                <div className={isSelected ? styles.circleButtonSelected : `${styles.circleButton}`}></div>
                <div className={`${styles.answerText}`}>
                  {option}
                </div>
              </div>
              <div>
                <Image quality={100} src={imgPaths[index] as string} width={55} height={150} alt="back" className={`${styles.roofImageSurvey}`} />
              </div>
            </div>
          )
        })}
      </div >
      <div className={`${styles.HelpAndBackDiv}`}>
        <div className={`${styles.backButtonDiv} mobile-view`} onClick={() => {handleBackSpecial(),onBack()}}
        >
          <div>
            <div  >
              <Image quality={100} src="/images/backIcon.svg" width={35} height={35} alt="back" className={`${styles.backIcon}`} />
            </div>
          </div>
          <div>
            <div className={`${styles.backButtonTextLight}`}> Made a mistake ?</div>
            <div className={`${styles.backButtonTextDark}`}> Go Back</div>
          </div>
        </div>

        <div className={`${styles.backButtonDiv}`} onClick={() => {setIsTalkItThrough(true),setDisableScroll(true) }}
          style={isMobile ? { flexDirection: 'row-reverse', textAlign: 'right' } : undefined}
        >
          <div>
            <div>
              <Image quality={100} src="/images/question.svg" width={21} height={24} alt="quesion" className={`${styles.questionIcon}`} />
            </div>
          </div>
          <div 
          onClick={()=>{ 
            // show();
            zapprChatBotOpen();
          }}
          >
            <div className={`${styles.backButtonTextLight}`}> Unsure ?</div>
            <div className={`${styles.backButtonTextDark}`}> Request Help</div>
          </div>
        </div>

      </div>
      <div className={`${styles.infoWrapper}`}>
        <InfoDiv content={'We will ask you to mark out your roof space in the next step.'} />
      </div>
    </div>
  )
}

export default TenRoofSpaces