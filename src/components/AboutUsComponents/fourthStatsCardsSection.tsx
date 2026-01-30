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
                            src="/images/pages/about-us/SmallVan.jpg"
                            alt="solar-car"
                            className={`${styles.solarCar} w-100`}
                            width={999}
                            height={2}
                            loading="lazy"
                        />
                        <AnimatedText>
                            {/* <p>+1500</p> */}
                            <p>100+</p>
                            <span>certified engineers</span>
                        </AnimatedText>

                    </div>
                    <div>
                        <div className="d-flex">
                            <div className={`${dFlexJustifyAlign} ${styles.cardDesktop} ${styles.cardMargins} ${styles.cardShadow}`}>
                                <AnimatedText>
                                    <p>700+</p>
                                    <span>five-star reviews Trust Pilot Reviews</span>
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
                                    <p>784</p>
                                    <span>reviews total on Trustpilot</span>
                                </AnimatedText>
                            </div>
                            <div className={`${dFlexJustifyAlign} ${styles.cardDesktop} ${styles.cardMargins} ${styles.cardShadow}`}>
                                <AnimatedText>
                                    <p>60,000+</p>
                                    <span>total installations completed</span>
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
                                <p>100+</p>
                                <span>certified engineers</span>
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
                                <p>700+</p>
                                <span>five-star reviews Trust Pilot Reviews</span>
                            </AnimatedText>
                        </div>
                        <div className={`${dFlexJustifyAlign} ${styles.cardMobile} ${styles.cardMargins} ${styles.cardShadow}`}>
                            <AnimatedText>
                                <p>784</p>
                                <span>reviews total on Trustpilot</span>
                            </AnimatedText>
                        </div>
                        <div className={`${dFlexJustifyAlign} ${styles.cardMobile} ${styles.cardMargins} ${styles.cardShadow}`}>
                            <AnimatedText>
                                <p>60,000+</p>
                                <span>total installations completed</span>
                            </AnimatedText>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default AboutUsFourthStatsCardsSection;
