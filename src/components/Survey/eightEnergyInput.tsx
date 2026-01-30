import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from "../../styles/modulesStyles/survey.module.scss";

import type { EnergyFormInputs } from '@/schemas/energyFormSchema';
import { EnergyFormValidateSchema } from '@/schemas/energyFormSchema';

import { InputField } from '../theme/form/formFieldsComponent';
import { QUESTION } from "@/utils/constants";
import Image from 'next/image';

export interface EightEnterConsumProps {
    handleChange: (d: any, data: any, nextC: any) => void;
    allQuestionsData?: any;
    isMobile: boolean;
    setBack: (d: boolean) => void;
    back: boolean;
    questionNumber: number;
}

const EightEnterConsum = (props: EightEnterConsumProps) => {
    const { handleChange, isMobile, setBack, back,allQuestionsData, questionNumber } = props;

    const { handleSubmit, formState, register, setValue } = useForm<EnergyFormInputs>({
        resolver: yupResolver(EnergyFormValidateSchema),
    });

    const [, setGiveAnswer] =useState(allQuestionsData?.annual_energy_usage);
    // const [isAnswered, setIsAnswered] = useState<Boolean>(allQuestionsData?.annual_energy_usage !== DEFAULTDATA?.annual_energy_usage);

    const questionConst = QUESTION
    
    const onBack = () => {
        setBack(true);
      }

    const questionIndex = 8;
    const handleInputEnergy = (energyInput: any) => {
        if (energyInput) {
            setGiveAnswer(energyInput);
        }
        setValue("energy", String(Number(energyInput)))
    };

    const onSubmit = (_edata: any) => {
        if (_edata.energy >= 1500 && _edata.energy <= 25000) {
            handleChange(
                questionIndex + 2,
                { annual_energy_usage: Number(_edata.energy) },
                questionConst[questionIndex + 2].id
            );
        }
    };

    return (
        <div data-aos={
      isMobile
        ? back
          ? "fade-left"
          : "fade-right"
        : ''
    } style={{display: `${(!isMobile || questionNumber === 8)?'block':'none'}`}}
      className={`${styles.surveyContainer}`} id={`${questionConst[questionIndex].id}`}>
            <div>
                <div className={`${styles.questionHeaderLite}`}> {questionConst[questionIndex].qhead} </div>
                <p className={`${styles.questionText}`}>{questionConst[questionIndex].qtxt}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.inputFormDiv+" "+styles.formDflexRow}>
                <div className={styles.energyInputWrapper}>
                <div className={styles.circleButtonFormDiv}></div>
                    <InputField
                        {...{
                            register,
                            formState,
                            type: 'number',
                            id: 'energy',
                            placeholder: 'Enter value (kWh)',
                            className: `${styles.numberInput}  ${styles.padding32}`,
                        }}
           
                        onChange={(e) => handleInputEnergy(e.target.value)}
                    />
                </div>
                <button type="submit" className={`  ${styles.nextButtonDiv}`}
                    onClick={() => {}}
                >
                    <div className={styles.nextButtonTextDark}>
                        Next
                    </div>
                </button>
            </form>
            <div>
                <div className={`${styles.backButtonDiv} mobile-view`} onClick={() => handleChange(questionIndex - 1, { }, questionConst[questionIndex - 1].id)}
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
        </div>
    );
};

export default EightEnterConsum;
