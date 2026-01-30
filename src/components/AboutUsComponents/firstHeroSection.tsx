import Image from "next/image";
import styles from "../../styles/Pages/about-us/FirstHeroSection.module.scss";
import AnimatedText from "../theme/effects/AnimatedText";

const AboutUsFirstHeroSection = () => {

    const descriptionText = `Company founder Paul Maddocks started out as a one-man band that installed boilers and heating systems.`

    return (
        <div className={`${styles.AboutUsFirstHeroSection}`}>
            <div className={`${styles.blueCircles}`}>
                <AnimatedText>
                    <div className={`m-auto w-750 container-xxll text-center m-autoo ${styles.titleText}`}>
                        Welcome to Heatforce, where we bring the power of the sun to your doorstep.
                    </div>
                </AnimatedText>
            </div>
            <AnimatedText>
                <div className={`container-lgg d-flex justify-content-between gap-4 w-100 ${styles.descriptionTextImg}`}>
                    <div className={`w-100 ${styles.descriptionTextDesktop}`}>
                        {descriptionText}
                    </div>
                    <div className={`w-100 d-flex align-items-center justify-content-center ${styles.brandLogoDiv}`}>
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
