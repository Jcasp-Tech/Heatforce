import Image from "next/image";
import styles from "../../styles/Pages/about-us/FourthStatsCardsSection.module.scss";
import AnimatedText from "../theme/effects/AnimatedText";

const AboutUsFourthStatsCardsSection = () => {
    const dFlexJustifyAlign = `d-flex flex-column justify-content-end align-items-start`
    return (
        <>
            <div className={styles.FourthStatsCardsSection}>
                <div className="d-flex justify-content-center">
                    <div className={`${dFlexJustifyAlign} ${styles.cardDesktop} ${styles.cardMargins} ${styles.cardShadow}`}>
                        <Image quality={100} 
                            src="/images/pages/about-us/solar-car.png"
                            alt="solar-car"
                            className={`${styles.solarCar} w-100`}
                            width={999}
                            height={-1}
                            loading="lazy"
                        />
                        <AnimatedText>
                            {/* <p>+1500</p> */}
                            <p>700+</p>
                            <span>Solar Engineers</span>
                        </AnimatedText>

                    </div>
                    <div>
                        <div className="d-flex">
                            <div className={`${dFlexJustifyAlign} ${styles.cardDesktop} ${styles.cardMargins} ${styles.cardShadow}`}>
                                <AnimatedText>
                                    <p>+1354</p>
                                    <span>Five Star Reviews</span>
                                </AnimatedText>
                            </div>
                            <div className={`${dFlexJustifyAlign} ${styles.cardDesktop} ${styles.cardMargins} ${styles.cardShadow}`}>
                                <AnimatedText>
                                    <p>+50</p>
                                    <span>Aftercare Support Staff</span>
                                </AnimatedText>
                            </div>

                        </div>
                        <div className="d-flex">
                            <div className={`${dFlexJustifyAlign} ${styles.cardDesktop} ${styles.cardMargins} ${styles.cardShadow}`}>
                                <AnimatedText>
                                    <p>+1600</p>
                                    <span>Trustpilot review</span>
                                </AnimatedText>
                            </div>
                            <div className={`${dFlexJustifyAlign} ${styles.cardDesktop} ${styles.cardMargins} ${styles.cardShadow}`}>
                                <AnimatedText>
                                    <p>16,000+</p>
                                    <span>Installs</span>
                                </AnimatedText>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column justify-content-end">
                        <div className={`h-100 ${dFlexJustifyAlign} ${styles.cardMobile} ${styles.cardMargins} ${styles.cardShadow}`}>
                            <Image quality={100} 
                                src="/images/pages/about-us/solar-car.png"
                                alt="solar-car"
                                className={`${styles.solarCar} w-100`}
                                width={999}
                                height={-1}
                                loading="lazy"
                            />
                            <AnimatedText>
                                <p>700+</p>
                                <span>Solar Engineers</span>
                            </AnimatedText>
                        </div>
                        <div className={`${dFlexJustifyAlign} ${styles.cardMobile} ${styles.cardMargins} ${styles.cardShadow}`}>
                            <AnimatedText>
                                <p>+50</p>
                                <span>Aftercare Support Staff</span>
                            </AnimatedText>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <div className={`${dFlexJustifyAlign} ${styles.cardMobile} ${styles.cardMargins} ${styles.cardShadow}`}>
                            <AnimatedText>
                                <p>+1354</p>
                                <span>Five Star Reviews</span>
                            </AnimatedText>
                        </div>
                        <div className={`${dFlexJustifyAlign} ${styles.cardMobile} ${styles.cardMargins} ${styles.cardShadow}`}>
                            <AnimatedText>
                                <p>+1600</p>
                                <span>Trustpilot reviews</span>
                            </AnimatedText>
                        </div>
                        <div className={`${dFlexJustifyAlign} ${styles.cardMobile} ${styles.cardMargins} ${styles.cardShadow}`}>
                            <AnimatedText>
                                <p>16,000+</p>
                                <span>Installs</span>
                            </AnimatedText>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default AboutUsFourthStatsCardsSection;
