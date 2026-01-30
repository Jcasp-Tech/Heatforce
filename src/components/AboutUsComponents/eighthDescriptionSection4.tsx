import styles from "../../styles/Pages/about-us/EighthDescriptionSection4.module.scss";
import AnimatedHeading from "../theme/effects/AnimatedHeading";

const EighthDescriptionSection4 = () => {
    const descriptionText1 = `But it's not about us; it's about you.`
    const descriptionText2 = `Your energy needs, your choices, your future.`

    return (
        <div className={`${styles.EighthDescriptionSection4} text-center m-auto`}>
            <AnimatedHeading className="mb-0">
                <div className={`${styles.descriptionText} text-center m-auto`}>
                    {descriptionText1}
                    <br />
                    {descriptionText2}
                </div>
            </AnimatedHeading>
        </div>
    )
}

export default EighthDescriptionSection4;
