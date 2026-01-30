import styles from "../../styles/Pages/about-us/SixthDescriptionSection3.module.scss";
import AnimatedHeading from "../theme/effects/AnimatedHeading";

const SixthDescriptionSection3 = () => {
    const descriptionText = `Our goal is simple: to offer the best solar panels and solar batteries at the best prices.`

    return (
        <div className={`${styles.SixthDescriptionSection3} text-center m-auto`}>
            <AnimatedHeading>
                <div className={`${styles.descriptionText} text-center m-auto`}>
                    {descriptionText}
                </div>
            </AnimatedHeading>
        </div>
    )
}

export default SixthDescriptionSection3;
