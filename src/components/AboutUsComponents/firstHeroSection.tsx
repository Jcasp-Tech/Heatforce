import Image from "next/image";
import styles from "../../styles/Pages/about-us/FirstHeroSection.module.scss";
import AnimatedText from "../theme/effects/AnimatedText";

const AboutUsFirstHeroSection = () => {

    const descriptionText = `Our journey in the energy sector began with our involvement in the highly regulated ECO4 (Energy Company Obligation) funded market, a background that sets us apart in the solar industry.`

    return (
        <div className={`${styles.AboutUsFirstHeroSection}`}>
            <div className={`${styles.blueCircles}`}>
                <AnimatedText>
                    <div className={`m-auto w-750 container-xxll text-center m-autoo ${styles.titleText}`}>
                        Welcome to CES Solar Shop, where we bring the power of the sun to your doorstep.
                    </div>
                </AnimatedText>
            </div>
            <AnimatedText>
                <div className={`container-lgg d-flex justify-content-between w-100 ${styles.descriptionTextImg}`}>
                    <div className={`w-100 ${styles.descriptionTextDesktop}`}>
                        {descriptionText}
                    </div>
                    <div className={`w-100 d-flex justify-content-end align-items-center ${styles.brandLogoDiv}`}>
                        <Image quality={100} className="img-fluid w-75" src="/images/Heatforce-Logo.png" alt="Heatforce logo" width={999} height={999} loading="lazy" />
                    </div>
                </div>
                <div className={`${styles.descriptionTextMobile}`}>
                    {descriptionText}
                </div>
            </AnimatedText>
        </div>
    )
}

export default AboutUsFirstHeroSection;
