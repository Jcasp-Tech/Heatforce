import styles from "../../styles/Pages/about-us/FifthDescriptionSection2.module.scss";
import AnimatedHeading from "../theme/effects/AnimatedHeading";

const FifthDescriptionSection2 = () => {
    const descriptionText = `At CES Solar Shop, we believe in providing top-tier products and services that you can trust. We are accredited and certified by leading industry bodies, ensuring that every installation meets the highest standards of quality and safety. Our accreditations include MCS, NIC EIC, and NAPIT among many others. If there's a certification to be had, we've got it.`

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
