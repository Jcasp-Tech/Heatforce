import Image from "next/image";
import styles from "./requestHelpPopup.module.scss";
import { zapprChatBotOpen } from "@/utils/helpers";
// import { show } from "@intercom/messenger-js-sdk";

export interface RequestHelpPopupProps {
    setIsHelpPopup: (value: boolean) => void;
    setDisableScroll: (value: boolean) => void;
}

const RequestHelpPopup = (props: RequestHelpPopupProps) => {
    const { setIsHelpPopup,setDisableScroll } = props;


    return (
        <>
            <div 
            className={`${styles.requestHelpPopup}`} >
                <div className={`${styles.transparentContainer}`}   onClick={() => {setIsHelpPopup(false),setDisableScroll(false)}} >
                    <div className={`${styles.dialogBox}`} onClick={(e) => e.stopPropagation()}
                    data-aos="zoom-in-up">
                        <div className={`${styles.closeButton}`}
                            onClick={() => {setIsHelpPopup(false),setDisableScroll(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgba(15, 59, 89, 0.05)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </div>
                        <div className={`${styles.contentSection}`}>
                            <div className={`${styles.needHelp}`}>
                                Need help?
                            </div>
                            <div className={`${styles.descriptionText1}`}>
                                Choose one of the options below to get in touch with one of our experts.
                            </div>

                            <div className={`d-flex align-items-center gap-4`}>
                                <div>
                                    <Image quality={100} className={`${styles.dialogBoxImg}`} width={999} height={999} src="/images/requestHelpPopupModule/conversation_3214737.webp" alt="conversation" />
                                </div>
                                <div onClick={()=>{
                                    // show()
                                    zapprChatBotOpen()
                                    }}  style={{cursor:"pointer"}}>
                                    <div className={`${styles.descriptionText2}`}>
                                        Chat with us
                                    </div>
                                    <div className={`${styles.descriptionText3}`}>
                                        Start chat
                                    </div>
                                </div>
                            </div>
                            <div className={`d-flex align-items-center gap-4`}>
                                <div>
                                    <Image quality={100} className={`${styles.dialogBoxImg}`} width={999} height={999} src="/images/requestHelpPopupModule/callback_5662960.webp" alt="callback" />
                                </div>
                                <div>
                                    <div className={`${styles.descriptionText2}`}>
                                        Get us to call you
                                    </div>
                                    <div className={`${styles.descriptionText3}`}>
                                        
                                        <a title="tel:+01792 722642" className="nav-link" href="tel:+01792 722642">Request a call</a>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.buttonSection} text-center`}>
                                <div className={`${styles.descriptionText2}`}>
                                    Speak to one of our experts
                                </div>
                                <div className={`${styles.descriptionText4}`}>
                                    <a title="tel:+01792 722642" className="nav-link" href="tel:+01792 722642">01792 722642</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestHelpPopup;
