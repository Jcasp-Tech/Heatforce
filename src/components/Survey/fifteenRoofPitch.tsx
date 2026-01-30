import React, { useEffect, useState } from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import InfoDiv from './infoDiv';
import { DEFAULTDATA, QUESTION } from "@/utils/constants";
import Image from 'next/image';


export interface FifteenRoofPitchProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  allQuestionsData?: any;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  back: boolean;
  isAddEditRoof?: boolean;
}

const FifteenRoofPitch = (props: FifteenRoofPitchProps) => {
  const { handleChange, isMobile, setBack, back = true, isAddEditRoof = false, allQuestionsData } = props;
  const questionConst = QUESTION
  const [giveAnswer, setGiveAnswer] = useState<string>(allQuestionsData?.roof_pitch);
  const [isAnswered, setIsAnswered] = useState<Boolean>(allQuestionsData?.roof_pitch !== DEFAULTDATA?.roof_pitch);

  const questionIndex = 17; //change index to 17 from 15

  const onBack = () => {
    setBack(true);
  }

  useEffect(() => {
    if(!isAnswered){if (giveAnswer !== '') {
      handleChange(questionIndex + 1, { roof_pitch: giveAnswer }, questionConst[questionIndex + 1].id);
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

      <div className={`${styles.answerDiv}`}>
        {questionConst[questionIndex].opt.map((option: string, index: number) => {
          const isSelected = questionConst[questionIndex].optVal[index] === giveAnswer;
          return (
            <div
              key={index}
              className={`  ${isSelected ? styles.answerButtonDivSelected : `${styles.answerButtonDiv}`}`}
              onClick={() => { setGiveAnswer(questionConst[questionIndex].optVal[index]), setIsAnswered(false) }}
            >
              <div className={isSelected ? styles.circleButtonSelected : `${styles.circleButton}`}></div>
              <div className={`${styles.textWrapper}`}>
                <div className={`${styles.answerText}`}>
                  {option}
                </div>
              </div>
            </div>
          )
        })}
      </div >
      <div className='my-4'>
        {!isAddEditRoof && (
          <div className={`${styles.backButtonDivSmall} mobile-view `} onClick={() => handleChange(questionIndex - 1, { }, questionConst[questionIndex - 1].id)}
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
      </div>
      <div className={`${styles.infoWrapper}`}>
        <InfoDiv content={'This helps us determine scaffolding and access requirements, which are all included in your estimate'} />
      </div>
    </div>
  )
}

export default FifteenRoofPitch