import styles from "../../styles/Pages/about-us/SecondImagesSection.module.scss";
import AnimatedText from "../theme/effects/AnimatedText";

const AboutUsSecondImagesSection = () => {
    return (
        <>
        <AnimatedText className="w-100">
            <div className={styles.AboutUsSecondImagesSection}>
                <div className={`d-flex justify-content-center `}>
                    <div className={`d-flex flex-column `}>
                        <div className={`${styles.divDesktop} ${styles.img4} ${styles.imageShadow} ${styles.imageMargins}`}>
                        </div>
                        <div className={`${styles.divDesktop}  ${styles.img6} ${styles.imageShadow} ${styles.imageMargins}`}>
                        </div>
                    </div>
                    <div className={`d-flex flex-column `}>
                        <div className={`d-flex `}>
                            <div className={`d-flex flex-column `}>
                                <div className={`${styles.divDesktop} ${styles.img1} ${styles.imageShadow} ${styles.imageMargins}`}>
                                </div>
                                <div className={`${styles.divDesktop} ${styles.img3} ${styles.imageShadow} ${styles.imageMargins}`}>
                                </div>
                            </div>
                            <div className={`${styles.divDesktop} ${styles.img5} ${styles.imageShadow} ${styles.imageMargins}`}>
                            </div>
                        </div>
                        <div className={`${styles.divDesktop} ${styles.img7} ${styles.imageShadow} ${styles.imageMargins}`}>
                        </div>
                    </div>
                </div>
                <div className={`d-flex justify-content-center`}>
                    <div className={`d-flex flex-column `}>
                        <div className={`${styles.divMobile} ${styles.img1} ${styles.imageShadow} ${styles.imageMargins}`}>
                        </div>
                        <div className={`${styles.divMobile} ${styles.img3} ${styles.imageShadow} ${styles.imageMargins}`}>
                        </div>
                    </div>
                    <div className={`${styles.divMobile} ${styles.img5} ${styles.imageShadow} ${styles.imageMargins}`}>
                    </div>

                </div>
            </div>
        </AnimatedText>
        </>
    )
}

export default AboutUsSecondImagesSection;
