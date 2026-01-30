import ThirdDescriptionSection1 from "./thirdDescriptionSection1";
import FifthDescriptionSection2 from "./fifthDescriptionSection2";
import SixthDescriptionSection3 from "./sixthDescriptionSection3";
import AboutUsFirstHeroSection from "./firstHeroSection";
import AboutUsSecondImagesSection from "./secondImagesSection";
import AboutUsFourthStatsCardsSection from "./fourthStatsCardsSection";
import AboutUsSeventhDescriptionImageSection from "./seventhDescriptionImageSection";
import EighthDescriptionSection4 from "./eighthDescriptionSection4";
import NinthThanksForChoosingSolarShopSection from "./ninthThanksForChoosingSolarShopSection";
import AwardSection from "../awardSections";
import AboutUsTrustpilotSection from "./aboutUsTrustpilotSection";
// import Trustpilot from "../homePageComponents/trustpilot/trustreview5star";

const AboutUsComponents = () => {
    return (
        <>
            <div className="container-1320 m-auto">
                <AboutUsFirstHeroSection />
                <AboutUsSecondImagesSection />
                <ThirdDescriptionSection1 />
                <AboutUsFourthStatsCardsSection />
                <FifthDescriptionSection2 />
                <AboutUsTrustpilotSection />
                <SixthDescriptionSection3 />
                <AboutUsSeventhDescriptionImageSection />
                <EighthDescriptionSection4 />
                <NinthThanksForChoosingSolarShopSection />
                <AwardSection />
            </div>
        </>
    )

}
export default AboutUsComponents;