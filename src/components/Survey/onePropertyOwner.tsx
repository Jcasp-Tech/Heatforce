import { DEFAULTDATA, QUESTION } from "@/utils/constants";
import { useEffect, useState } from 'react';
import styles from "../../styles/modulesStyles/survey.module.scss";
import { event, EVENTENUMS } from "../Pixel/facebook/lib/fpixel";

export interface OnePropertyOwnerProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  allQuestionsData?: any;
  isMobile: boolean;
  setBack?: (d: any) => void;
  setWeCanHelpVisible: (d: boolean) => void;
  back: boolean;
}

const OnePropertyOwner = (props: OnePropertyOwnerProps) => {
  const { handleChange, isMobile, back, allQuestionsData, setWeCanHelpVisible } = props;
  const questionConst = QUESTION
  const [giveAnswer, setGiveAnswer] = useState(allQuestionsData?.ownership);
  const [isAnswered, setIsAnswered] = useState<Boolean>(allQuestionsData?.ownership !== DEFAULTDATA?.ownership);

  const questionIndex = 1;

  useEffect(() => {
    if (!isAnswered) {
      if (giveAnswer !== '' && giveAnswer === 'owner') {
        setWeCanHelpVisible(false);
        handleChange(
          questionIndex + 1,
          { ownership: giveAnswer },
          questionConst[questionIndex + 1].id
        );
      } else if (giveAnswer === 'tenant') {
        handleChange(questionIndex, { ownership: giveAnswer }, questionConst[questionIndex - 1].id);
        setWeCanHelpVisible(true);
      }
    }
  }, [isAnswered, giveAnswer]);
  useEffect(()=>{
    if(typeof window !== 'undefined'){
      setTimeout(() => {
        // console.log("this is triggered")
        window.scrollTo(0, 0);
      },200)
    }
  },[])


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
              className={ `  ownerButton ${isSelected ? styles.answerButtonDivSelected : `${styles.answerButtonDiv}`}`}
              onClick={(  ) => { event(EVENTENUMS.FindLocation); setGiveAnswer(questionConst[questionIndex].optVal[index]), setIsAnswered(false) }}
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
    </div>
  )
}

export default OnePropertyOwner