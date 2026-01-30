import React, { useEffect, useState } from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import InfoDiv from './infoDiv';
import { DEFAULTDATA, QUESTION } from "@/utils/constants";
import Image from 'next/image';


export interface SixEnergyUsageProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  allQuestionsData?: any;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  back: boolean;
}

const SixEnergyUsage = (props: SixEnergyUsageProps) => {
  const { handleChange,isMobile, setBack, back, allQuestionsData } = props;
  const questionConst = QUESTION
  const [giveAnswer, setGiveAnswer] = useState(allQuestionsData?.energy_routine);
  const [isAnswered, setIsAnswered] = useState<Boolean>(allQuestionsData?.energy_routine !== DEFAULTDATA?.energy_routine);

  const questionIndex = 6;

  const onBack = () => {
    setBack(true);
  }

  useEffect(() => {
    if (giveAnswer !== ''&& !isAnswered) {
      if (giveAnswer !== '') {
        handleChange(questionIndex + 1, { energy_routine: giveAnswer }, questionConst[questionIndex+1].id);
      } else {
        handleChange(
          questionIndex-1,
          { occupants: giveAnswer },
          'info-installations'
        );
      }
    }
  }, [giveAnswer, isAnswered]);

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
        {questionConst[questionIndex].opt.map((option : string, index : number) => {
          const isSelected = questionConst[questionIndex].optVal[index] === giveAnswer;
          return (
            <div
              key={index}
              className={`  ${isSelected ? styles.answerButtonDivSelected : `${styles.answerButtonDiv}`}`}
              onClick={() => {setGiveAnswer(questionConst[questionIndex].optVal[index]), setIsAnswered(false)}}
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
      <div>
        <div className={`${styles.backButtonDiv} mobile-view`} onClick={() => handleChange(questionIndex - 1, {}, questionConst[questionIndex-1].id)}
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
      <div className={`${styles.infoWrapper}`}>
        <InfoDiv className={`desktop-font-12px`} content={'If you cannot provide an accurate measurement of energy usage then this will give us guidelines to work with based on the UK average energy use.'} />
      </div>
    </div>
  )
}

export default SixEnergyUsage