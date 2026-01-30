import styles from "../../styles/Pages/about-us/AboutUsTrustpilotSection.module.scss";
import Trustpilot from "../homePageComponents/trustpilot/trustreview5star";
import AnimatedHeading from "../theme/effects/AnimatedHeading";

const AboutUsTrustpilotSection = () => {
    const descriptionText = `What our customers say....`

    return (
        <>
            <div className={`${styles.AboutUsTrustpilotSection} text-center m-auto`}>
                <AnimatedHeading>
                    <div className={`${styles.descriptionText} text-center m-auto`}>
                        {descriptionText}
                    </div>
                </AnimatedHeading>
            </div>
            <Trustpilot initialData={null} />
        </>
    )
}

export default AboutUsTrustpilotSection;
