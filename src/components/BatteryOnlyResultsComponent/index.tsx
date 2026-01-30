import { useCallback, useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import BatteryOnlyFirstPackageOps from "./batteryOnlyFirstPackageOps";
import RestartSurveyModal from "../modals/restartSurveyModal";
import SaveEstimationProgressPopup from "../modals/saveEstimatePopupModal/saveEstimationProgressPopup";
import useList from "@/utils/useList";
import { getKKFactorRegionIdAPI, getRegionDataAPI, getRegionQuarterlyDetailsAPI, getWebLeadResultsDataAPI, saveQuoteWebLeadDataAPI } from "@/redux/services/general.api";
import { BatteryComboPackage1 } from "./batteryComboPackage1";
import { BatteryComboPackage2 } from "./batteryComboPackage2";
import EditRoofRestartModal from '../modals/editRoofRestart';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getParseInt } from "../NumberFunctions";
import { message } from "antd";
import { updateSortedData } from '../../redux/slices/sortedComboData/sortedComboDataSlice';
import CalculationsDrawer from "../modals/calculatorModal/calculationsDrawer";
import BatterySavingPopup from '../modals/batterySavingPopupModal/batterySavingPopup';
import dynamic from "next/dynamic";
const BatteryOnlyResultPagePopupProps = dynamic(() => import('../modals/batteryOnlyResultPagePopup/batteryOnlyResultPagePopup'), {
    ssr: false,
});

