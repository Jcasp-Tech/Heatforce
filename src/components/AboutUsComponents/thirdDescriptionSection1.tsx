import styles from "../../styles/Pages/about-us/ThirdDescriptionSection1.module.scss";
import AnimatedText from "../theme/effects/AnimatedText";

const ThirdDescriptionSection1 = () => {
    const descriptionText = `For over eight years, we have been dedicated to making UK homes more energy-efficient through the installation of heating systems, all forms of insulation, and Solar PV at no cost to residents. Our mission has always been to reduce fuel poverty and carbon emissions. What is new for us now is that, while we have previously installed solar through government-backed funding, we are excited to extend our expertise to the able-to-pay, financed market. Our commitment to the stringent standards of the ECO4 scheme ensures that we bring the same level of excellence and reliability to our solar panel and solar battery installations.`

    return (
        <AnimatedText>
            <div className={`${styles.ThirdDescriptionSection1}`}>
                <div className={`${styles.descriptionTextDesktop}`}>
                    {descriptionText}
                </div>
                <div className={`${styles.descriptionTextMobile}`}>
                    {descriptionText}
                </div>
            </div>
        </AnimatedText>
    )
}

export default ThirdDescriptionSection1;
