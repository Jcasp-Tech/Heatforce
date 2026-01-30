import React from 'react';
import AnimatedHeading from '../theme/effects/AnimatedHeading';
import styles from '../../styles/Pages/FifthSection.module.scss';
import AnimatedText from '../theme/effects/AnimatedText';
import Image from 'next/image';

const FifthSection = () => {
  const classes = `${styles.headingText} ${styles.headingTextCard3}`;
  return (
    <div className={`${styles.goSolarContainer} container-xl `}>
      <div style={{ marginBottom: '3' }}>
        <AnimatedHeading className={styles.bannerHeader}>
          Why should you go solar?
        </AnimatedHeading>
        <div className="d-flex flex-column gap-4">
          <div className={styles.infoSec}>
            <div className={styles.firstInner} style={{ fontWeight: 600 }}>
              <AnimatedHeading className={styles.headingText}>
                Generate what you need ... and extra!
              </AnimatedHeading>
              <div className={styles.firstInnerdiv2}  >

                <AnimatedText>
                  <p className={styles.descSec}>
                    Receive payments for selling surplus energy back to
                    the grid, resulting in potential savings of up to £700
                    for a medium sized home
                  </p>
                </AnimatedText>
              </div>
              <Image quality={100} src="/images/black-cable-image.webp" alt="cable" className="inner-img" loading='lazy' width={200} height={170} style={{ objectFit: "contain", justifySelf: "center" }} />
            </div>
          </div>
          <div className={styles.infoSec}>
            <div className={styles.secondLeftInner} style={{ fontWeight: 600 }}>
              <div className={styles.secondLeftInnerDiv}>

                <AnimatedHeading className={classes}>
                  We are regulated by the FCA
                </AnimatedHeading>
                <AnimatedText>
                  <p className={styles.secondDescSec2}>Heatforce is authorised and regulated by the Financial Conduct Authority FRN 737889. We act as a credit broker not a lender and offer finance from JN Bank UK Ltd. Credit is subject to terms and conditions and affordability.</p>
                </AnimatedText>
              </div>
              <div className={styles.secondLeftInnerDiv}>

                <AnimatedHeading className={classes}>
                  A Finance Representative Example
                </AnimatedHeading>
                <AnimatedText>
                  <p className={styles.secondDescSec2}>
                    This is a representative example of paying through finance: Cash price £6,936.00, less a deposit of £0. Total loan amount £10,770.02. Repayable by 120 monthly repayments of £145. Total charge for credit £3,834.02. Total amount repayable £10,770.02 (includes £0 deposit). Interest rate 9.9% per annum fixed. Representative APR 9.9%
                  </p>
                </AnimatedText>
              </div>
            </div>
            <div className={styles.secondInner} style={{ fontWeight: 600 }}>
              <AnimatedHeading className={classes}>
                Heatforce are MCS certified installers of solar PV systems
              </AnimatedHeading>
              <Image quality={100} src="/images/mcs-image.webp" alt="MCS certification" className="inner-img" style={{ width: '100%', objectFit: 'contain' }} loading='lazy' width={250} height={80} />
              <AnimatedText>
                <p className={styles.FourthCardReg}>Reg No: #NAP-32307</p>
              </AnimatedText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
