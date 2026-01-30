import React from "react";
import styles from "../../styles/Pages/FourthSection.module.scss";
import AnimatedHeading from "../theme/effects/AnimatedHeading";
import Image from "next/image";

interface FourthSectionProps {
  handleLearnMoreClick: (popupType: string) => void;
}

const FourthSection = ({handleLearnMoreClick}: FourthSectionProps) => {
  const classes = `${styles.bannerContentHeader} ${styles.animatedHeading}`;

  return (
    <>
      <div className={`${styles.fourDiv} container-xl `}>
        <div className={styles.fourBannerDiv}>
          <div>
            <AnimatedHeading className={styles.bannerHeader}>
                Turning sunshine into savings, one ray at a time
            </AnimatedHeading>
          </div>
          <div className={styles.bannerDiv4}>
            <div className={styles.bannerDiv4SubDiv1}>
                <div
                  className={styles.bannerContent4}
                  style={{
                    background: "linear-gradient(to right, #F6E51B, #FFD700)",
                  }}
                  data-aos="fade-right"
                >
                  <div className={styles.bannerContentText}>
                    <div>
                      <h2 className={classes}>DAS Solar Panels</h2>
                      <p className={styles.solarBannerContentParagraph}>
                        Panels from Das solar feature a sleek black and design,
                        using an innovative half-cell configuration to provide up
                        to 20% efficiency.
                      </p>
                    </div>

                    <div className="learn-more-btn">
                      <div
                        className="learnmorebtn-shadow"
                        style={{ backgroundColor: "#0F3B59" }}
                      ></div>
                      <span onClick={() => handleLearnMoreClick("solar")}>
                        Learn More
                      </span>
                    </div>
                  </div>
                  <div className={styles.bannerContentImgCenter}>
                    <Image  
                      src="/images/panel.webp"
                      alt="panel"
                      className={styles.bannerContentPanelImg}
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      width={325}
                      height={325}                    
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* <div
                  className={`${styles.bannerContent4} ${styles.displayBlockSmallerThan13100}`}
                  style={{
                    background: "linear-gradient(to right, #F6E51B, #FFD700)",
                  }}
                  data-aos="fade-right"
                >
                  <div className={styles.bannerContentBattText}>
                    <div>
                      <h2 className={classes}>GivEnergy GivBattery Storage</h2>
                      <p className={styles.solarBannerContentParagraph}>
                        works with Agile Octopus, the 100% green electricity
                        tariff with Plunge Pricing - a world first that lets you
                        take advantage of negative price events, and get paid for
                        the electricity you use.
                      </p>
                    </div>
                    <div className="learn-more-btn">
                      <div
                        className="learnmorebtn-shadow"
                        style={{ backgroundColor: "rgb(246 229 27)" }}
                      ></div>
                      <span onClick={() => handleLearnMoreClick("battery")}>
                        Learn More
                      </span>
                    </div>
                  </div>
                  <div className={styles.bannerContentImgBatteryDiv}>
                    <Image quality={100} 
                      src="/images/battery.webp"
                      alt="panel"
                      className={styles.bannerContentBattery}
                      width={325}
                      height={325}
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      loading="lazy"
                    />
                  </div>
                </div> */}
                <div
                  className={`${styles.bannerContent4} ${styles.displayNoneSmallerThan13100}`}
                  style={{
                    background: "linear-gradient(to right, #0A1E34, #0F3B59)",
                  }}
                  data-aos="fade-right"
                >
                  <div className={styles.bannerContentText}>
                    <div>
                      <h2 className={classes}>9.9% APR* - Finance</h2>
                      <p className={styles.solarBannerContentParagraph}>
                        Spread the cost of your solar install over 60 or 120
                        months to maximise your solar savings.
                      </p>
                    </div>
                    <div className="learn-more-btn">
                      <div
                        className="learnmorebtn-shadow"
                        style={{ backgroundColor: "#0F3B59 " }}
                      ></div>
                      <span onClick={() => handleLearnMoreClick("percentage")}>
                        Learn More
                      </span>
                    </div>
                  </div>
                  <div className={styles.bannerContentImgCenter}>
                    <Image
                      src="/images/percent-blue.webp"
                      alt="panel"
                      className={styles.bannerContentPercentImg}
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      width={325}
                      height={325}                    
                      loading="lazy"
                    />
                  </div>
                </div>
            </div>
            <div className={styles.bannerDiv4SubDiv2}>
                <div
                  className={styles.bannerContent4}
                  style={{
                    background: "linear-gradient(to right, #0A1E34, #0F3B59)",
                  }}
                  data-aos="fade-right"
                >
                  <div className={styles.bannerContentText}>
                    <div>
                      <h2 className={classes}>24/7 Monitoring</h2>
                      <p className={styles.monitoringBannerContentParagraph}>
                        The GivEnergy monitoring platform and apps offer one of
                        the most advanced and powerful platforms on the market
                      </p>
                    </div>
                    <div className="learn-more-btn">
                      <div
                        className="learnmorebtn-shadow"
                        style={{ backgroundColor: "#0F3B59 " }}
                      ></div>
                      <span onClick={() => handleLearnMoreClick("phone")}>
                        Learn More
                      </span>
                    </div>
                  </div>
                  <div
                    className={styles.bannerContentImgCenter}
                    style={{ width: "50%" }}
                  >
                    <Image quality={100} 
                      src="/images/phone.webp"
                      alt="panel"
                      className={styles.bannerContentPhoneImg}
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      width={325}
                      height={325}                    
                      loading="lazy"
                    />
                  </div>
                </div>
                <div
                  className={`${styles.bannerContent4} ${styles.displayNoneSmallerThan13100}`}
                  style={{
                    background: "linear-gradient(to right, #F6E51B, #FFD700)",
                  }}
                  data-aos="fade-right"
                >
                  <div className={styles.bannerContentBattText}>
                    <div>
                      <h2 className={classes}>GivEnergy GivBattery Storage</h2>
                      <p className={styles.solarBannerContentParagraph}>
                        Works with Agile Octopus, the 100% green electricity
                        tariff with Plunge Pricing - a world first that lets you
                        take advantage of negative price events, and get paid for
                        the electricity you use.
                      </p>
                    </div>
                    <div className="learn-more-btn">
                      <div
                        className="learnmorebtn-shadow"
                        style={{ backgroundColor: "#0F3B59" }}
                      ></div>
                      <span onClick={() => handleLearnMoreClick("battery")}>
                        Learn More
                      </span>
                    </div>
                  </div>
                  <div className={styles.bannerContentImgBatteryDiv}>
                    <Image quality={100} 
                      src="/images/battery.webp"
                      alt="panel"
                      className={styles.bannerContentBattery}
                      width={325}
                      height={325}
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* <div
                  className={`${styles.bannerContent4} ${styles.displayBlockSmallerThan13100}`}
                  style={{
                    background: "linear-gradient(to right, #0A1E34, #0F3B59)",
                  }}
                  data-aos="fade-right"
                >
                  <div className={styles.bannerContentText}>
                    <div>
                      <h2 className={classes}>9.9% APR* - Finance</h2>
                      <p className={styles.bannerContentParagraph}>
                        Spread the cost of your solar install over 60 or 120
                        months to maximise your solar savings.
                      </p>
                    </div>
                    <div className="learn-more-btn">
                      <div
                        className="learnmorebtn-shadow"
                        style={{ backgroundColor: "#0F3B59 " }}
                      ></div>
                      <span onClick={() => handleLearnMoreClick("percentage")}>
                        Learn More
                      </span>
                    </div>
                  </div>
                  <div className={styles.bannerContentImgCenter}>
                    <Image quality={100} 
                      src="/images/percent-blue.webp"
                      alt="panel"
                      className={styles.bannerContentPercentImg}
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      width={999}
                      height={999}                    
                      loading="lazy"
                    />
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FourthSection;
