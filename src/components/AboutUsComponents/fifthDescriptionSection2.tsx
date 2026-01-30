import styles from "../../styles/Pages/about-us/FifthDescriptionSection2.module.scss";
import AnimatedHeading from "../theme/effects/AnimatedHeading";

const FifthDescriptionSection2 = () => {
    const descriptionText = `Heatforce provide comprehensive renewable energy solutions, alongside more traditional plumbing, heating and electrical work to homeowners. We also partner with local authorities, housing associations, charities, and utility companies.`

    return (
        <div className={`${styles.FifthDescriptionSection2}`}>
            <AnimatedHeading>
                <div className={`${styles.descriptionTextDesktop}`}>
                    {descriptionText}
                </div>
                <div className={`${styles.descriptionTextMobile}`}>
                    {descriptionText}
                </div>
            </AnimatedHeading>
        </div>
    )
}

export default FifthDescriptionSection2;
