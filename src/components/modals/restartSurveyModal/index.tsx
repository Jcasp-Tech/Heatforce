import styles from "./restartSurveyModal.module.scss";
import { useRouter } from 'next/router';

export interface restartSurveyModalProps {
    setDisableScroll: (value: boolean) => void;
    setOpenRestartSurveyModal: (value: boolean) => void;
}

const RestartSurveyModal = (props: restartSurveyModalProps) => {
    const { setOpenRestartSurveyModal, setDisableScroll } = props;

    const router = useRouter();

    const handleRestartQuote = () => {
        localStorage.removeItem('saveQuotes');
        localStorage.removeItem('postCode');
        setDisableScroll(false);
        setOpenRestartSurveyModal(false);
        router.push('/survey');
      };

    return (
        <>
            <div
                data-aos="zoom-in"
                className={`${styles.saveEstimationProgressPopup}`}>
                <div className={`${styles.transparentContainer}`} onClick={() => { setOpenRestartSurveyModal(false), setDisableScroll(false) }} >
                    <div className={`${styles.dialogBox}`}  onClick={(e)=>e.stopPropagation()} >
                        <div className={`${styles.contentSection}`}>
                            <div className={`${styles.saveEstimate}`}>
                                Restart Survey?
                            </div>
                            <div className={`${styles.descriptionText1}`}>
                                This will clear all of your data and you&apos;ll go back to the start. Are you sure you want to do this?
                            </div>
                            <div />
                            <div className={`${styles.buttonSection} text-center`}>
                                <div className={`${styles.buttonClass} ${styles.blueBG} `}
                                    onClick={() => { handleRestartQuote() }}>
                                    Yes Restart
                                </div>
                                <div className={`${styles.buttonClass} ${styles.greyBG} `}
                                    onClick={() => { setOpenRestartSurveyModal(false), setDisableScroll(false) }}>
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestartSurveyModal;
