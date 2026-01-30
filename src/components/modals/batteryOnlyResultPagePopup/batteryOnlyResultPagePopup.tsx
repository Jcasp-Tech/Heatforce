import Image from "next/image";
import styles from "../resultPagePopupModal/resultPagePopup.module.scss";
// import PrimaryProductImageSpliderPopup from "../productImageSpliderModa;/primaryProductImageSpliderPopup";
// import { useState } from "react";
import { getParseFloat, getParseInt } from "@/components/NumberFunctions";
import { addCommas } from "@/utils/helpers";
// import CalculationsDrawer from "../calculatorModal/calculationsDrawer";
import { event, EVENTENUMS } from "@/components/Pixel/facebook/lib/fpixel";
import { updateUserInfoQuoteWebLeadDataAPI } from "@/redux/services/general.api";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrimaryProductImageSpliderPopup from "../productImageSpliderModa;/primaryProductImageSpliderPopup";
import MiniCalculationDrawer from "../resultPagePopupModal/MiniFinaceCalculator/MiniFinanceCalculator";

export interface BatteryOnlyResultPagePopupProps {
    setDisableScroll: (value: boolean) => void;
    setOpenBatteryOnlyResultPagePopUp: (value: boolean) => void;
    setOpenBatterySavingPopup: (value: boolean) => void;
    setOpenFinanceCalculatorPopup: (value: boolean) => void;
    orderTotal: number;
    userDepositAmount: number;
    quoteData: any;
    setIsPopupInPopup: (value: boolean) => void;
    OBJCOMBO: any
    globalMonthly: number
    totalPrice: number;
    // handleRangeChange: (d: any) => void;
    // setSelectedMonths: (d: any) => void;
    twelveMonths: number;
    sixtyMonths: number;
    monthly: number;
    loan: number;
    interest: number;
    RangeFinance: number;
    selectedMonths: number;
    totalEstimatedPrice: number;
    saveLeadData: any;
    panelCount: any;
    addDataForSorting: any;
    openingModalName?: modalEnum[];
    setOpeningModalName: (d: any) => void;
    changePopupData: (d: any) => void;
    scrolltoSection: any;
    comboData: any;
}

enum modalEnum {
    openBatteryOnlyResultPagePopup = 'openBatteryOnlyResultPagePopup',
    closeBatteryOnlyResultPagePopup = 'closeBatteryOnlyResultPagePopup',
    batterySavingPopup = 'batterySavingPopup',
    closeBatterySavingPopup = 'closeBatterySavingPopup',
    financeCalculatorPopup = 'financeCalculatorPopup',
    closeFinanceCalculatorPopup = 'closeFinanceCalculatorPopup',
}

const BatteryOnlyResultPagePopup = (props: BatteryOnlyResultPagePopupProps) => {
    const { setDisableScroll,


        // setIsImageSpliderOpen,
        setIsPopupInPopup,
        OBJCOMBO,


        // twelveMonths, sixtyMonths,

        totalEstimatedPrice,

        addDataForSorting,
        setOpeningModalName,
        changePopupData,
        scrolltoSection,
        comboData
    } = props
    // const { optimisers, inverters, battery, solar_panels } = OBJCOMBO;
    // const logData=JSON.parse(props.quoteData?.leadData?.log)
    const [isImageSpliderOpen, setIsImageSpliderOpen] = useState(false);
    const [selectedSliderImage, setSelectedSliderImage] = useState<any>(null);
    const [selectedSliderImagePath, setSelectedSliderImagePath] = useState<any>
        (OBJCOMBO?.selectedCombo?.combo_image?.path);
    const logData: any = JSON.parse(OBJCOMBO?.leadData?.log ?? '{}')
    const [RangeFinance, setRangeFinance] = useState(OBJCOMBO?.leadData?.lead_status === "CONFIRM" ? logData?.RangeFinance ?? OBJCOMBO?.RangeFinance : OBJCOMBO?.RangeFinance);
    const [selectedMonths, setSelectedMonths] = useState(OBJCOMBO?.leadData?.lead_status === "CONFIRM" ? logData?.selectedMonths ?? OBJCOMBO?.selectedMonths : OBJCOMBO?.selectedMonths);
    const [SixtyMonths, setSixtyMonths] = useState(OBJCOMBO?.sixtyMonths ?? 0);
    const [TwelveMonths, setTwelveMonths] = useState(OBJCOMBO?.twelveMonths ?? 0);
    const [GlobalMonthly, setGlobalMonthly] = useState(OBJCOMBO?.globalMonthly ?? 0);
    const [Monthly, setMonthly] = useState(OBJCOMBO?.monthly ?? 0);
    const [Loan, setLoan] = useState(OBJCOMBO?.loan ?? 0);
    const [Interest, setInterest] = useState(OBJCOMBO?.interest ?? 0);
    const [OrderTotal, setOrderTotal] = useState(OBJCOMBO?.orderTotal ?? 0);
    const [UserDepositAmount, setUserDepositAmount] = useState(OBJCOMBO?.userDepositAmount ?? 0);
    const [newQuoteData, setNewquoteData] = useState({ ...OBJCOMBO });
    const [isMobile, setIsMobile] = useState(false)
    const handleRangeChange = (val: any) => {
        setRangeFinance(Number(val)); // Adjusts to value as number
    };

    const calLoan = (result: any) => {
        setGlobalMonthly(result.monthlyPayment);
        setMonthly(result.monthlyPayment);
        setLoan(result.loanAmount);
        setOrderTotal(result.totalRepayment);
        setInterest(result.costOfFinance);
    };

    const inverter_variation1: any = Object.values(newQuoteData?.inverters.more)[0]

    const inverter_variation1_image = inverter_variation1.inverter_image

    const inverter_variation2: any = Object.values(newQuoteData?.inverters.more)[1]

    const inverter_variation2_image = inverter_variation2.inverter_image

    const inverter_variation1_pdf = inverter_variation1.inverter_pdf
    const inverter_variation2_pdf = inverter_variation2.inverter_pdf




    const router = useRouter()
    // const handleRangeChange = (e: any) => {
    //   setDepositAmountPer(e.target.value);
    // };
    const saveCurrentPackageInfo = useCallback(async (quoteData) => {
        let combo = quoteData?.combo.filter(item => item.combo_name === quoteData?.selectedCombo?.combo_name)

        let dataToSave = {
            postalCode: quoteData?.postalCode || "",
            ownership: quoteData?.ownership || "",
            property: quoteData?.property || "",
            floors: quoteData?.floors || "",
            bedrooms: quoteData?.bedrooms || "",
            occupants: quoteData?.occupants || "",
            energy_routine: quoteData?.energy_routine || "",
            energy_usage: quoteData?.energy_usage || 0,
            no_energy_usage:
                quoteData?.no_energy_usage,
            annual_energy_usage: quoteData?.annual_energy_usage || 0,
            roof_space: quoteData?.roof_space || "",
            location: quoteData?.location || "",
            total_panels: quoteData?.totalPanels || 0,
            total_Price: quoteData?.totalEstimatedPrice || 0,
            monthly_apr_from: quoteData?.globalMonthly,
            after_solar: quoteData?.new_after_solar || 0,
            before_solar: quoteData?.before_solar || 0,
            estimated_annual_energy: quoteData?.estimated_annual_energy || 0,
            estimated_co2_reduction: quoteData?.before_annual_CO2_emmisions -
                quoteData?.after_annual_CO2_emmisions || 0,
            annual_saving: getParseInt(quoteData?.before_solar) -
                getParseInt(quoteData?.new_after_solar) +
                getParseInt(quoteData?.EstimatedExportEarnings) || 0,
            payback_time: quoteData?.financePaybackTime || 0,
            cash_payback_time: quoteData?.cashPaybackTime || 0,

            export_earning: quoteData?.EstimatedExportEarnings || 0,
            panel_name: quoteData?.solar_panels?.solar_panel_name || "",
            panel_feature: quoteData?.solar_panels?.features || "",
            inverter_name: quoteData?.inverters?.inverter_name || "",
            inverter_feature: quoteData?.totalPanels > 16 ? inverter_variation2.features || "" : inverter_variation1.features || "",
            inverter_variation: quoteData?.totalPanels > 16 ? inverter_variation2.inverter_kWh || "" : inverter_variation1.inverter_kWh || "",
            battery_name: quoteData?.selectedCombo?.battery_name || "",
            battery_feature: quoteData?.selectedCombo?.features || "",
            battery_kWh: quoteData?.selectedCombo?.battery_kWh || "",
            combo: combo?.[0],
            battery_size: 'none',
            lead_status: quoteData?.lead_status || "",
            log: JSON.stringify({ ...quoteData, globalMonthly: quoteData.globalMonthly, monthly: quoteData.monthly, sixtyMonths: quoteData.sixtyMonths, twelveMonths: quoteData.twelveMonths, selectedMonths: quoteData.selectedMonths, interest: quoteData.interest, loan: quoteData.loan, RangeFinance: quoteData.RangeFinance }),
            randomstring: quoteData?.randomstring || "",
            battery_brand: quoteData?.selectedCombo?.battery_brand_name || "",
        };

        const toastId = toast.loading(
            'Saving Current Chosen Packages ,Please Wait!'
        );

        try {
            await updateUserInfoQuoteWebLeadDataAPI(dataToSave)
            {
                toast.success(
                    'Successfully Save the Current chosen package, Fill in your Details in the form to Confirm Your Booking!',
                    { id: toastId, duration: 3000 }
                );
                router.push(`/save/${dataToSave.randomstring}`);
            }
        } catch (error) {
            toast.error('Error Occurred Please Try Again!', { id: toastId });
        } finally {
            // setLoading(false)
            // setOpenSaveEstimatePopup(false),setDisableScroll(false)
        }
    }, [newQuoteData, OBJCOMBO, RangeFinance, selectedMonths, newQuoteData?.totalEstimatedPrice])
    const saveLeadData = useCallback(async () => {
        saveCurrentPackageInfo(newQuoteData)
    },

        [newQuoteData, OBJCOMBO, RangeFinance, selectedMonths, selectedMonths, newQuoteData?.totalEstimatedPrice])
    useEffect(() => {
        try {

            if (newQuoteData?.totalEstimatedPrice) {
                const depositAmount =
                    (RangeFinance / 100) * newQuoteData?.totalEstimatedPrice;
                console.log(
                    'depositAmount',
                    depositAmount,
                    newQuoteData?.totalEstimatedPrice
                );
                setUserDepositAmount(Math.round(depositAmount));
                if (typeof window !== 'undefined' && window.VendigoCalculatorWidget) {

                    const result = new window.VendigoCalculatorWidget().calculate(
                        newQuoteData?.totalEstimatedPrice,
                        depositAmount,
                        9.9,
                        selectedMonths,
                        0
                    );

                    calLoan(result);

                    const result1 = new window.VendigoCalculatorWidget().calculate(
                        newQuoteData?.totalEstimatedPrice,
                        depositAmount,
                        9.9,
                        120,
                        0
                    );

                    setTwelveMonths(result1.monthlyPayment);

                    const result3 = new window.VendigoCalculatorWidget().calculate(
                        newQuoteData?.totalEstimatedPrice,
                        depositAmount,
                        9.9,
                        60,
                        0
                    );

                    setSixtyMonths(result3.monthlyPayment);
                } else {
                    throw new Error('VendigoCalculatorWidget is not available.');
                }

            }
        } catch (error) {
        }
    }, [RangeFinance, selectedMonths, newQuoteData?.totalEstimatedPrice]);


    useEffect(() => {

        if (newQuoteData?.financePaybackTime) {
            addDataForSorting(newQuoteData)
        }
    }, [newQuoteData])

    const features = OBJCOMBO?.selectedCombo?.combo_features.split(/\r?\n/).map(item => item.trim());
    const allFeatures = [...features];
    useEffect(() => {
        if (OrderTotal && newQuoteData?.before_solar && newQuoteData?.new_after_solar && newQuoteData?.EstimatedExportEarnings && newQuoteData?.totalEstimatedPrice) {
            setNewquoteData((prev) => {
                return {
                    ...prev, ...OBJCOMBO, orderTotal: OrderTotal, RangeFinance: RangeFinance, userDepositAmount: UserDepositAmount, sixtyMonths: SixtyMonths, twelveMonths: TwelveMonths, globalMonthly: GlobalMonthly, monthly: Monthly, loan: Loan, interest: Interest, selectedMonths
                    , financePaybackTime: ((Number(OrderTotal) + Number(UserDepositAmount)) /
                        (getParseInt(newQuoteData?.before_solar) -
                            getParseInt(newQuoteData?.new_after_solar) +
                            getParseInt(newQuoteData?.EstimatedExportEarnings))),
                    cashPaybackTime: Number(newQuoteData?.totalEstimatedPrice) /
                        (Number(newQuoteData?.before_solar) -
                            Number(newQuoteData?.new_after_solar) +
                            Number(newQuoteData?.EstimatedExportEarnings))

                }
            })
        }
    }, [OrderTotal, UserDepositAmount, Interest]);

    const displaySquareTickImg = () => {
        return (
            <Image quality={100} className={`${styles.squareTickImg}`} width={999} height={999} src="/images/resultPopupModule/square-tick.webp" alt="square-tick" />
        )
    }

    const displayEstimatedStatsBlocksSection = () => {
        return (
            <div className={`${styles.estimatedStatsBlocksSection}`}
                data-aos="zoom-in">

                <div className={`${styles.e4e7eb_BG} ${styles.estimatedStatsBlock}`} style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setOpeningModalName((prev) => {
                            let newarr = prev.filter((name) => name !== modalEnum.closeBatterySavingPopup)
                            return [...newarr, modalEnum.batterySavingPopup]
                        });
                        setDisableScroll(true)
                    }}>
                    <div className={` ${styles.titleText} ${styles.bottomBorderSolidGreyDesktop}`}

                    >Estimated Annual Electricity Bill</div>
                    <div className={`d-flex justify-content-between`}>
                        <div>
                            <div className={` ${styles.descriptionText1} `}>Before solar</div>
                            <div className={` ${styles.numbersText1}`}>£{addCommas(getParseInt(newQuoteData?.before_solar))}</div>
                        </div>
                        <div>
                            <div className={` ${styles.descriptionText1} `}>After solar</div>
                            <div className={` ${styles.numbersText1}`}>£{addCommas(getParseInt(newQuoteData?.new_after_solar))}</div>
                        </div>
                        <div>
                            <div className={` ${styles.descriptionText1} `}>Bill Reduction</div>
                            <div className={` ${styles.numbersText1} ${styles.greenFont}`}>{getParseInt(
                                newQuoteData?.after_electricity_bill_percentage
                            )}%</div>
                        </div>
                    </div>
                </div>


                <div className={`${styles.e4e7eb_BG}  ${styles.estimatedStatsBlock} d-flex justify-content-between align-items-center`}>
                    <div className={` ${styles.titleText}`}>Estimated Export Earnings</div>
                    <div className={` ${styles.numbersText2}  ${styles.greenFont}`}>£{addCommas(
                        getParseInt(newQuoteData?.EstimatedExportEarnings)
                    )}</div>
                </div>


                <div className={`${styles.e4e7eb_BG} ${styles.estimatedStatsBlock}`}>
                    <div className={` ${styles.titleText}`}>Payback time (ROI)</div>
                    <div className={`${styles.gap2} d-flex `}>
                        <div>
                            <div className={` ${styles.numbersText1}`}>{`${newQuoteData?.financePaybackTime?.toFixed(1)} Years`}</div>
                            <div className={`${styles.descriptionText21}`}>Estimated Return of investment on finance</div>
                        </div>
                        <div className={` ${styles.CashPurchasesDiv}`}>
                            <div className={` ${styles.numbersText1}`}>{`${newQuoteData?.cashPaybackTime?.toFixed(1)} Years`}</div>
                            <div className={`${styles.descriptionText21}`} >Estimated Return of investment cash purchases</div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    const displayBookCallBackForFreeSurvey = (comboName) => {
        return (
            <div className='animationBorder borderRadius10px z-0 w-100'>
                <div className='m1px position-rel z-1 w-100'>
                    <div className="d-flex "
                        data-aos="zoom-in">
                        <div onClick={() => { event(EVENTENUMS.InitiateCheckout, { 'package_name': comboName, 'content_type': 'package' }); saveLeadData() }} className={`${styles.bookCallBackForFreeSurvey} `}>
                            Enquire about this package
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const displayEnquireAboutThisPackage = (comboName) => {
        return (

            <div onClick={() => { event(EVENTENUMS.InitiateCheckout, { 'package_name': comboName, 'content_type': 'package' }); saveLeadData() }} className={`${styles.bookCallBackForFreeSurvey}`}>
                Enquire about this package
            </div>
        )
    }
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 992);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (

        <>
            <div className={`${styles.resultPagePopup}`} >
                <div onClick={() => {
                    scrolltoSection()


                    setOpeningModalName((prev) => {
                        let newarr = prev.filter((name) => name !== modalEnum.openBatteryOnlyResultPagePopup)
                        return [...newarr, modalEnum.closeBatteryOnlyResultPagePopup]
                    })




                    setDisableScroll(false), setIsPopupInPopup(false)
                }} className={`${styles.transparentContainer} `}
                    data-aos="zoom-in">
                    {isImageSpliderOpen && selectedSliderImage &&
                        (
                            <PrimaryProductImageSpliderPopup
                                {
                                ...{
                                    setIsImageSpliderOpen,
                                    selectedVariant:OBJCOMBO,
                                    selectedIndex: selectedSliderImage
                                }
                                }
                            />
                        )
                    }
                    {isImageSpliderOpen && selectedSliderImage &&
                        (
                            <PrimaryProductImageSpliderPopup
                                {
                                ...{
                                    setIsImageSpliderOpen,
                                    selectedVariant:OBJCOMBO,
                                    selectedIndex: selectedSliderImage
                                }
                                }
                            />
                        )
                    }


                    <div className={`${styles.dialogBox}  `} id='scrollcontianer' onClick={(e) => { e.stopPropagation() }}>
                        <div className={`${styles.closeButton}`}
                            onClick={() => {
                                scrolltoSection()

                                setOpeningModalName((prev) => {
                                    let newarr = prev.filter((name) => name !== modalEnum.openBatteryOnlyResultPagePopup)
                                    return [...newarr, modalEnum.closeBatteryOnlyResultPagePopup]
                                }),



                                    setDisableScroll(false), setIsPopupInPopup(false)
                            }} >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </div>
                        <div className={`${styles.leftSection}`}>
                            <div className={`${styles.widthLimiterLeft} `}>

                                <div className={`${styles.primaryProductImageComponent}`}>
                                    <div className={`${styles.topDiv}`}>
                                        <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '30%', height: 'auto' }} src={OBJCOMBO?.selectedCombo?.battery_brand_image?.path} alt="product" />
                                        {/* <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '30%', height: 'auto' }} src="/images/resultPopupModule/GivEnergy-2023-Logo-Blue.webp" alt="product" /> */}
                                    </div>

                                    <div className="resultPagePopupImageMainDiv">
                                        <div className={`${styles.imageSlider} cursor-pointer componentsImageDiv `}
                                        >
                                            <div onClick={() => { setSelectedSliderImage(1), setSelectedSliderImagePath(OBJCOMBO?.selectedCombo?.combo_image?.path) }} >
                                                <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={`${OBJCOMBO?.selectedCombo?.combo_image?.path}`} alt="product" />
                                            </div>
                                            {/* <div onClick={() => { setSelectedSliderImage(1), setSelectedSliderImagePath(OBJCOMBO?.solar_panels?.solar_panel_image?.path) }} >
                                                <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={`${OBJCOMBO?.solar_panels?.solar_panel_image?.path}`} alt="product" />
                                            </div> */}
                                            {OBJCOMBO?.totalPanels > 16 ?
                                                (
                                                    <div onClick={() => { setSelectedSliderImage(3), setSelectedSliderImagePath(inverter_variation2_image?.path) }}>
                                                        <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={`${inverter_variation2_image?.path}`} alt="product" />
                                                    </div>
                                                ) : (
                                                    <div onClick={() => { setSelectedSliderImage(3), setSelectedSliderImagePath(inverter_variation1_image?.path) }}>
                                                        <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={`${inverter_variation1_image?.path}`} alt="product" />
                                                    </div>
                                                )
                                            }
                                            {/* <div onClick={() => { setSelectedSliderImage(3), setSelectedSliderImagePath(OBJCOMBO?.inverters?.inverter_image?.path) }}>
                                                <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={`${OBJCOMBO?.inverters?.inverter_image?.path}`} alt="product" />
                                            </div> */}
                                            {/* <div onClick={() => { setSelectedSliderImage(2), setSelectedSliderImagePath(OBJCOMBO?.optimisers?.optimiser_image?.path) }}>
                                                <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={`${OBJCOMBO?.optimisers?.optimiser_image?.path}`} alt="product" />
                                            </div>*/}
                                            {OBJCOMBO?.battery_kWh !== '1' && <div onClick={() => { setSelectedSliderImage(4), setSelectedSliderImagePath(OBJCOMBO?.selectedCombo?.battery_image?.path) }}>
                                                <Image quality={100} className={``} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={`${OBJCOMBO?.selectedCombo?.battery_image?.path}`} alt="product" />
                                            </div>} 
                                        </div>
                                        <div className="comboImageDiv">
                                            <Image quality={100} className={``} width={200} height={200} style={{ objectFit: 'contain', mixBlendMode: "multiply" }} src={`${selectedSliderImagePath || null}`} alt="product" />
                                        </div>
                                    </div>
                                </div>


                                <div className={`${styles.hideInMobile}`}>
                                    {displayEstimatedStatsBlocksSection()}
                                </div>

                                <div className={`${styles.showMoreSection} ${styles.solidUnderlineGrey} ${styles.hideInMobile} text-end cursor-pointer`}
                                    onClick={() => {
                                        changePopupData(newQuoteData?.combo_name);
                                        setOpeningModalName((prev) => {
                                            let newarr = prev.filter((name) => name !== modalEnum.closeBatterySavingPopup)
                                            return [...newarr, modalEnum.batterySavingPopup]
                                        });
                                    }}>
                                    show more
                                </div>
                                <div />
                                {/* <div className={`${styles.specsSection}`}>
                                    <div className={`${styles.titleText}`}>
                                        Specs
                                    </div>
                                    <div className={`${styles.descriptionText}`}>
                                        <div>
                                            <div className="d-flex align-items-center">
                                                {displayCircleTickImg()}
                                                {parseInt(OBJCOMBO?.solar_panels?.solar_panel_kWh || 0) * 0.001} Kwh panels
                                            </div>
                                            <div className="d-flex align-items-center">
                                                {displayCircleTickImg()}
                                                All black design
                                            </div>
                                            <div className="d-flex align-items-center">
                                                {displayCircleTickImg()}
                                                ~20% more power
                                            </div>
                                        </div>
                                        <div>
                                            <div className="d-flex align-items-center">
                                                {displayCircleTickImg()}
                                                Bi-facial panel
                                            </div>
                                            <div className="d-flex align-items-center">
                                                {displayCircleTickImg()}
                                                Australian design
                                            </div>
                                            <div className="d-flex align-items-center">
                                                {displayCircleTickImg()}
                                                Optimised for low-light
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className={`${styles.rightSection}`}>
                            <div className={`${styles.widthLimiterRight}`}>
                                <div className={`${styles.rightsideTitle}`}>
                                    {`${newQuoteData.combo_name} ${newQuoteData?.battery?.battery_kWh === '1' ? `(No Battery Required)` : ''}`}
                                </div>


                                <div className={`${styles.priceEstimateMonthlyPeriodWithImg}`}>

                                    <div>
                                        <div className={`${styles.text1}`}>Price estimate</div>
                                        <div className={`${styles.text2}`}>£{addCommas(getParseInt(totalEstimatedPrice))}</div>
                                    </div>

                                    <div className="cursor-pointer"
                                        onClick={() => {
                                            const container = document.getElementById(isMobile ? 'minicalculatormobile' : 'minicalculatordesktop');
                                            container?.scrollIntoView({ behavior: 'smooth', block: 'start' });

                                        }}>
                                        <div className={`${styles.text1}`}>or, monthly</div>
                                        <div className={`${styles.text2} ${styles.dottedUnderline}`}>
                                            £{addCommas(getParseFloat(newQuoteData?.globalMonthly).toFixed(2))}
                                            <span className={`${styles.perMonth} ${styles.hideInDesktop}`}>
                                                per month
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {newQuoteData?.leadData?.lead_status !== "CONFIRM" && <div className='animationBorder borderRadius10px widthFitContentDesktop z-0'>
                                    <div className='m1px position-rel z-1 w-100'>
                                        <div className="d-flex "
                                            data-aos="zoom-in">
                                            {newQuoteData?.combo_name && displayEnquireAboutThisPackage(newQuoteData?.combo_name)}
                                        </div>
                                    </div>
                                </div>}


                                <div className={`${styles.squareTickWithTextSection}`}>
                                    {allFeatures.map((item, index) => {
    
                                        return (
                                            <div key={index} className={`${styles.mobileW100}`}>
                                                {displaySquareTickImg()}
                                                {
                                                item
                                                }
                                            </div>
                                        )
                                    })}

                                </div>

                                <div className={`${styles.hideInDesktop}`}>
                                    {displayEstimatedStatsBlocksSection()}
                                </div>

                                <div className={`${styles.showMoreSection} ${styles.solidUnderlineGrey} ${styles.hideInDesktop} text-end`}
                                    onClick={() => {
                                        changePopupData(newQuoteData?.combo_name);

                                        setOpeningModalName((prev) => {
                                            let newarr = prev.filter((name) => name !== modalEnum.closeBatterySavingPopup)
                                            return [...newarr, modalEnum.batterySavingPopup]
                                        });
                                    }}>
                                    show more
                                </div>
                                <div className={styles.hideInDesktop} id="minicalculatormobile" >

                                    <MiniCalculationDrawer userDepositAmount={newQuoteData?.userDepositAmount} RangeFinance={newQuoteData?.RangeFinance} getParseInt={getParseInt} handleRangeChange={handleRangeChange}

                                        setSelectedMonths={setSelectedMonths} twelveMonths={newQuoteData?.twelveMonths} sixtyMonths={newQuoteData?.sixtyMonths} monthly={newQuoteData?.monthly} loan={newQuoteData?.loan} interest={newQuoteData?.interest} selectedMonths={selectedMonths} totalEstimatedPrice={newQuoteData?.totalEstimatedPrice} orderTotal={newQuoteData?.orderTotal} leadStatus={newQuoteData.leadData.lead_status} />
                                </div>
                                <div className={`${styles.hideInDesktop}`}>
                                    {newQuoteData?.combo_name && displayBookCallBackForFreeSurvey(newQuoteData?.combo_name)}
                                </div>
                                <div />


                                <div className={`${styles.hideInMobile}`} id="minicalculatordesktop" >
                                    <MiniCalculationDrawer userDepositAmount={newQuoteData?.userDepositAmount} RangeFinance={newQuoteData?.RangeFinance} getParseInt={getParseInt} handleRangeChange={handleRangeChange}

                                        setSelectedMonths={setSelectedMonths} twelveMonths={newQuoteData?.twelveMonths} sixtyMonths={newQuoteData?.sixtyMonths} monthly={newQuoteData?.monthly} loan={newQuoteData?.loan} interest={newQuoteData?.interest} selectedMonths={selectedMonths} totalEstimatedPrice={newQuoteData?.totalEstimatedPrice} orderTotal={newQuoteData?.orderTotal} leadStatus={newQuoteData.leadData.lead_status} />
                                </div>

                                <div className={`${styles.hideInDesktop}`}>

                                    <div className={`${styles.rightsideCardHeaders}`}>
                                        Package Product Datasheets
                                    </div>

                                    <div className={`${styles.gridPdfForBattery}  mt-2`}    >
                                        {
                                            OBJCOMBO?.selectedCombo?.battery_pdf?.path && (
                                                <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                                                    onClick={() => window.open(OBJCOMBO?.selectedCombo?.battery_pdf?.path)}>
                                                    <div className={`${styles.rightsideCardProductDiv}`}>
                                                        <Image quality={100} className={`${styles.hFill} `} width={45} height={45} src="/images/resultPopupModule/_Path_.webp" alt="product" />
                                                    </div>
                                                    <div>
                                                        <div className={`${styles.text1} `}>{OBJCOMBO?.selectedCombo?.battery_name || OBJCOMBO?.battery_name}</div>
                                                        <div className={`${styles.text2} `}>Click to view</div>
                                                    </div>

                                                </div>
                                            )
                                        }
                                        {newQuoteData?.totalPanels > 16 ? (
                                            inverter_variation2_pdf && (
                                                <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                                                    onClick={() => window.open(inverter_variation2_pdf?.path)}>
                                                    <div className={`${styles.rightsideCardProductDiv}`}>
                                                        <Image quality={100} className={`${styles.hFill} `} width={45} height={45} src="/images/resultPopupModule/_Path_.webp" alt="product" />
                                                    </div>
                                                    <div>
                                                        <div className={`${styles.text1} `}>{OBJCOMBO?.inverters?.inverter_name}</div>
                                                        <div className={`${styles.text2} `}>Click to view</div>
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            inverter_variation1_pdf && (
                                                <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                                                    onClick={() => window.open(inverter_variation1_pdf?.path)}>
                                                    <div className={`${styles.rightsideCardProductDiv}`}>
                                                        <Image quality={100} className={`${styles.hFill} `} width={45} height={45} src="/images/resultPopupModule/_Path_.webp" alt="product" />
                                                    </div>
                                                    <div>
                                                        <div className={`${styles.text1} `}>{OBJCOMBO?.inverters?.inverter_name}</div>
                                                        <div className={`${styles.text2} `}>Click to view</div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                        }
                                    </div>
                                </div>



                                <div className={`${styles.rightsideCardHeaders}`}>
                                    What your package includes...
                                </div>
                                <div className={`${styles.desktopFlex1ForBattery}`}>
                                    {OBJCOMBO.inverters && (
                                        <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard1ForBattery}`}>
                                            <div className={`${styles.rightsideCardProductDiv} bg-white`}>
                                                <Image quality={100} className={`${styles.hFill} ${styles.padding04}`} width={45} height={45}
                                                    src={newQuoteData?.totalPanels > 16 ? inverter_variation2_image?.path : inverter_variation1_image?.path || "/images/resultPopupModule/meyer-burger-black-angle.webp"}
                                                    alt={OBJCOMBO.inverters.inverter_name} />
                                            </div>
                                            <div>
                                                <div className={`${styles.text1}`}>1 X {newQuoteData?.totalPanels > 16 ? inverter_variation2?.inverter_kWh : inverter_variation1?.inverter_kWh}  kWh {OBJCOMBO.inverters.inverter_name}</div>
                                                <div className={`${styles.text2}`}>Hybrid Inverter</div>
                                            </div>
                                        </div>
                                    )}

                                    {OBJCOMBO && OBJCOMBO?.battery_kWh !== '1' && OBJCOMBO?.battery_unique_id !== "NoBattery" && (
                                        <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard1ForBattery}`}>
                                            <div className={`${styles.rightsideCardProductDiv} bg-white`}>
                                                <Image quality={100} className={`${styles.hFill} ${styles.padding04}`} width={45} height={45}
                                                    src={OBJCOMBO?.selectedCombo?.battery_image?.path || "/images/resultPopupModule/meyer-burger-black-angle.webp"}
                                                    alt={comboData?.battery?.battery_name || OBJCOMBO?.battery_name} />
                                            </div>
                                            <div>
                                                <div className={`${styles.text1}`}>1 X {OBJCOMBO?.battery?.battery_name || OBJCOMBO?.battery?.battery_name}</div>
                                                <div className={`${styles.text2}`}>{OBJCOMBO?.selectedCombo?.battery_kWh} kWh Battery</div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                                <div className={`${styles.rightsideCardHeaders}`}>
                                    What else is included...
                                </div>

                                <div className={`${styles.desktopgrid2ForBattery}`}>
                                    <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}>
                                        <div className={`${styles.rightsideCardProductDiv} bg-white`}>
                                            <Image quality={100} className={`${styles.wFill} `} width={45} height={45} src="/images/resultPopupModule/_Clip Group_.webp" alt="product" />
                                        </div>

                                        <div className="productInfoDiv">
                                            <div className={`${styles.text1}`}>Full MCS installation</div>
                                            <div className={`${styles.text2}`}>Inc. all required paperwork</div>
                                        </div>
                                    </div>

                                    <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}>
                                        <div className={`${styles.rightsideCardProductDiv} bg-white`}>
                                            <Image quality={100} className={`${styles.wFill} ${styles.padding04} `} width={45} height={45} src="/images/resultPopupModule/_Group_ (3).webp" alt="product" />
                                        </div>
                                        <div>
                                            <div className={`${styles.text1}`}>Electrical installation</div>
                                            <div className={`${styles.text2}`}>Inc. all required cables and fittings</div>
                                        </div>
                                    </div>

                                    <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}>
                                        <div className={`${styles.rightsideCardProductDiv} bg-white`}>
                                            <Image quality={100} className={`${styles.wFill} `} width={45} height={45} src="/images/resultPopupModule/_Clip Group_ (1).webp" alt="product" />
                                        </div>

                                        <div>
                                            <div className={`${styles.text1}`}>HIES protection</div>
                                            <div className={`${styles.text2}`} >2 year deposit protection</div>
                                        </div>
                                    </div>

                                    <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}>
                                        <div className={`${styles.rightsideCardProductDiv} bg-white`}>
                                            <Image quality={100} className={`${styles.hFill} ${styles.padding04} `} width={45} height={45} src="/images/resultPopupModule/_Group_.webp" alt="product" />
                                        </div>
                                        <div>
                                            <div className={`${styles.text1}`}>DNO (grid supplier) application</div>
                                            <div className={`${styles.text2}`}>Inc. all required paperwork</div>
                                        </div>
                                    </div>

                                </div>

                                <div className={`${styles.hideInMobile}`} >
                                    <div className={`${styles.rightsideCardHeaders}`} style={{ marginBottom: "6px" }}>
                                        Package Product Datasheets
                                    </div>

                                    <div className={`${styles.gridPdfForBattery}`}>
                                        {
                                            OBJCOMBO?.selectedCombo?.battery_pdf?.path && (
                                                <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                                                    onClick={() => window.open(OBJCOMBO?.selectedCombo?.battery_pdf?.path)}>
                                                    <div className={`${styles.rightsideCardProductDiv}`}>
                                                        <Image quality={100} className={`${styles.hFill} `} width={45} height={45} src="/images/resultPopupModule/_Path_.webp" alt="product" />
                                                    </div>
                                                    <div>
                                                        <div className={`${styles.text1} `}>{OBJCOMBO?.selectedCombo?.battery_name || OBJCOMBO?.battery_name}</div>
                                                        <div className={`${styles.text2} `}>Click to view</div>
                                                    </div>

                                                </div>
                                            )
                                        }

                                        {newQuoteData?.totalPanels > 16 ? (
                                            inverter_variation2_pdf && (
                                                <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                                                    onClick={() => window.open(inverter_variation2_pdf?.path)}>
                                                    <div className={`${styles.rightsideCardProductDiv}`}>
                                                        <Image quality={100} className={`${styles.hFill} `} width={45} height={45} src="/images/resultPopupModule/_Path_.webp" alt="product" />
                                                    </div>
                                                    <div>
                                                        <div className={`${styles.text1} `}>{OBJCOMBO?.inverters?.inverter_name}</div>
                                                        <div className={`${styles.text2} `}>Click to view</div>
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            inverter_variation1_pdf && (
                                                <div className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                                                    onClick={() => window.open(inverter_variation1_pdf?.path)}>
                                                    <div className={`${styles.rightsideCardProductDiv}`}>
                                                        <Image quality={100} className={`${styles.hFill} `} width={45} height={45} src="/images/resultPopupModule/_Path_.webp" alt="product" />
                                                    </div>
                                                    <div>
                                                        <div className={`${styles.text1} `}>{OBJCOMBO?.inverters?.inverter_name}</div>
                                                        <div className={`${styles.text2} `}>Click to view</div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                        }
                                    </div>

                                </div>
                                {newQuoteData?.leadData?.lead_status !== "CONFIRM" && <div className={`${styles.hideInDesktop} `}>
                                    <div className='animationBorder borderRadius10px z-0 w-100'>
                                        <div className='m1px position-rel z-1 w-100'>
                                            <div className="d-flex">
                                                {newQuoteData?.combo_name && displayEnquireAboutThisPackage(newQuoteData?.combo_name)}
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BatteryOnlyResultPagePopup;
