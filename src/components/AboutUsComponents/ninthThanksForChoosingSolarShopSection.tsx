import Link from "next/link";
import styles from "../../styles/Pages/about-us/NinthThanksForChoosingSolarShopSection.module.scss";
import AnimatedHeading from "../theme/effects/AnimatedHeading";

const NinthThanksForChoosingSolarShopSection = () => {

    return (
        <div className={`${styles.NinthThanksForChoosingSolarShopSection}`}>
            <div className={`${styles.backgroundImage}`}>
                <div className={`${styles.DialogBoxContainer}`}>
                    <div className={`${styles.thankYouDialogBox}`}>
                        <AnimatedHeading>
                            <div className={`${styles.text1}`}>Thank you for choosing</div>
                            <div className={`${styles.text2}`}>Heatforce</div>
                            <div className={`${styles.text3}`}>Your journey to a greener, more energy-efficient future starts here.</div>
                        </AnimatedHeading>
                        <AnimatedHeading>
                            <Link href="/survey/">
                                <div className={`${styles.learnmorebtn}`}>
                                    <div
                                        className={`${styles.learnmorebtnshadow}`}
                                        style={{ backgroundColor: "#e6f0f9" }}
                                    ></div>
                                    <span>Get Started</span>
                                </div>
                            </Link>
                        </AnimatedHeading>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NinthThanksForChoosingSolarShopSection;
