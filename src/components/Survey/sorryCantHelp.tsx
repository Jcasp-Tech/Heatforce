import React from 'react'
import { QUESTION } from "@/utils/constants";
import styles from "../../styles/modulesStyles/survey.module.scss";
import Image from 'next/image';

export interface WeCantHelpProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  allQuestionsData: any;
  questionNumber: any;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  setWeCanHelpVisible: (d: boolean) => void;
  back: boolean;
}

const WeCantHelp = (props: WeCantHelpProps) => {
  const { handleChange, allQuestionsData, questionNumber, isMobile, setBack, back, setWeCanHelpVisible } = props;
  const questionConst = QUESTION

  const onBack = () => {
    setBack(true);
    setWeCanHelpVisible(false);
  }
  

  let questionIndex = 1;
  let idx = 0;
  if (allQuestionsData.ownership && allQuestionsData.ownership === 'tenant') {
    idx = 0
    questionIndex = 1
  } else if (allQuestionsData !== null && allQuestionsData.property === 'flat') {
    idx = 1;
    questionIndex = 2
  } else if (allQuestionsData !== null && allQuestionsData.floors === 4) {
    idx = 1;
    questionIndex = 3
  }

  const handleChangeCustom = (questionIndex) => {
    if (questionIndex <= 1) {
      handleChange(questionNumber, { ownership: '' }, questionConst[questionIndex].id);
    } else if (questionIndex === 2) {
      handleChange(questionNumber, { property: '' }, questionConst[questionIndex].id);
    } else {
      handleChange(questionNumber, { floors: 0 }, questionConst[questionIndex].id)
    }
  }

  return (
    <div data-aos={
      isMobile
        ? back
          ? "fade-left"
          : "fade-right"
        : ''
    }
      className={`${styles.surveyContainer}`} id={`${questionConst[0].id}`}>
      <div>
        <div className={`${styles.questionHeader}`}> {questionConst[0].qhead} </div>
        <p className={`${styles.SorryBottomText}`}>{questionConst[0].opt[idx]}</p>
      </div>

      <div>
        <div className={`${styles.backButtonDivHelp}`} onClick={() =>{ handleChangeCustom(questionIndex), setWeCanHelpVisible(false)}}>
          <div>
            <div  >
              <Image quality={100} src="/images/backIcon.svg" width={35} height={35} alt="back" className={`${styles.backIcon}`} />
            </div>
          </div>
          <div>
            <div className={`${styles.backButtonTextLight}`}> Made a mistake ?</div>
            <div className={`${styles.backButtonTextDark}`} onClick={() =>onBack()}> Go Back</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeCantHelp