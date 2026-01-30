import Image from 'next/image';
import styles from './solarSavingsPopup.module.scss';
import { getParseInt } from '@/components/NumberFunctions';

export interface SolarSavingsPopupProps {
  setDisableScroll: (value: boolean) => void;
  setOpenSolarSavingPopup: (value: boolean) => void;
  setIsPopupInPopup: (value: boolean) => void;
  isPopupInPopup: boolean;
  resultPopupData: any;
  modalEnum: any;
  setOpeningModalName: (d: any) => void;
  webLeadType: number;
}

const SolarSavingsPopup = (props: SolarSavingsPopupProps) => {
  const {
    setDisableScroll,
    isPopupInPopup,
    resultPopupData,
    modalEnum,
    setOpeningModalName,
    webLeadType,
  } = props;
  const { selectedVariant } = resultPopupData;
  const downArrow = () => {
    return (
      <>
        <Image
          quality={100}
          className={`${styles.greenArrowImg}`}
          width={20}
          height={40}
          sizes="100vw"
          src="/images/solarSavingsPopup/green-down-arrow.webp"
          alt="product"
        />
      </>
    );
  };

  const upArrow = () => {
    return (
      <>
        <Image
          quality={100}
          className={`${styles.greenArrowImg}`}
          width={20}
          height={40}
          sizes="100vw"
          src="/images/solarSavingsPopup/green-up-arrow.webp"
          alt="product"
        />
      </>
    );
  };

  return (
    <>
      <div className={`${styles.solarSavingsPopup}`}>
        <div
          className={`${styles.transparentContainer}`}
          onClick={() => {
            setOpeningModalName((prev) => {
              const updated = [
                ...prev.filter((name) => name !== modalEnum.solarSavingPopup),
                modalEnum.closeSolarSavingPopup,
              ];
              return Array.from(new Set(updated));
            });
            setDisableScroll(isPopupInPopup ? true : false);
          }}
        >
          <div
            className={`${styles.dialogBox}`}
            data-aos="fade-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`${styles.closeButton}`}
              onClick={() => {
                setOpeningModalName((prev) => {
                  const updated = [
                    ...prev.filter(
                      (name) => name !== modalEnum.solarSavingPopup
                    ),
                    modalEnum.closeSolarSavingPopup,
                  ];
                  return Array.from(new Set(updated));
                });
                setDisableScroll(isPopupInPopup ? true : false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="rgba(15, 59, 89, 0.05)"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>

            <div className={`${styles.contentSection}`}>
              <div className={`${styles.solarSavings}`}>
                Your {webLeadType === 1 ? 'solar' : 'battery'} savings
              </div>

              <div className={`${styles.basedOnInputText}`}>
                Based on your input, here&apos;s how your{' '}
                {webLeadType === 1 ? 'solar' : 'battery'} installation could
                impact your home and energy bills.
              </div>

              <div className={`${styles.beforeAfterSolarSection}`}>
                <div className="w-100">
                  {webLeadType === 1 && (
                    <div className={`${styles.beforeAfterSolar}`}>
                      Before Solar
                    </div>
                  )}
                  {webLeadType === 2 && (
                    <>
                      {' '}
                      <div className={`${styles.withBatteryDesktop}`}>
                        Without Battery
                      </div>
                      <div className={`${styles.withBatteryMobile}`}>
                        Without
                        <br />
                        Battery
                      </div>
                    </>
                  )}

                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Annual Energy Consumption
                    </div>
                    <div className={`${styles.cardText2}`}>
                      {selectedVariant?.annual_energy_usage || 0}kWh
                    </div>
                  </div>
                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Annual Electricity Bill
                    </div>
                    <div className={`${styles.cardText2}`}>
                      £{getParseInt(selectedVariant?.before_solar)}
                    </div>
                  </div>
                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Annual CO2 Emissions
                    </div>
                    <div className={`${styles.cardText2}`}>
                      {getParseInt(
                        selectedVariant?.before_annual_CO2_emmisions
                      )}
                      kg
                    </div>
                  </div>
                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Annual Savings
                    </div>
                    <div
                      className={`${styles.cardText2} ${styles.flexCenterGap}`}
                    >
                      £
                      {getParseInt(selectedVariant?.before_solar) -
                        getParseInt(selectedVariant?.new_after_solar)}{' '}
                      {upArrow()}
                    </div>
                  </div>
                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Annual Export Earnings
                    </div>
                    <div
                      className={`${styles.cardText2} ${styles.flexCenterGap}`}
                    >
                      £{getParseInt(selectedVariant?.EstimatedExportEarnings)}{' '}
                      {upArrow()}
                    </div>
                  </div>
                </div>

                <div className="w-100">
                  {webLeadType === 1 && (
                    <div className={`${styles.beforeAfterSolar}`}>
                      After Solar
                    </div>
                  )}
                  {webLeadType === 2 && (
                    <>
                      {' '}
                      <div className={`${styles.withBatteryDesktop}`}>
                        With Battery
                      </div>
                      <div className={`${styles.withBatteryMobile}`}>
                        With
                        <br />
                        Battery
                      </div>
                    </>
                  )}

                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Useable Energy Produced
                    </div>
                    <div className={`${styles.cardText2} ${styles.greenText}`}>
                      {getParseInt(selectedVariant?.estimated_annual_usable)}kWh
                    </div>
                    <div
                      className={`${styles.cardText3} ${styles.greenText} ${styles.flexCenterGap}`}
                    >
                      {getParseInt(selectedVariant?.after_useable_percentage)}%{' '}
                      {selectedVariant?.annual_energy_usage <
                      selectedVariant?.estimated_annual_usable
                        ? upArrow()
                        : downArrow()}
                    </div>
                  </div>
                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Annual Electricity Bill
                    </div>
                    <div className={`${styles.cardText2}`}>
                      £{getParseInt(selectedVariant?.new_after_solar)}
                    </div>
                    <div
                      className={`${styles.cardText3} ${styles.greenText} ${styles.flexCenterGap}`}
                    >
                      {getParseInt(
                        selectedVariant?.after_electricity_bill_percentage
                      )}
                      % {downArrow()}
                    </div>
                  </div>
                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Annual CO2 Emissions
                    </div>
                    <div className={`${styles.cardText2}`}>
                      {getParseInt(selectedVariant?.after_annual_CO2_emmisions)}
                      kg
                    </div>
                    <div
                      className={`${styles.cardText3} ${styles.greenText} ${styles.flexCenterGap}`}
                    >
                      {getParseInt(selectedVariant?.after_CO2_percentage)}%{' '}
                      {parseInt(
                        selectedVariant?.before_annual_CO2_emmisions,
                        10
                      ) <
                      parseInt(selectedVariant?.after_annual_CO2_emmisions, 10)
                        ? upArrow()
                        : downArrow()}
                    </div>
                  </div>
                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      Est. Annual Energy Bill Reduction
                    </div>
                    <div className={`${styles.cardText2} ${styles.greenText}`}>
                      {getParseInt(
                        selectedVariant?.after_electricity_bill_percentage
                      )}
                      % {downArrow()}
                    </div>
                  </div>
                  <div className={`${styles.infoCard}`}>
                    <div className={`${styles.cardText1}`}>
                      {webLeadType === 1 && (
                        <>
                          {selectedVariant?.battery_kWh !== 1
                            ? 'Est. Annual Intelligent (Octopus Flux Bonus)'
                            : 'Est. Annual Export Earnings (Standard Energy Export Tariff)'}
                        </>
                      )}
                      {webLeadType === 2 && (
                        <>
                          {selectedVariant?.combo_name.includes('ESS') === true
                            ? 'Est. Annual Intelligent (Octopus Flux Bonus)'
                            : 'Est. Annual Intelligent'}
                        </>
                      )}
                    </div>
                    <div
                      className={`${styles.cardText2} ${styles.flexCenterGap}`}
                    >
                      £
                      {getParseInt(
                        selectedVariant?.EstimatedExportEarnings -
                          selectedVariant?.EstimatedExportEarningsWithoutBattery
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {webLeadType === 1 && (
                <>
                  <div className={`${styles.disclaimerText1}`}>
                    Registered address: Ffynnon Menter, Phoenix Way, Swansea, West Glamorgan, Wales, SA7 9HZ. Company Registration Number is: 09959339. Registered in England and Wales.
                  </div>
                </>
              )}
              {webLeadType === 2 && (
                <>
                  <div className={`${styles.disclaimerText1}`}>
                    *Savings and performance figures are based on MCS data and
                    are provided as estimates for illustrative purposes only. If
                    you proceed with your enquiry, one of our experts will
                    conduct a detailed design, providing you with more accurate
                    figures and comprehensive information about your panels,
                    including their placement and performance.
                  </div>
                </>
              )}
              <div className={`${styles.disclaimerText2}`}>
                Consumer Energy Solutions Limited is authorised and regulated by the Financial Conduct Authority FRN 930823. We act as a credit broker not a lender and offer finance from JN Bank UK Ltd. Credit is subject to terms and conditions and affordability.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SolarSavingsPopup;