export interface BatteryOnlyResultComponentProps {
    setQuoteData: (data: any) => void;
    isLoaded: boolean | undefined;
    quoteData: any;
    codeId: any;
    setApiQuoteLoading: any;
    isCalculationAPILoading: boolean;
    apiQuoteLoading: boolean;
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

const BatteryOnlyResultComponent = (props: BatteryOnlyResultComponentProps) => {

    const {
        isLoaded,
        quoteData,
        setQuoteData,
        codeId,
        setApiQuoteLoading,
        comboData
    } = props;

    const [openSaveEstimatePopup, setOpenSaveEstimatePopup] = useState(false);
    const [initialAutoOpenSaveEstimatePopup, setInitialAutoOpenSaveEstimatePopup] = useState(true);
    const [drawRoofs, setDrawRoofs] = useState([]);
    const [isPopupInPopup, setIsPopupInPopup] = useState(false);
    const [disableScroll, setDisableScroll] = useState(false);
    const [isEditRoofRestartOpen, setIsEditRoofRestartOpen] = useState(false);
    const [, setIsLoading] = useState(false);
    const [orderTotal, setOrderTotal] = useState(0);
    const [isBattery] = useState(true);
    const [selectedMonths, setSelectedMonths] = useState(120);
    const [openRestartSurveyModal, setOpenRestartSurveyModal] = useState(false);
    const [invertersData, setInvertersData] = useState(null);

    const router = useRouter();

    const [, setUserPopupDataFilled] = useState(true);
    const [openBatteryOnlyResultPagePopUp, setOpenBatteryOnlyResultPagePopUp] = useState(false);
    const [openFinanceCalculatorPopup, setOpenFinanceCalculatorPopup] = useState(false);
    const [openBatterySavingPopup, setOpenBatterySavingPopup] = useState(false);
    const [openingModalName, setOpeningModalName] = useState<modalEnum[]>([]);

    const [resultPopupData, setResultPopupData] = useState<any>(null);
    const dispatch = useDispatch();

    const { apiParam } = useList({
        queryParams: {
            randomString: '',
        },
    });

    const setUKMobileNoFormat = (mno: any, prefix = '+') => {
        if (!mno) {
            return '';
        }

        let formattedMno = mno
            .replace('(0)', '')
            .replace('(', '')
            .replace(')', '')
            .replace('+', '')
            .replace('-', '')
            .replaceAll(' ', '')
            .replace(/^0+/, '');
        // ltrim 0

        if (!formattedMno.startsWith('44')) {
            formattedMno = `44${formattedMno}`;
        }
        if (prefix && prefix !== '44') {
            prefix = prefix.trim();
            formattedMno = prefix + formattedMno;
        }

        return formattedMno;
    };

    const handleSaveQuoteData = async (data: any) => {
        setIsLoading(true);
        data.randomstring = codeId;
        data.lead_status = 'CONFIRM';
        const saveData = Object.assign(data, webLeadSaveData);
        saveData.batteryId = quoteData.batteryData.id;
        saveData.panelId = quoteData.panelData.id;
        saveData.inverterId = quoteData.invertersData.id;
        saveData.annual_energy_usage = quoteData.annual_energy_usage;
        saveData.after_solar = quoteData?.new_after_solar;
        saveData.estimated_co2_reduction =
            quoteData?.before_annual_CO2_emmisions -
            quoteData?.after_annual_CO2_emmisions;
        saveData.payback_time = (
            Number(orderTotal) /
            (Number(quoteData?.before_solar) -
                Number(quoteData?.new_after_solar) +
                getParseInt(quoteData?.EstimatedExportEarnings))
        ).toFixed(1);
        saveData.annual_saving =
            getParseInt(quoteData?.before_solar) -
            getParseInt(quoteData?.new_after_solar) +
            getParseInt(quoteData?.EstimatedExportEarnings);
        saveData.export_earning = quoteData?.EstimatedExportEarnings;
        saveData.cash_payback_time = (
            Number(quoteData?.totalEstimatedPrice) /
            (Number(quoteData?.before_solar) -
                Number(quoteData?.new_after_solar) +
                Number(quoteData?.EstimatedExportEarnings))
        ).toFixed(0);
        data.phone = setUKMobileNoFormat(data.phone);
        try {
            const res = await saveQuoteWebLeadDataAPI(saveData);
            if (res) {
                setIsLoading(false);
                localStorage.removeItem('saveQuotes');
                message.success('Saved the quote successfully');
                router.push('/thankyou');
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const moreInvertersData = quoteData?.invertersData?.more;

    const inverter_variation1: any = moreInvertersData && Object.values(moreInvertersData)[0];
    const inverter_variation2: any = moreInvertersData && Object.values(moreInvertersData)[1];

    const webLeadSaveData = {
        bedrooms: quoteData?.bedrooms || '',
        web_lead_type: quoteData?.web_lead_type || '',
        energy_routine: quoteData?.energy_routine || '',
        energy_usage: quoteData?.energy_usage || '',
        location: quoteData?.location || '',
        occupants: quoteData?.occupants || '',
        floors: quoteData?.floors || '',
        ownership: quoteData?.ownership || '',
        postalCode: quoteData?.postalCode || '',
        property: quoteData?.property || '',
        roof_space: quoteData?.roof_space || '',
        total_panels: quoteData?.totalPanels,
        total_Price: getParseInt(quoteData?.totalEstimatedPrice),
        before_solar: quoteData?.before_solar,
        after_solar: quoteData?.after_solar,
        estimated_annual_energy: quoteData?.estimated_annual_energy,
        estimated_co2_reduction: quoteData?.before_annual_CO2_emmisions,
        // panel_name: quoteData?.panelData?.solar_panel_name,
        // panel_feature: quoteData?.panelData?.features,
        inverter_name: quoteData?.invertersData?.inverter_name,
        inverter_feature: quoteData?.totalPanels > 16
            ? (inverter_variation2?.features || quoteData?.invertersData?.features || "")
            : (inverter_variation1?.features || quoteData?.invertersData?.features || ""),
        inverter_variation: quoteData?.totalPanels > 16
            ? (inverter_variation2?.inverter_kWh || "")
            : (inverter_variation1?.inverter_kWh || ""),
        bettery_name: isBattery ? quoteData?.batteryData?.battery_name : '',
        bettery_feature: isBattery ? quoteData?.batteryData?.features : '',
        bettery_kWh: quoteData?.batteryData
            ? quoteData?.batteryData?.battery_kWh
            : 'none',
        solar_system_size: quoteData?.solar_system_size,
        battery_brand: quoteData?.battery_brand
    };

    useEffect(() => {
        if (comboData) {
            setInvertersData(comboData ? comboData?.inverters : {});
        }
    }, [comboData]);

    const getResults = async (_id: string) => {
        try {
            setApiQuoteLoading(true);
            const tmpArr: any = [];
            const res = await getWebLeadResultsDataAPI(apiParam);
            const allRoofDatas = res?.roofData;

            const RegionQueryParams = {
                postcode: res?.leadData?.postalCode,
            };


            const regionsData = await getRegionDataAPI(RegionQueryParams);
            // let standingChargeDatas: any;
            let kkFactorDatas: any;
            let RegionQuarterlyDetails: any;


            if (regionsData?.data) {
                RegionQuarterlyDetails = await getRegionQuarterlyDetailsAPI(
                    regionsData?.data?.region_id
                );

                const kkFactorByRegionId = await getKKFactorRegionIdAPI(
                    regionsData?.data?.region_id
                );

                if (kkFactorByRegionId) {
                    kkFactorDatas = kkFactorByRegionId?.data;
                }
            }

            if (res.leadData.firstName !== '') {
                setUserPopupDataFilled(true);
            }
            if (res.leadData.firstName === '') {
                setUserPopupDataFilled(false);
            }

            setQuoteData((prevState: any) => {
                const totalSolarPanels = res.roofData
                    .map((data) => data.suggested_panel)
                    .reduce((a, b) => a + b, 0);
                const ret = {
                    ...prevState,
                    totalPanels: res?.leadData?.total_panels ? res?.leadData?.total_panels : totalSolarPanels > 25
                        ? 25
                        : totalSolarPanels,
                    recommendedPanels: totalSolarPanels > 25
                        ? 25
                        : totalSolarPanels,

                    // panelData: activePanelData,
                    leadData: res.leadData,
                    invertersData: invertersData,
                    regionsData: regionsData?.data,
                    regionQuarterlyDetails: RegionQuarterlyDetails, //new Quarter wise details
                    allRoofData: allRoofDatas,
                    roofData: res.roofData,
                    kkFactorData: kkFactorDatas,
                    ownership: res.leadData.ownership,
                    property: res.leadData.property,
                    floors: res.leadData.floors,
                    bedrooms: res.leadData.bedrooms,
                    occupants: res.leadData.occupants,
                    energy_routine: res.leadData.energy_routine,
                    energy_usage: res.leadData.energy_usage,
                    roof_space: res.leadData.roof_space,
                    location: res.leadData.location,
                    totalestimatedPrice: 0,
                    web_lead_type: res.leadData.web_lead_type,
                    solar_system_size: res.leadData.solar_system_size,
                    battery_brand: res.battery_brand
                };

                return ret;
            });

            res.roofData.map((roof: any) => {
                const tmRoof = JSON.parse(roof.draw_points);
                tmpArr.push(JSON.parse(tmRoof));
                return roof;
            });
            setDrawRoofs(tmpArr);
            setApiQuoteLoading(false);
        } catch (error: any) {
            // console.log('Error', error);
        }
    };

    useEffect(() => {
        if (codeId) {
            apiParam.randomString = codeId || '';
            getResults(codeId);
        }
    }, [codeId]);

    useEffect(() => {
        if (disableScroll) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        }
        else {
            document.body.style.overflow = 'auto';
            document.body.style.touchAction = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.touchAction = 'auto';
        };
    }, [disableScroll]);

    useEffect(() => {
        if (quoteData && quoteData.leadData.lead_status === "DRAFT" && initialAutoOpenSaveEstimatePopup) {

            setDisableScroll(true);
            setOpenSaveEstimatePopup(true);
        }
    }, [quoteData, initialAutoOpenSaveEstimatePopup]);

    useEffect(() => {
        AOS.init();
    }, []);

    const [, setNewUnSortedArr] = useState<any>([]);
    const [unSortedObj, setUnSortedObj] = useState<any>({})
    const [newSortedArr, setNewSortedArr] = useState<any>([]);
    const [currentComboName, setCurrentComboName] = useState<any>(null);

    const addDataForSorting = useCallback((data: any) => {
        if (data) {

            const ddd = newSortedArr.find((e: any) => e.combo_name === data.combo_name)

            if (comboData?.battery?.battery_name) {
                data = { ...data, battery_name: comboData?.battery?.battery_name }
            }

            const newd = { ...ddd, ...data }

            setUnSortedObj((prev: any) => ({ ...prev, [data.combo_name]: { ...data, combo: comboData } }));
            setNewUnSortedArr((prev: any) => [...prev, newd])
        }
    }, [quoteData, comboData])


    useEffect(() => {
        if (unSortedObj) {
            // setNewSortedArr(Object.values(unSortedObj).sort((a: any, b: any) => a?.financePaybackTime - b?.financePaybackTime))
            setNewSortedArr(Object.values(unSortedObj))
        }
    }, [unSortedObj])

    useEffect(() => {
        dispatch(updateSortedData(newSortedArr))
    }, [newSortedArr])

    const changePopupData = useCallback((id: any) => {
        setCurrentComboName(id);
        // setResultPopupData({...newSortedArr.find((x: any) => x?.combo_name === id)});
    }, [newSortedArr])


    useEffect(() => {
        if (newSortedArr?.length > 0 && currentComboName) {
            setResultPopupData({ ...newSortedArr.find((x: any) => x?.combo_name === currentComboName) });
        }
    }, [newSortedArr, currentComboName])


    useEffect(() => {
        if (resultPopupData) {
            if (openingModalName?.includes(modalEnum.openBatteryOnlyResultPagePopup)) setOpenBatteryOnlyResultPagePopUp(true);
            if (openingModalName?.includes(modalEnum.closeBatteryOnlyResultPagePopup)) setOpenBatteryOnlyResultPagePopUp(false);
            if (openingModalName?.includes(modalEnum.batterySavingPopup)) setOpenBatterySavingPopup(true);
            if (openingModalName?.includes(modalEnum.closeBatterySavingPopup)) setOpenBatterySavingPopup(false);
            if (openingModalName?.includes(modalEnum.financeCalculatorPopup)) setOpenFinanceCalculatorPopup(true);
            if (openingModalName?.includes(modalEnum.closeFinanceCalculatorPopup)) setOpenFinanceCalculatorPopup(false);
        }
    }, [resultPopupData, openingModalName])

    const scrolltoSection = () => {
        const index = newSortedArr.map((e: any) => e.combo_name).indexOf(resultPopupData?.combo_name);

        const element = document.getElementById(`section${index + 1}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <div className="resultContainer">
            <div className="container containerCustom resultCustom bgWhite py-4">
                <h1 className="mb-0">
                    {quoteData?.leadData?.lead_status === "CONFIRM" ? "Your selected battery package " :
                        // `We have ${comboData?.battery_more?.length} amazing battery package options`
                        `We have ${comboData?.length} amazing battery package options`
                    }
                </h1>
                <div className="font32 mb-mob-0 resultMainText">
                    for your home in {quoteData?.leadData?.postalCode}...
                </div>

                <BatteryOnlyFirstPackageOps
                    {...{
                        setIsEditRoofRestartOpen,
                        drawRoofs,
                        isLoaded,
                        setOpenSaveEstimatePopup,
                        openSaveEstimatePopup,
                        setDisableScroll,
                        setOpenRestartSurveyModal,
                        quoteData,
                        totalPackages: comboData?.length,
                    }}
                    seteditRoofRestartOpen={setIsEditRoofRestartOpen}
                    iseditRoofRestartOpen={isEditRoofRestartOpen}

                />
                <div className="">
                    {
                        comboData?.length >= 2
                            ?
                            (comboData && newSortedArr && unSortedObj &&
                                comboData?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {index === 0 ? (
                                                <BatteryComboPackage1
                                                    key={index}
                                                    {...{
                                                        quoteData,
                                                        invertersData: invertersData,
                                                        OBJCOMBO: item,
                                                        setDisableScroll,
                                                        setIsPopupInPopup,
                                                        isPopupInPopup,
                                                        index,
                                                        orderTotal,
                                                        setOrderTotal,
                                                        handleSaveQuoteData,
                                                        setSelectedMonths,
                                                        drawRoofs,
                                                        selectedMonths,
                                                        originalcomboData: comboData,
                                                        sortedData: { ...newSortedArr[index] },
                                                        comboName: item.combo_name
                                                    }}
                                                    changePopupData={changePopupData}
                                                    setOpeningModalName={setOpeningModalName}
                                                    openingModalName={openingModalName}
                                                    addDataForSorting={addDataForSorting}
                                                />
                                            ) : index === 1 ? (
                                                <BatteryComboPackage2
                                                    key={index}
                                                    {...{
                                                        quoteData,
                                                        invertersData: invertersData,
                                                        OBJCOMBO: item,
                                                        setDisableScroll,
                                                        setIsPopupInPopup,
                                                        isPopupInPopup,
                                                        index,
                                                        orderTotal,
                                                        setOrderTotal,
                                                        handleSaveQuoteData,
                                                        setSelectedMonths,
                                                        drawRoofs,
                                                        selectedMonths,
                                                        originalcomboData: comboData,
                                                        sortedData: newSortedArr[index],
                                                        comboName: item.combo_name
                                                    }}
                                                    changePopupData={changePopupData}
                                                    setOpeningModalName={setOpeningModalName}
                                                    openingModalName={openingModalName}
                                                    addDataForSorting={addDataForSorting}
                                                />
                                            ) : (
                                                <BatteryComboPackage1
                                                    key={index}
                                                    {...{
                                                        quoteData,
                                                        invertersData: invertersData,
                                                        OBJCOMBO: item,
                                                        setDisableScroll,
                                                        setIsPopupInPopup,
                                                        isPopupInPopup,
                                                        index,
                                                        orderTotal,
                                                        setOrderTotal,
                                                        handleSaveQuoteData,
                                                        setSelectedMonths,
                                                        drawRoofs,
                                                        selectedMonths,
                                                        originalcomboData: comboData,
                                                        sortedData: { ...newSortedArr[index] },
                                                        comboName: item.combo_name
                                                    }}
                                                    changePopupData={changePopupData}
                                                    setOpeningModalName={setOpeningModalName}
                                                    openingModalName={openingModalName}
                                                    addDataForSorting={addDataForSorting}
                                                />
                                            )}
                                        </div>
                                    );
                                })
                            )
                            :
                            (comboData &&
                                comboData?.battery_more.map((data: any, index: number) => {
                                    if (index !== 0) return null; // Only render for index 0
                                    return (
                                        <BatteryComboPackage1
                                            key={index}
                                            {...{
                                                quoteData,
                                                invertersData,
                                                OBJCOMBO: comboData,
                                                setDisableScroll,
                                                setIsPopupInPopup,
                                                isPopupInPopup,
                                                index,
                                                orderTotal,
                                                setOrderTotal,
                                                handleSaveQuoteData,
                                                setSelectedMonths,
                                                drawRoofs,
                                                selectedMonths,
                                                originalcomboData: comboData,
                                                sortedData: { ...newSortedArr[index] },
                                                comboName: data.combo_name,
                                            }}
                                            changePopupData={changePopupData}
                                            setOpeningModalName={setOpeningModalName}
                                            openingModalName={openingModalName}
                                            addDataForSorting={addDataForSorting}
                                        />
                                    );
                                })
                            )
                    }

                </div>


                {openSaveEstimatePopup && (
                    <SaveEstimationProgressPopup
                        {...{
                            setOpenSaveEstimatePopup,
                            setDisableScroll,
                            codeId,
                            quoteData,
                            setQuoteData,
                        }}
                        setInitialAutoOpenSaveEstimatePopup={setInitialAutoOpenSaveEstimatePopup}
                    />
                )}

                {isEditRoofRestartOpen && (
                    <EditRoofRestartModal
                        {...{
                            visible: isEditRoofRestartOpen,
                            setIsEditRoofRestartOpen: setIsEditRoofRestartOpen,
                            quoteData,
                            getResults,
                            // RESOBJ: resObj,
                        }}
                    />
                )}

                {resultPopupData && (openFinanceCalculatorPopup || openFinanceCalculatorPopup && openBatteryOnlyResultPagePopUp) && <CalculationsDrawer
                    open={openFinanceCalculatorPopup}
                    onClose={(sortObject) => {
                        console.log("sortObject", sortObject)
                        scrolltoSection();

                        changePopupData(resultPopupData?.combo_name)
                        setOpeningModalName((prev) => {
                            let newarr = prev.filter((name) => name !== modalEnum.financeCalculatorPopup)
                            return [...newarr, modalEnum.closeFinanceCalculatorPopup]
                        })
                        // setDisableScroll(false);
                    }}
                    changePopupData={changePopupData}
                    setOpeningModalName={setOpeningModalName}
                    componentComboData={resultPopupData}
                    quoteData={quoteData}

                />}

                {openBatterySavingPopup && resultPopupData && (
                    <BatterySavingPopup
                        {...{
                            setOpenBatterySavingPopup,
                            setDisableScroll,
                            setIsPopupInPopup,
                            isPopupInPopup,
                            OBJCOMBO: { ...resultPopupData },
                            quoteData: { ...resultPopupData },
                        }}
                        setOpeningModalName={setOpeningModalName}
                    />
                )}

                {openRestartSurveyModal && (
                    <RestartSurveyModal
                        {...{
                            openRestartSurveyModal,
                            setOpenRestartSurveyModal,
                            setDisableScroll,
                        }}
                    />
                )}

                {openBatteryOnlyResultPagePopUp && resultPopupData && (
                    <BatteryOnlyResultPagePopupProps
                        {...{
                            setOpenBatteryOnlyResultPagePopUp,
                            setDisableScroll,
                            setOpenBatterySavingPopup: () => { },
                            setOpenFinanceCalculatorPopup: () => { },
                            setIsPopupInPopup,
                            quoteData: null,
                        }}
                        scrolltoSection={scrolltoSection}
                        changePopupData={changePopupData}
                        globalMonthly={resultPopupData?.globalMonthly}
                        userDepositAmount={resultPopupData?.userDepositAmount}
                        OBJCOMBO={{ ...resultPopupData }}
                        panelCount={resultPopupData?.totalPanels}
                        saveLeadData={() => { }}
                        orderTotal={resultPopupData?.orderTotal}
                        totalPrice={resultPopupData?.totalEstimatedPrice}
                        twelveMonths={resultPopupData?.twelveMonths} sixtyMonths={resultPopupData?.sixtyMonths}
                        monthly={resultPopupData?.monthly}
                        loan={resultPopupData?.loan}
                        interest={resultPopupData?.interest}
                        RangeFinance={resultPopupData?.RangeFinance}
                        selectedMonths={resultPopupData?.selectedMonths}
                        totalEstimatedPrice={resultPopupData?.totalEstimatedPrice}
                        addDataForSorting={addDataForSorting}
                        openingModalName={openingModalName}
                        setOpeningModalName={setOpeningModalName}
                        comboData={comboData}
                    />
                )}

            </div>
        </div>
    )
};

export default BatteryOnlyResultComponent;