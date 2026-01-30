import styles from "../../styles/Pages/about-us/SeventhDescriptionImageSection.module.scss";
import AnimatedText from "../theme/effects/AnimatedText";

const AboutUsSeventhDescriptionImageSection = () => {

    const descriptionText1 = `We believe in the long-term financial benefits of investing in quality solar technology. Our state-of-the-art, future-proof solar solutions are designed to save you money and provide a sustainable energy source for years to come.`
    const descriptionText2 = `We have built strong partnerships with top manufacturers, ensuring that our customers receive the best solar solutions available. Our relationship with these manufacturers guarantees prompt support and service, ensuring your solar system is always performing at its best.`

    return (
        <div className={`${styles.AboutUsSeventhDescriptionImageSection}`}>
            <AnimatedText>
                <div className={`container-lgg d-flex justify-content-between w-100 ${styles.descriptionTextImg}`}>
                    <div className={`w-1000 ${styles.descriptionTextDesktop}`}>
                        {descriptionText1}
                        <div className={`${styles.spacingBetweenText}`} />
                        {descriptionText2}
                    </div>
                    <div className={`w-100 d-flex justify-content-center align-items-center ${styles.rightSideImg}`}>
                    </div>
                </div>
                <div className={`${styles.descriptionTextMobile}`}>
                    {descriptionText1}
                    <div className={`${styles.spacingBetweenText}`} />
                    {descriptionText2}
                </div>
            </AnimatedText>

        </div>
    )
}

export default AboutUsSeventhDescriptionImageSection;
