import Image from "next/image";
import styles from "../solarSavingPopupModal/solarSavingsPopup.module.scss";
import { getParseInt } from "@/components/NumberFunctions";


export interface BatterySavingPopupProps {
    setDisableScroll: (value: boolean) => void;
    setOpenBatterySavingPopup: (value: boolean) => void;
    setIsPopupInPopup: (value: boolean) => void;
    isPopupInPopup: boolean;
    quoteData: any;
    OBJCOMBO: any
    setOpeningModalName: (d: any) => void
}


enum modalEnum {
    openBatteryOnlyResultPagePopup = 'openBatteryOnlyResultPagePopup',
    closeBatteryOnlyResultPagePopup = 'closeBatteryOnlyResultPagePopup',
    batterySavingPopup = 'batterySavingPopup',
    closeBatterySavingPopup = 'closeBatterySavingPopup',
    financeCalculatorPopup = 'financeCalculatorPopup',
    closeFinanceCalculatorPopup = 'closeFinanceCalculatorPopup',
}

const BatterySavingPopup = (props: BatterySavingPopupProps) => {
    const { setDisableScroll, isPopupInPopup,
        quoteData, 
        // OBJCOMBO,
        setOpeningModalName
    } = props

    const downArrow = () => {
        return (
            <>
                <Image quality={100} className={`${styles.greenArrowImg}`} width={20} height={40} sizes="100vw" src="/images/solarSavingsPopup/green-down-arrow.webp" alt="product" />
            </>
        )
    }

    const upArrow = () => {
        return (
            <>
                <Image quality={100} className={`${styles.greenArrowImg}`} width={20} height={40} sizes="100vw" src="/images/solarSavingsPopup/green-up-arrow.webp" alt="product" />
            </>
        )
    }

    return (
        <>
            <div className={`${styles.solarSavingsPopup}`}>
                <div className={`${styles.transparentContainer}`} onClick={() => {
                    setOpeningModalName((prev) => {
                        let newarr = prev.filter((name) => name !== modalEnum.batterySavingPopup)
                        return [...newarr, modalEnum.closeBatterySavingPopup]
                    })
                    setDisableScroll(isPopupInPopup ? true : false);
                }}>
                    <div className={`${styles.dialogBox}`}
                        data-aos="fade-left" onClick={(e) => e.stopPropagation()}  >

                        <div className={`${styles.closeButton}`}
                            onClick={() => {
                                setOpeningModalName((prev) => {
                                    let newarr = prev.filter((name) => name !== modalEnum.batterySavingPopup)
                                    return [...newarr, modalEnum.closeBatterySavingPopup]
                                })
                                setDisableScroll(isPopupInPopup ? true : false);
                            }}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgba(15, 59, 89, 0.05)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </div>

                        <div className={`${styles.contentSection}`}>

                            <div className={`${styles.solarSavings}`}>
                                Your battery savings
                            </div>

                            <div className={`${styles.basedOnInputText}`}>
                                Based on your input, here&apos;s how your battery installation could impact your home and energy bills.
                            </div>

                            <div className={`${styles.beforeAfterSolarSection}`}>
                                <div className="w-100">
                                    <div className={`${styles.withBatteryDesktop}`}>
                                        Without Battery
                                    </div>

                                    <div className={`${styles.withBatteryMobile}`}>
                                        Without<br />Battery
                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Annual Energy Consumption
                                        </div>
                                        <div className={`${styles.cardText2}`}>
                                            {quoteData?.annual_energy_usage || 0}kWh
                                        </div>
                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Annual Electricity Bill
                                        </div>
                                        <div className={`${styles.cardText2}`}>
                                            £{getParseInt(quoteData?.before_solar)}
                                        </div>
                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Annual CO2 Emissions
                                        </div>
                                        <div className={`${styles.cardText2}`}>
                                            {getParseInt(quoteData?.before_annual_CO2_emmisions)}kg
                                        </div>

                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Annual Savings
                                        </div>
                                        <div className={`${styles.cardText2} ${styles.flexCenterGap}`}>
                                            £{getParseInt(quoteData?.before_solar) -
                                                getParseInt(quoteData?.new_after_solar)
                                            }{' '}
                                            {upArrow()}
                                        </div>
                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Annual Export Earnings
                                        </div>
                                        <div className={`${styles.cardText2} ${styles.flexCenterGap}`}>
                                            £{getParseInt(quoteData?.EstimatedExportEarnings)}{' '}
                                            {upArrow()}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-100">
                                    <div className={`${styles.withBatteryDesktop}`}>
                                        With Battery
                                    </div>

                                    <div className={`${styles.withBatteryMobile}`}>
                                        With<br />Battery
                                    </div>

                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Useable Energy Produced
                                        </div>
                                        <div className={`${styles.cardText2} ${styles.greenText}`}>
                                            {getParseInt(quoteData?.estimated_annual_usable)}kWh
                                        </div>
                                        <div className={`${styles.cardText3} ${styles.greenText} ${styles.flexCenterGap}`}>
                                            {getParseInt(quoteData?.after_useable_percentage)}%{' '}
                                            {quoteData?.annual_energy_usage <
                                                quoteData?.estimated_annual_usable ? upArrow() : downArrow()}
                                        </div>
                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Annual Electricity Bill
                                        </div>
                                        <div className={`${styles.cardText2}`}>
                                            £{getParseInt(quoteData?.new_after_solar)}
                                        </div>
                                        <div className={`${styles.cardText3} ${styles.greenText} ${styles.flexCenterGap}`}>
                                            {getParseInt(quoteData?.after_electricity_bill_percentage)}%{' '}
                                            {downArrow()}
                                        </div>

                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Annual CO2 Emissions
                                        </div>
                                        <div className={`${styles.cardText2}`}>
                                            {getParseInt(quoteData?.after_annual_CO2_emmisions)}kg
                                        </div>
                                        <div className={`${styles.cardText3} ${styles.greenText} ${styles.flexCenterGap}`}>
                                            {getParseInt(quoteData?.after_CO2_percentage)}%{' '}
                                            {parseInt(quoteData?.before_annual_CO2_emmisions, 10) <
                                                parseInt(quoteData?.after_annual_CO2_emmisions, 10) ? upArrow() : downArrow()}
                                        </div>
                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            Est. Annual Energy Bill Reduction
                                        </div>
                                        <div className={`${styles.cardText2} ${styles.greenText}`}>
                                            {getParseInt(quoteData?.after_electricity_bill_percentage)}%{' '}
                                            {downArrow()}
                                        </div>
                                        {/* <div className={`${styles.cardText3} ${styles.greenText} ${styles.flexCenterGap}`}>
                                            {getParseInt(quoteData?.after_electricity_bill_percentage)}%{' '}
                                            {downArrow()}
                                        </div> */}
                                    </div>
                                    <div className={`${styles.infoCard}`}>
                                        <div className={`${styles.cardText1}`}>
                                            {/* Est. Annual Intelligent Octopus Flux Bonus */}
                                            {quoteData?. selectedCombo?.combo_name.includes("ESS") === true ? 'Est. Annual Intelligent (Octopus Flux Bonus)' : "Est. Annual Intelligent"}
                                        </div>
                                        <div className={`${styles.cardText2} ${styles.flexCenterGap}`}>
                                            £{getParseInt(quoteData?.EstimatedExportEarnings - quoteData?.EstimatedExportEarningsWithoutBattery)}
                                            {/* {upArrow()} */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className={`${styles.disclaimerText1}`}>
                                *Savings and performance figures are based on MCS data and are provided as estimates for illustrative purposes only. If you proceed with your enquiry, one of our experts will conduct a detailed design, providing you with more accurate figures and comprehensive information about your panels, including their placement and performance.
                            </div> */}
                            {/* <div className={`${styles.disclaimerText2}`}>
                                *Energy rate figures are based on Ofgem data (May - June 2024): Daily Standing Charge is 65.88 pence and Electricity Rate is 25.79 pence per kilowatt-hour (kWh). Export rate figures are 7.5 pence per kWh (No Battery, Octopus Outgoing Fixed Tariff) and 27 pence per kWh (With GivEnergy Battery, Octopus Intelligent Flux System). Rates are subject to market conditions and tariff updates. Actual savings may vary based on individual usage and system performance. Initial savings and performance figures are estimated using MCS data. Source: Octopus Energy, Ofgem and MCS data **Representative example. Cash price £6,936.00, less a deposit of £0. Total loan amount £10,770.02. Repayable by 120 monthly repayments of £145. Total charge for credit £3,834.02. Total amount repayable £10,770.02 (includes £0 deposit). Interest rate 9.9% per annum fixed. Representative APR 9.9%
                            </div> */}
                            <div className={`${styles.disclaimerText1}`}>
                                *Savings and performance figures are based on MCS data and are provided as estimates for illustrative purposes only. If you proceed with your enquiry, one of our experts will conduct a detailed design, providing you with more accurate figures and comprehensive information about your panels, including their placement and performance.
                            </div>
                            <div className={`${styles.disclaimerText2}`}>
                                Consumer Energy Solutions Limited is authorised and regulated by the Financial Conduct Authority FRN 930823. We act as a credit broker not a lender and offer finance from JN Bank UK Ltd. Credit is subject to terms and conditions and affordability.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BatterySavingPopup;
