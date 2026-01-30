import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from "../../styles/modulesStyles/survey.module.scss";


import { InputField } from '../theme/form/formFieldsComponent';
import { QUESTION } from "@/utils/constants";
import Image from 'next/image';
import { KiloWattInputs, KiloWattValidateSchema } from '@/schemas/kilowattSchema';

export interface SolarSystemProps {
    handleChange: (d: any, data: any, nextC: any) => void;
    allQuestionsData?: any;
    isMobile: boolean;
    setBack: (d: boolean) => void;
    back: boolean;
    questionNumber: number;
}

const SolarSystem = (props: SolarSystemProps) => {
    const { handleChange, isMobile, setBack, back,allQuestionsData, questionNumber } = props;

    const { handleSubmit, formState, register, setValue } = useForm<KiloWattInputs>({
        resolver: yupResolver(KiloWattValidateSchema),
    });

    const [ giveAnswer, setGiveAnswer] =useState(allQuestionsData?.solar_system_size);
    // const [isAnswered, setIsAnswered] = useState<Boolean>(allQuestionsData?.solar_system_size !== DEFAULTDATA?.solar_system_size);

    const questionConst = QUESTION
    
    console.log("Solar System size...", giveAnswer)
    const onBack = () => {
        setBack(true);
      }

    const questionIndex = 11;

    // const handleInputEnergy = (energyInput: any) => {
    //     if (energyInput) {
    //         setGiveAnswer(energyInput);
    //     }
    //     setValue("energy", String(Number(energyInput)))
    // };

    const handleInputEnergy = (energyInput: any) => {
        // Allow decimal points and numeric input only
        const decimalRegex = /^[0-9]*(\.[0-9]*)?$/;
    
        if (decimalRegex.test(energyInput)) {
          setGiveAnswer(energyInput);
          setValue('solar_system_size', String(energyInput)); // Update form value
        }
      };

    const onSubmit = (_edata: any) => {
        if (_edata.solar_system_size >= 2.7 && _edata.solar_system_size <= 11) {
            handleChange(
                questionIndex + 2,
                { solar_system_size: Number(_edata.solar_system_size) },
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
    } style={{display: `${(!isMobile || questionNumber === 11)?'block':'none'}`}}
      className={`${styles.surveyContainer}`} id={`${questionConst[questionIndex].id}`}>
            <div>
                <div className={`${styles.questionHeaderLite}`}> {questionConst[questionIndex].qhead} </div>
                <p className={`${styles.questionText}`} style={{marginBottom: '5px'}} >{questionConst[questionIndex].qtxt}</p>
                <p className={`${styles.SecondText}`}>{questionConst[questionIndex].qtxt2}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.inputFormDiv+" "+styles.formDflexRow}>
                <div className={styles.energyInputWrapper}>
                <div className={styles.circleButtonFormDiv}></div>
                    <InputField
                        {...{
                            register,
                            formState,
                            // type: 'number',
                            type: 'text', // Keep type as 'text' to handle number input with decimal precision.
                            id: 'solar_system_size',
                            placeholder: 'Enter value (kW)',
                            className: `${styles.numberInput}  ${styles.padding32}`,
                            autoComplete: "off", // Disable autocomplete
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

export default SolarSystem;
