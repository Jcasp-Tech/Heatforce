import React, { useEffect, useState } from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import InfoDiv from './infoDiv';
import { DEFAULTDATA, QUESTION } from "@/utils/constants";
import Image from 'next/image';


export interface NineteenWebLeadTypeProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  allQuestionsData: any;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  back: boolean;
}

const NineteenWebLeadType = (props: NineteenWebLeadTypeProps) => {
  const { handleChange, isMobile, setBack, back, allQuestionsData } = props;
  const questionConst = QUESTION
  const [giveAnswer, setGiveAnswer] = useState(allQuestionsData?.web_lead_type);
  const [isAnswered, setIsAnswered] = useState<Boolean>(allQuestionsData?.web_lead_type !== DEFAULTDATA?.web_lead_type);

  const questionIndex = 10;

  const onBack = () => {
    setBack(true);
  }

  const handleBackSpecial = () => {
    if (allQuestionsData.energy_usage !== null && allQuestionsData?.energy_usage !== false) {
      if (allQuestionsData.energy_usage === 1) {

        handleChange(questionIndex - 2, { annual_energy_usage: allQuestionsData.annual_energy_usage }, questionConst[questionIndex - 2].id);
      }
      else {

        handleChange(questionIndex - 1, { energy_usage: allQuestionsData.energy_usage }, questionConst[questionIndex - 1].id)
      }

    }
  }

  useEffect(() => {
    if(!isAnswered){
      if (giveAnswer !== '') {
        if (giveAnswer === 1) {
          handleChange(questionIndex + 2, { web_lead_type: 1 }, questionConst[questionIndex + 2].id);
        } 
        if(giveAnswer === 2) {
          handleChange(
            questionIndex + 1,
            { web_lead_type: giveAnswer },
            questionConst[questionIndex + 1].id
          );
        }
      }
    } 
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

      <div className={`${styles.answerLongDiv3}`}>
        {questionConst[questionIndex].opt.map((option: string, index: number) => {
          const isSelected = questionConst[questionIndex].optVal[index] === giveAnswer;
          return (
            <div
              key={index}
              className={`  ${isSelected ? styles.answerButtonLongDivSelected : `${styles.answerButtonLongDiv}`}`}
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
      <div className={`${styles.backButtonDiv} mobile-view`} onClick={() => { handleBackSpecial(), onBack() }}
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
      <div className={`${styles.infoWrapper}`}>
        <InfoDiv content={'We will ask you to mark out your roof space in the next step.'} />
      </div>
    </div>
  )
}

export default NineteenWebLeadType