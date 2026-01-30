import {
  electricityBillCalculationAPI,
  energyGenerationCalculationAPI,
  getSFFactorByDirectionsAPI,
  getWebLeadCalculationAPI,
  updateUserInfoQuoteWebLeadDataAPI,
  usableEnergyProducedCalculationAPI,
} from '@/redux/services/general.api';
import { addCommas } from '@/utils/helpers';
import { message } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getParseFloat, getParseInt } from '../NumberFunctions';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { event, EVENTENUMS } from '../Pixel/facebook/lib/fpixel';

// import FinanceCalculatorPopup from '../modals/financeCalcPopupModal/financeCalculatorPopup';

export interface ComponentOneProps {
  OBJCOMBO: any;
  quoteData: any;
  addDataForSorting: any;
  setDisableScroll: (value: boolean) => void;
  setIsPopupInPopup: (value: boolean) => void;
  isPopupInPopup: boolean;
  index: number;
  setOrderTotal: (d: number) => void;
  handleSaveQuoteData: (d: any) => void;
  activePanelData: any;
  invertersData: any;
  originalcomboData: any;
  sortedData: any;
  changePopupData: any;
  setOpeningModalName: (d: any) => void;
  openingModalName?: modalEnum[]
}
enum modalEnum {
  openResultPagePopup = 'openResultPagePopup',
  closeResultPagePopup = 'closeResultPagePopup',
  solarSavingPopup = 'solarSavingPopup',
  closeSolarSavingPopup = 'closeSolarSavingPopup',
  financeCalculatorPopup = 'financeCalculatorPopup',
  closeFinanceCalculatorPopup = 'closeFinanceCalculatorPopup',
}
const ComponentNewOne = (props: ComponentOneProps) => {
  const {
    setDisableScroll,
    // setIsPopupInPopup,
    quoteData,
    addDataForSorting,
    // isPopupInPopup,
    OBJCOMBO,
    index,
    originalcomboData,
    sortedData,
    changePopupData,
    setOpeningModalName
  } = props;

  // const [openResultPagePopUp, setOpenResultPagePopUp] = useState(false);
  const { optimisers, inverters, battery, solar_panels } = OBJCOMBO;
  // const logData=JSON.parse(quoteData?.leadData?.log)
  const [newQuoteData, setNewquoteData] = useState({ ...quoteData });
  const [, setIsCalculationAPILoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [userDepositAmount, setUserDepositAmount] = useState(0);
  const [sixtyMonths, setSixtyMonths] = useState(0);
  const [twelveMonths, setTwelveMonths] = useState(0);
  const [globalMonthly, setGlobalMonthly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [loan, setLoan] = useState(0);
  const [interest, setInterest] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const PixelEventLimitingRef = useRef(true);
  const [isSaleOn,] = useState(true);
  // const [openSolarSavingPopup, setOpenSolarSavingPopup] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(false);

  // const [openFinanceCalculatorPopup, setOpenFinanceCalculatorPopup] =
  //   useState(false);
  const [RangeFinance,] = useState(0);
  const [selectedMonths,] = useState(120);
  const router = useRouter();
  // const handleRangeChange = (val: any) => {
  //   setRangeFinance(Number(val)); // Adjusts to value as number
  // };
  const calLoan = (result: any) => {
    // console.log('callLoan', result);
    setGlobalMonthly(result.monthlyPayment);
    setMonthly(result.monthlyPayment);
    setLoan(result.loanAmount);
    setOrderTotal(result.totalRepayment);
    setInterest(result.costOfFinance);
  };

  // const handleRangeChange = (e: any) => {
  //   setDepositAmountPer(e.target.value);
  // };
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
      // console.log('error', error);
    }
  }, [RangeFinance, selectedMonths, newQuoteData?.totalEstimatedPrice]);


  useEffect(() => {
    setNewquoteData((prev) => {
      return { ...prev, ...OBJCOMBO, orderTotal, userDepositAmount, sixtyMonths: sixtyMonths, twelveMonths, globalMonthly, monthly, loan, interest, RangeFinance, selectedMonths }
    })
  }, [orderTotal, userDepositAmount, sixtyMonths, twelveMonths, globalMonthly, monthly, loan, interest, RangeFinance, selectedMonths]);

  const panelData: any = { a: '' };
  let estimated_co2_reduction: number = 0;
  let averageUnitRate: number = 0;
  let before_annual_CO2_emmisions: any = 0;
  let estimated_annual_energy: any = 0;
  const roofPitchData: any = [];
  let directionsParams = {
    directions: '',
  };
  let estimated_annual_usable: any = 0;
  let FEEBS: any = 0;
  let NewAfterSolar: any = 0;
  let afterAnnualCO2: any = 0;
  let AfterUseablePercentage: any = 0;
  let AfterElectricityBillPercentage: any = 0;
  let AfterCO2Percentage: any = 0;
  let EstimatedExportEarnings: any = 0;
  let EstimatedExportEarningsWithoutBattery: any = 0;
  const sFFactorByDirections: any = [];

  const Calculation = async (quoteData, batteryData) => {
    setIsCalculationAPILoading(true);
    try {
      const allRoofData = quoteData?.allRoofData;

      for (let i = 0; i < allRoofData.length; i++) {
        let roofPitch;
        if (allRoofData[i].roof_direction === 'E') {
          directionsParams = {
            directions: 'East',
          };
          if (allRoofData[i].roof_pitch === 'average') roofPitch = 1;
          if (allRoofData[i].roof_pitch === 'gentle') roofPitch = 1.0309;
          if (allRoofData[i].roof_pitch === 'steep') roofPitch = 0.9624;
          if (allRoofData[i].roof_pitch === 'flat') roofPitch = 1.055;
        }
        if (allRoofData[i].roof_direction === 'W') {
          directionsParams = {
            directions: 'West',
          };
          if (allRoofData[i].roof_pitch === 'average') roofPitch = 1;
          if (allRoofData[i].roof_pitch === 'gentle') roofPitch = 1.0309;
          if (allRoofData[i].roof_pitch === 'steep') roofPitch = 0.9624;
          if (allRoofData[i].roof_pitch === 'flat') roofPitch = 1.055;
        }
        if (allRoofData[i].roof_direction === 'N') {
          directionsParams = {
            directions: 'North',
          };
          if (allRoofData[i].roof_pitch === 'average') roofPitch = 1;
          if (allRoofData[i].roof_pitch === 'gentle') roofPitch = 1.1708;
          if (allRoofData[i].roof_pitch === 'steep') roofPitch = 0.8651;
          if (allRoofData[i].roof_pitch === 'flat') roofPitch = 1.507;
        }
        if (allRoofData[i].roof_direction === 'S') {
          directionsParams = {
            directions: 'South',
          };
          if (allRoofData[i].roof_pitch === 'average') roofPitch = 1;
          if (allRoofData[i].roof_pitch === 'gentle') roofPitch = 0.975;
          if (allRoofData[i].roof_pitch === 'steep') roofPitch = 0.998;
          if (allRoofData[i].roof_pitch === 'flat') roofPitch = 0.844;
        }
        if (
          allRoofData[i].roof_direction === 'NE') {
          directionsParams = {
            directions: 'NorthEast',
          };
          if (allRoofData[i].roof_pitch === 'average') roofPitch = 1;
          if (allRoofData[i].roof_pitch === 'gentle') roofPitch = 1.1187;
          if (allRoofData[i].roof_pitch === 'steep') roofPitch = 0.92;
          if (allRoofData[i].roof_pitch === 'flat') roofPitch = 1.34;
        }
        if (allRoofData[i].roof_direction === 'NW') {
          directionsParams = {
            directions: 'NorthWest',
          };
          if (allRoofData[i].roof_pitch === 'average') roofPitch = 1;
          if (allRoofData[i].roof_pitch === 'gentle') roofPitch = 1.1187;
          if (allRoofData[i].roof_pitch === 'steep') roofPitch = 0.92;
          if (allRoofData[i].roof_pitch === 'flat') roofPitch = 1.34;
        }
        if (allRoofData[i].roof_direction === 'SE') {
          directionsParams = {
            directions: 'SouthEast',
          };
          if (allRoofData[i].roof_pitch === 'average') roofPitch = 1;
          if (allRoofData[i].roof_pitch === 'gentle') roofPitch = 0.98;
          if (allRoofData[i].roof_pitch === 'steep') roofPitch = 0.9828;
          if (allRoofData[i].roof_pitch === 'flat') roofPitch = 0.8885;
        }
        if (allRoofData[i].roof_direction === 'SW') {
          directionsParams = {
            directions: 'SouthWest',
          };
          if (allRoofData[i].roof_pitch === 'average') roofPitch = 1;
          if (allRoofData[i].roof_pitch === 'gentle') roofPitch = 0.98;
          if (allRoofData[i].roof_pitch === 'steep') roofPitch = 0.9828;
          if (allRoofData[i].roof_pitch === 'flat') roofPitch = 0.8885;
        }

        roofPitchData.push({ roofPitch, id: allRoofData[i].id });
        // eslint-disable-next-line no-await-in-loop
        const getSFFactorByDirection = await getSFFactorByDirectionsAPI(
          directionsParams
        );

        const formattedSFFactorByDirectionData = {
          id: getSFFactorByDirection?.data.id,
          directions: getSFFactorByDirection?.data?.directions,
          sk_factor: getSFFactorByDirection?.data?.sk_factor,
          roof_direction: allRoofData[i].roof_direction,
        };
        sFFactorByDirections.push(formattedSFFactorByDirectionData);
      }

      let occurs_annual_energy_usage: number = 0;
      const leadData = quoteData?.leadData;
      if (leadData?.annual_energy_usage === 0) {
        if (leadData?.no_energy_usage === 'low') {
          if (leadData?.occupants === 'one') {
            occurs_annual_energy_usage = 2200;
          }
          if (leadData?.occupants === 'two') {
            occurs_annual_energy_usage = 2500;
          }
          if (leadData?.occupants === 'three') {
            occurs_annual_energy_usage = 2800;
          }
          if (leadData?.occupants === 'four') {
            occurs_annual_energy_usage = 3200;
          }
        }

        if (leadData?.no_energy_usage === 'fairly') {
          if (leadData?.occupants === 'one') {
            occurs_annual_energy_usage = 2500;
          }
          if (leadData?.occupants === 'two') {
            occurs_annual_energy_usage = 3200;
          }
          if (leadData?.occupants === 'three') {
            occurs_annual_energy_usage = 3600;
          }
          if (leadData?.occupants === 'four') {
            occurs_annual_energy_usage = 4200;
          }
        }

        if (leadData?.no_energy_usage === 'high') {
          if (leadData?.occupants === 'one') {
            occurs_annual_energy_usage = 3500;
          }
          if (leadData?.occupants === 'two') {
            occurs_annual_energy_usage = 4000;
          }
          if (leadData?.occupants === 'three') {
            occurs_annual_energy_usage = 5000;
          }
          if (leadData?.occupants === 'four') {
            occurs_annual_energy_usage = 6500;
          }
        }
      }

      //as per old flow
      // if (quoteData?.standingChargeData) {
      //   estimated_co2_reduction = quoteData?.standingChargeData?.CO2Emission;
      // }

      //as per new region quarterly details module
      if (quoteData?.regionQuarterlyDetails) {
        estimated_co2_reduction = quoteData?.regionQuarterlyDetails[0]?.CO2emission;
        // console.log("new 111", estimated_co2_reduction)
      }


      //as per old flow
      // if (quoteData?.quarterlyUnitRates?.averageUnitRate) {
      //   averageUnitRate = quoteData?.quarterlyUnitRates?.averageUnitRate;
      // }

      //as per new region quarterly details module
      if (quoteData?.regionQuarterlyDetails[0]?.quarterly_unit_rate) {
        averageUnitRate = quoteData?.regionQuarterlyDetails[0]?.quarterly_unit_rate;
        // console.log("new 222", averageUnitRate)
      }


      const annual_energy_usage =
        leadData?.annual_energy_usage === 0
          ? occurs_annual_energy_usage
          : leadData?.annual_energy_usage;

      let leadCalculation: any = null;
      if (
        quoteData?.regionQuarterlyDetails[0]?.standing_charge_per_day &&
        averageUnitRate &&
        annual_energy_usage &&
        estimated_co2_reduction &&
        quoteData?.regionQuarterlyDetails[0]?.VAT &&
        quoteData?.leadData?.id
      ) {
        const electricityBillPayload = {
          standingChargePerDay: quoteData?.regionQuarterlyDetails[0]?.standing_charge_per_day,
          averageUnitCharge: averageUnitRate,
          annualElectricityConsumption: annual_energy_usage,
          CO2_emission: estimated_co2_reduction,
          VATPercentage: quoteData?.regionQuarterlyDetails[0]?.VAT,
          web_lead_id: quoteData?.leadData?.id,
        };
        if (!leadCalculation && leadCalculation === null) {
          // console.log('electricityBillPayload', electricityBillPayload);
          const resData = await electricityBillCalculationAPI(
            electricityBillPayload
          );
          if (resData) {
            leadCalculation = resData;
          }
        }
        if (leadCalculation && leadCalculation !== null) {
          before_annual_CO2_emmisions = leadCalculation.annual_CO2_emission;
          const mergedData = quoteData?.roofData.map((roofData: any) => {
            const roofPitchValue = roofPitchData.find(
              (rp: any) => rp.id === roofData.id
            );

            const sfFactorValue = sFFactorByDirections.find(
              (sf: any) => sf.roof_direction === roofData.roof_direction
            );
            return {
              kkFactor: quoteData?.kkFactorData?.kk_factor_kWH_normal,
              sfFactor: sfFactorValue?.sk_factor,
              roofPitch: roofPitchValue?.roofPitch,
              shadow: roofData?.roofShading,
              electricityBillId: leadCalculation?.web_lead_id,
              solarPower: OBJCOMBO.solar_panels.solar_panel_kWh,
              noPanels: quoteData.totalPanels, //make this dynamic
            };
          });
          if (mergedData) {
            //   const newResDataEnergy = {
            //     "updatedRecord": [
            //         {
            //             "id": 350,
            //             "standing_charge": "240.46",
            //             "unit_charge": "1032.00",
            //             "calculate_VAT": "63.62",
            //             "total_electricity_bill": "1336.09",
            //             "annual_CO2_emission": "773.2000",
            //             "total_energy_generated": 7125.085967999999,
            //             "web_lead_id": 112
            //         }
            //     ]
            // }
            const newResDataEnergy = await energyGenerationCalculationAPI(
              mergedData
            );
            if (newResDataEnergy) {
              leadCalculation = null;
              leadCalculation = newResDataEnergy?.updatedRecord[0];
            }
          }
        }
        if (
          leadCalculation &&
          leadCalculation !== null &&
          leadCalculation?.total_energy_generated === null
        ) {
          leadCalculation = null;
          const leadCalculations = await getWebLeadCalculationAPI(
            quoteData?.leadData?.id
          );
          // console.log('webleadCalc', leadCalculation);
          if (leadCalculations) {
            leadCalculation = leadCalculations;
          }
        }
        if (leadCalculation?.total_energy_generated) {
          const totalEnergyGenerate: any = await getParseFloat(
            leadCalculation?.total_energy_generated,
            5
          );
          estimated_annual_energy = totalEnergyGenerate;
        }

        if (leadCalculation) {
          const EnnualUsableEnergypayload = {
            annual_electricity_consumption: annual_energy_usage,
            annual_generation_from_solar:
              leadCalculation?.total_energy_generated,
            battery_energy_storage: batteryData?.battery_kWh
              ? batteryData?.battery_kWh
              : '1',
            arche_type_arche_code:
              quoteData?.energy_routine === 'most_of_the_day'
                ? 'full_day'
                : 'half_day',
          };
          const estimatedEnnualUsableEnergy =
            await usableEnergyProducedCalculationAPI(EnnualUsableEnergypayload);
          if (estimatedEnnualUsableEnergy.error) {
            message.error('Failed to calculate energy generation');
          }

          if (estimatedEnnualUsableEnergy) {
            const ASC = leadCalculation?.standing_charge;
            // const AUC = averageUnitRate;
            // // console.log("leadCalculation", leadCalculation)
            // // console.log("leadCalculation?.averageUnitCharge", leadCalculation?.averageUnitCharge)
            const AUC = leadCalculation?.averageUnitCharge;

            const EAEC = annual_energy_usage;
            const EUEP = await getParseFloat(
              estimatedEnnualUsableEnergy.totalUsableEnergy,
              5
            );
            const TVAT = quoteData?.regionQuarterlyDetails[0]?.VAT;
            const EAEG = estimated_annual_energy;

            const T = Number(ASC) + Number(AUC) * (Number(EAEC) - Number(EUEP));

            const taxAmount = T * (Number(TVAT) / 100);
            // // console.log("newQuoteData",newQuoteData)
            const FT = T + taxAmount;
            const exportEarningFactor =
              OBJCOMBO?.battery_kWh !== '1'
                ? newQuoteData.regionQuarterlyDetails[0].SEG_Factor_with_battery
                : newQuoteData.regionQuarterlyDetails[0].SEG_Factor_without_battery;

            const SEG = (EAEG - EUEP) * exportEarningFactor;
            console.log(
              'SEG',
              SEG,
              ' ',
              EAEG,
              ' ',
              EUEP,
              ' ',
              exportEarningFactor
            );
            // FEEBS = leadCalculation?.total_electricity_bill - FT + SEG;
            FEEBS = leadCalculation?.total_electricity_bill - FT;
            estimated_annual_usable = await getParseFloat(
              estimatedEnnualUsableEnergy.totalUsableEnergy,
              5
            );
            afterAnnualCO2 =
              Number(estimatedEnnualUsableEnergy.totalUsableEnergy) *
              Number(estimated_co2_reduction);

            AfterUseablePercentage = (Number(EUEP) * 100) / Number(EAEC);
            AfterElectricityBillPercentage =
              (FEEBS * 100) / leadCalculation?.total_electricity_bill;
            if (AfterElectricityBillPercentage > 96) {
              AfterElectricityBillPercentage = 96;
            }
            AfterCO2Percentage =
              (afterAnnualCO2 * 100) / before_annual_CO2_emmisions;

            NewAfterSolar = leadCalculation?.total_electricity_bill - FEEBS;

            EstimatedExportEarnings = SEG;
            EstimatedExportEarningsWithoutBattery =
              (EAEG - EUEP) * newQuoteData.regionQuarterlyDetails[0].SEG_Factor_without_battery;

            if (NewAfterSolar < 40) {
              NewAfterSolar = 40;
            }
          }
        }
      }

      setNewquoteData((prevState: any) => {
        return {
          ...prevState,
          ...quoteData?.leadData,
          ...quoteData,
          panelData,
          before_solar: leadCalculation?.total_electricity_bill,
          after_solar: FEEBS,
          new_after_solar: NewAfterSolar,
          total_panels: prevState.totalPanels, //make this  dynamic using prop drilling and adding it in useEffect
          postalCode: quoteData?.leadData?.postalCode,
          estimated_annual_energy,
          annual_energy_usage,
          before_annual_CO2_emmisions,
          estimated_annual_usable,
          final_est_electricity_bill_savings: FEEBS,
          after_annual_CO2_emmisions: afterAnnualCO2,
          after_useable_percentage: AfterUseablePercentage,
          after_electricity_bill_percentage: AfterElectricityBillPercentage,
          after_CO2_percentage: AfterCO2Percentage,
          EstimatedExportEarnings,
          EstimatedExportEarningsWithoutBattery,
          battery_kWh: OBJCOMBO?.battery_kWh,
        };
      });
      // setIsApiCalling(true);
      setIsCalculationAPILoading(false);
    } catch (error) {
      setIsCalculationAPILoading(false);
    }
  };

  useEffect(() => {
    Calculation(quoteData, OBJCOMBO);
  }, [quoteData]);

  const inverter_variation1: any = Object.values(OBJCOMBO.inverters.more)[0]
  const inverter_variation1_features = inverter_variation1?.features || ''
  const inverter_variation2: any = Object.values(OBJCOMBO.inverters.more)[1]
  const inverter_variation2_features = inverter_variation2?.features || ''

  useEffect(() => {
    if (OBJCOMBO?.solar_panels !== null && newQuoteData?.totalPanels) {
      const totatpanel = JSON.parse(OBJCOMBO?.solar_panels?.solar_panel_price);
      const inverter_variation1_price = inverter_variation1.inverter_price
      const inverter_variation2_price = inverter_variation2.inverter_price

      const totalEstimatedPrice = totatpanel.reduce((a: any, data: any) => {
        if (data.noOfPanel <= newQuoteData?.totalPanels) {
          return a + Number(data.price);
        }
        return a;
      }, 0) +
        Number(OBJCOMBO?.battery_price) +
        Number(newQuoteData?.totalPanels > 16 ? inverter_variation2_price : inverter_variation1_price) +
        Number(newQuoteData?.totalPanels) * Number(OBJCOMBO?.optimisers.optimiser_price);

      console.log(
        'totalEstimatedPrice',
        totalEstimatedPrice
      );
      setEstimatedPrice(totalEstimatedPrice);

    }
  }, [newQuoteData, newQuoteData?.totalPanels]);
  useEffect(() => {
    // console.log('totalEstimatedPrice', estimatedPrice);
    if (estimatedPrice > 0 && newQuoteData) {
      setNewquoteData((prev: any) => ({
        ...prev,
        totalEstimatedPrice: estimatedPrice,
      }));
    }
  }, [estimatedPrice]);
  useEffect(() => {

    if (orderTotal && newQuoteData?.before_solar && newQuoteData?.new_after_solar && newQuoteData?.EstimatedExportEarnings && newQuoteData?.totalEstimatedPrice) {
      console.log(orderTotal, userDepositAmount, newQuoteData?.before_solar, newQuoteData?.new_after_solar, newQuoteData?.EstimatedExportEarnings, "totalEstimatedPricee")
      setNewquoteData((prev: any) => ({
        ...prev,
        financePaybackTime: ((Number(orderTotal) + Number(userDepositAmount)) /
          (getParseInt(newQuoteData?.before_solar) -
            getParseInt(newQuoteData?.new_after_solar) +
            getParseInt(newQuoteData?.EstimatedExportEarnings))),
        cashPaybackTime: Number(newQuoteData?.totalEstimatedPrice) /
          (Number(newQuoteData?.before_solar) -
            Number(newQuoteData?.new_after_solar) +
            Number(newQuoteData?.EstimatedExportEarnings))

      }))
    }
  }, [orderTotal, userDepositAmount, estimatedPrice, newQuoteData?.before_solar, newQuoteData?.new_after_solar, newQuoteData?.EstimatedExportEarnings, newQuoteData?.totalEstimatedPrice])
  useEffect(() => {

    if (newQuoteData?.financePaybackTime) {
      console.log(newQuoteData, "first", newQuoteData?.financePaybackTime)
      addDataForSorting(newQuoteData)
    }
  }, [newQuoteData?.financePaybackTime])
  // const[loading,setLoading]=useState(false);
  // const setUKMobileNoFormat = (mno: any, prefix = '+') => {
  //   if (!mno) {
  //     return '';
  //   }

  //   let formattedMno = mno
  //     .replace('(0)', '')
  //     .replace('(', '')
  //     .replace(')', '')
  //     .replace('+', '')
  //     .replace('-', '')
  //     .replaceAll(' ', '')
  //     .replace(/^0+/, '');
  //   // ltrim 0

  //   if (!formattedMno.startsWith('44')) {
  //     formattedMno = `44${formattedMno}`;
  //   }
  //   if (prefix && prefix !== '44') {
  //     prefix = prefix.trim();
  //     formattedMno = prefix + formattedMno;
  //   }

  //   return formattedMno;
  // };


  const saveCurrentPackageInfo = useCallback(async (quoteData) => {

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
      payback_time: (Number(orderTotal) /
        (Number(quoteData?.before_solar) -
          Number(quoteData?.new_after_solar) +
          getParseInt(quoteData?.EstimatedExportEarnings))).toFixed(1) || 0,
      cash_payback_time: (
        Number(quoteData?.totalEstimatedPrice) /
        (Number(quoteData?.before_solar) -
          Number(quoteData?.new_after_solar) +
          Number(quoteData?.EstimatedExportEarnings))
      ).toFixed(0) || 0,
      export_earning: quoteData?.EstimatedExportEarnings || 0,
      panel_name: quoteData?.solar_panels?.solar_panel_name || "",
      panel_feature: quoteData?.solar_panels?.features || "",
      inverter_name: quoteData?.inverters?.inverter_name || "",
      inverter_feature: quoteData?.totalPanels > 16 ? inverter_variation2_features || "" : inverter_variation1_features || "",

      inverter_variation: quoteData?.totalPanels > 16 ? inverter_variation2?.inverter_kWh || "" : inverter_variation1?.inverter_kWh || "",

      battery_name: quoteData?.battery_name || "",
      battery_feature: quoteData?.features || "",
      battery_kWh: quoteData?.battery_kWh || "",
      combo: originalcomboData,
      battery_size: 'none',
      lead_status: quoteData?.lead_status || "",
      log: JSON.stringify({ globalMonthly: quoteData.globalMonthly, monthly: quoteData.monthly, sixtyMonths: quoteData.sixtyMonths, twelveMonths: quoteData.twelveMonths, selectedMonths: quoteData.selectedMonths, interest: quoteData.interest, loan: quoteData.loan, RangeFinance: quoteData.RangeFinance, ...quoteData }),
      randomstring: quoteData?.randomstring || "",
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
  }, [newQuoteData, OBJCOMBO])
  useEffect(() => {
    if (
      // inverters?.inverter_name &&
      optimisers?.optimiser_name &&
      solar_panels?.solar_panel_name &&
      battery?.battery_name
    ) {
      if (typeof window !== 'undefined') {
        const gsap = require('gsap/dist/gsap').gsap;
        const ScrollTrigger = require('gsap/dist/ScrollTrigger').ScrollTrigger;

        // Register the ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        const anim = gsap.fromTo(
          `.includePart${index + 1}`,
          { opacity: 0, x: 100 }, // Initial state
          { opacity: 1, x: 0, stagger: 0.4, duration: 1 } // Final state
        );
        ScrollTrigger.create({
          trigger: `.heading${index + 1}`,
          animation: anim,
          start: 'top center',
          // end: "top 100px",
          // markers: true
        });
      }
    }
  }, [inverters, battery, solar_panels, optimisers]);


  const saveLeadData = useCallback(async () => {
    // console.log('newQuoteData==>', newQuoteData, OBJCOMBO, sortedData);
    // console.log("wdhewopfh", sortedData)
    saveCurrentPackageInfo(sortedData)
  },

    [newQuoteData, OBJCOMBO, RangeFinance, sortedData, selectedMonths, newQuoteData?.totalEstimatedPrice])

  const EstimateAnnualBillSavings = newQuoteData?.before_solar - newQuoteData?.new_after_solar;

  const displayEnquireAboutThisPackage = () => {
    return (
      <div className='animationBorder borderRadius10px widthFitContentDesktopp z-0'>
        <div className='m1px position-rel z-1 w-100'>
          <div onClick={() => { event(EVENTENUMS.InitiateCheckout, { 'package_name': sortedData?.combo_name, 'content_type': 'package' }); saveLeadData() }} className="componentOneBookCallBackForFreeSurvey text-center">
            Enquire about this package
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`${`section${index + 1}`}`} id={`${`section${index + 1}`}`}>
        <div className="topLine">
          <div className="number2">
            <span className="numberOption2">Option</span>
            {index + 1}
          </div>
          <div className={`comboHeading${index + 1} comboHeading2 heading`}>
            <span className="fontBold">{sortedData?.totalPanels + ' X ' + sortedData?.combo_name}</span>
          </div>
        </div>
        <div className="comboImgWrapper2">
          {/* <div className="row mt-1 mt-xl-3 col-12 flex-column"> */}
          {/* <div className={`heading${index + 1} comboHeading${index + 1}`}>
            <div className="fontBold">{OBJCOMBO.combo_name}</div>
            <div className="d-block d-xl-none font28White fontLight"><span className="fontBold">OUR TOP PICK:</span> Highest Savings - Quickest Payback</div>
          </div> */}
          <div className="col-12 comboImageWrapper2">
            <div className="d-flex ml-5 img-dasolar-givLogo flex-column z-1">
              <div className="mb-2">
                {sortedData?.solar_logo_image?.path && <Image quality={100}
                  className="newIconImg"
                  src={sortedData?.solar_logo_image.path}
                  alt="dasolarLogo"
                  width={156}
                  height={90}
                />}
              </div>
              {/* <div className="mt-logo mb-2 newIconImg">
                <Image quality={100}
                  className="newIconImg"
                  src="/images/pages/result/newGivLogo.webp"
                  alt="givLogo"
                  width={180}
                  height={50}
                />
              </div> */}
              <div className="mt-logo">
                {index === 1 && sortedData?.logo_left_image?.path && (
                  <Image quality={100}
                    src={sortedData?.logo_left_image.path}
                    className="bestSolar"
                    alt="best-solar"
                    width={120}
                    height={120}
                  />
                )}
              </div>
              <div className="mt-logo">
                {index === 2 && sortedData?.logo_left_image?.path && (
                  <Image quality={100}
                    src={sortedData?.logo_left_image.path}
                    className="bestBig"
                    alt="best-big"
                    width={120}
                    height={120}
                  />
                )}
              </div>
            </div>

            <Image quality={100}
              alt="comboImage"
              width={300}
              height={330}
              src={sortedData?.combo_image?.path}
              style={{ objectFit: 'contain' }}
              className="comboImage2 position-relative ml-auto"
            />
            {sortedData?.logo_right_image?.path && (
              <div className="mt-logo bestBigIcon">
                <Image quality={100}
                  src={sortedData?.logo_right_image.path}
                  alt="work-with"
                  className="workWithIcon"
                  width={100}
                  height={100}
                />
              </div>
            )}
            {/* <img src="/images/pages/result/sec1SolarMob.png" className="img-fluid d-block d-xl-none" /> */}
          </div>
          {/* </div> */}
        </div>
        {/* <div className="d-block d-xl-none checkListMob position-relative">
          <div className=" col-12 col-md-auto mx-auto">
            <div className="row row-cols-2 justify-content-center gx-5">
              <div className="col-auto MobCheck p-0">
                <span><img src="/images/pages/result/checkWhte.png" /></span>
                440W N-Type Panels
              </div>
              <div className="col-auto MobCheck p-0">
                <span><img src="/images/pages/result/checkWhte.png" /></span>
                Giv-Energy Inverter
              </div>
              <div className="clearfix w-100"></div>
              <div className="col-auto MobCheck p-0">
                <span><img src="/images/pages/result/checkWhte.png" /></span>
                Bi-facial Design
              </div>
              <div className="col-auto MobCheck p-0">
                <span><img src="/images/pages/result/checkWhte.png" /></span>
                All-black design
              </div>
              <div className="linkRightAbs"
                role='button'
                tabIndex={0}
                onClick={() => { setOpenResultPagePopUp(true), setDisableScroll(true) }}>
                <a className="link24White">view all</a>
              </div>
            </div>
          </div>
        </div> */}
        <div className="bgLightGray newBgLightGray">
          <div className="col-12 pb-3">
            <ul className="newCheckList mt-2">
              {sortedData?.combo_features && sortedData?.combo_features
                .split('\n')
                .map((item: any, index: number) => {

                  let displayNumber = sortedData?.totalPanels > 16 ? `1 X ${inverter_variation2.inverter_kWh} kWh ` : `1 X ${inverter_variation1.inverter_kWh} kWh `;
                  if (index === 0 || index === 3) {
                    displayNumber = `${quoteData?.totalPanels} X `
                  }
                  if (index === 2 && quoteData?.battery_unique_id !== "NoBattery") {
                    displayNumber = `1 X `
                  }
                  if (index === 2 && quoteData?.battery_unique_id == "NoBattery") {
                    displayNumber = `${quoteData?.totalPanels} X `
                  }
                  if (index === 3 && quoteData?.battery_unique_id == "NoBattery") {
                    displayNumber = ``
                  }

                  if (index >= 4) {
                    displayNumber = ''
                  }

                  return (
                    <li key={index} className='align-items-start' style={{ display: sortedData?.battery_kWh === '1' && index == 2 ? 'none' : 'flex' }}>
                      <span>
                        <Image quality={100}
                          src="/otherpages/purpleCheckmark.svg"
                          alt="newCheckBlk"
                          style={{
                            height: "28px",
                            width: "25px"
                          }}
                          width={100}
                          height={100}
                        />
                      </span>


                      {displayNumber}
                      {item}
                      {/* {quoteData?.totalPanels && index == 0 && (<>{quoteData?.totalPanels} X </>)}
                        {index == 1 && (<>1 X </>)}

                        {index == 2 && sortedData?.battery_unique_id == "NoBattery" && (<>{quoteData?.totalPanels} X </>)}
                        {index == 2 && sortedData?.battery_unique_id !== "NoBattery" && (<>1 X </>)}
                        {quoteData?.totalPanels && sortedData?.battery_unique_id !== "NoBattery" && index == 3 && (<>{quoteData?.totalPanels} X </>)} */}
                      {/* {item} */}
                    </li>
                  );
                  // }
                })}
            </ul>
          </div>

          <div className='viewFullBreakdownBorderRadius1 mb-3 z-0 widthFitContent'>
            <button
              type="button"
              className="newBtnBlue mt-0 position-rel viewFullBreakdownBorderRadius1 z-1 "
              onClick={() => {
                if (PixelEventLimitingRef.current) {
                  event(EVENTENUMS.Search + "_" + sortedData?.combo_name, { 'package_name': sortedData?.combo_name, 'content_type': 'package' });

                  PixelEventLimitingRef.current = false
                }
                // setOpenResultPagePopUp(true);
                changePopupData(sortedData?.combo_name);
                // console.log("firstopen", openingModalName)
                setOpeningModalName((prev) => {
                  let newarr = prev.filter((name) => name !== modalEnum.closeResultPagePopup)
                  return [...newarr, modalEnum.openResultPagePopup]
                });
                setDisableScroll(true)
              }
              }
            >
              <div className='px-4 fontMed'>
                View full breakdown...
              </div>
              <div className='blueButtonInnerDiv z-n1'>
              </div>
            </button>
          </div>

          <div className="font22Blue font18px lineHeight22 textCenter lineHeight50Mob">
            Your Estimated Annual Savings
          </div>
          <div className="font16Blue fontLight textCenter mb-3 mb-xl-0 marginTop5">
            Based on your usage of {sortedData?.annual_energy_usage}kWh
          </div>
          <div className="col-12 px-0 mt-4">
            <div className="row g-2 flex-column estimateCardDiv">
              <div className="col-12 order-0 order-xl-0 componentNewOneEstimatedAnnualElectricityBill02">
                <div
                  className="grayBox borderRadius18 cursor-pointer"
                  onClick={() => {
                    // setOpenSolarSavingPopup(true), setDisableScroll(true);
                    changePopupData(sortedData?.combo_name);
                    setOpeningModalName((prev) => {
                      let newarr = prev.filter((name) => name !== modalEnum.closeSolarSavingPopup)
                      return [...newarr, modalEnum.solarSavingPopup]
                    });
                    setDisableScroll(true)
                  }}
                >
                  <div className="electricityBillDIV d-flex justify-content-between">
                    <div className="font16Brown fontNormal col-4 pe-1">
                      Estimated Annual
                      <br />
                      Electricity Bill
                    </div>

                    <div className='d-flex justify-content-between w-100 gap-2'>
                      <div className="col-33">
                        <div className="font14Black">Before solar</div>
                        <div className="font26Blue lineHeight50Mob">
                          £{addCommas(getParseInt(sortedData?.before_solar))}
                        </div>
                      </div>
                      <div className="col-33">
                        <div className="font14Black">After solar</div>
                        <div className="font26Blue lineHeight50Mob">
                          £{addCommas(getParseInt(sortedData?.new_after_solar))}
                        </div>
                      </div>
                      <div className="col-33 text-reductionn">
                        <div className="font14Black">Bill Reduction</div>

                        <div className="font24Greenn fontGreen font26Blue fontMed font85GreenMob">
                          {getParseInt(
                            sortedData?.after_electricity_bill_percentage
                          )}
                          %
                        </div>
                      </div>
                      <div />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 order-0 order-xl-0 componentNewOneEstimatedAnnualElectricityBill01">
                <div
                  className="grayBox borderRadius18 cursor-pointer"
                  onClick={() => {
                    // setOpenSolarSavingPopup(true), setDisableScroll(true);
                    changePopupData(sortedData?.combo_name);
                    setOpeningModalName((prev) => {
                      let newarr = prev.filter((name) => name !== modalEnum.closeSolarSavingPopup)
                      return [...newarr, modalEnum.solarSavingPopup]
                    });
                    setDisableScroll(true)
                  }}
                >
                  <div className="font16Brown fontNormal borderbotmBrown">
                    Estimated Annual Electricity Bill
                  </div>
                  <div className="electricityBillDIV">
                    <div className="col-4 mt-1">
                      <div className="font14Black">Before solar</div>
                      <div className="font26Blue lineHeight50Mob">
                        £{addCommas(getParseInt(sortedData?.before_solar))}
                      </div>
                    </div>
                    <div className="col-4 mt-1">
                      <div className="font14Black">After solar</div>
                      <div className="font26Blue lineHeight50Mob">
                        £{addCommas(getParseInt(sortedData?.new_after_solar))}
                      </div>
                    </div>
                    <div className="col-4 mt-1 text-reduction">
                      <div className="font14Black">Bill Reduction</div>

                      <div className="fontGreen font26Blue fontMed font85GreenMob">
                        {getParseInt(
                          sortedData?.after_electricity_bill_percentage
                        )}
                        %
                        {/* <img src="/images/pages/result/energyIcon.png" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 order-1 order-xl-1">
                <div className="grayBox borderRadius18 grayBoxFlex">
                  <div className="font16Brown fontNormal font58Mob">
                    Estimated Annual <br /> Bill Saving
                  </div>
                  {/* <div className="row"> */}
                  <div className="col-4 mt-0">
                    <div className="font24Green fontMed font85GreenMob">
                      £
                      {getParseInt(EstimateAnnualBillSavings)}
                      {/* <img src="/images/pages/result/energyIcon.png" /> */}
                    </div>
                    <div className="font14Blue">
                      £
                      {addCommas(
                        getParseInt(EstimateAnnualBillSavings / 12)
                      )}{' '}
                      per month
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="col-12 order-2 order-xl-2">
                <div className="grayBox borderRadius18 grayBoxFlex ">
                  <div className="font16Brown fontNormal font58Mob">
                    Estimated Annual <br />
                    Export Earnings
                  </div>
                  <div className="col-4 justify-content-between">
                    <div className="mt-0">
                      {/* <div className="font14Black">
                        {battery && battery.battery_kWh!=='1' ? (
                          '(Intelligent Octopus Flux Tariff)'
                        ) : (
                          'Est. Annual Export Earnings(Standard Energy Export Tariff)'
                        )}</div> */}
                      <div className="font24Green fontMed">
                        £
                        {addCommas(
                          getParseInt(sortedData?.EstimatedExportEarnings)
                        )}
                        {/* {battery && battery.battery_kWh!=='1' ? (
                          <>
                            <img src="/images/pages/result/octopusLogoSmall.png" className="d-none d-xl-inline-block" />
                            <img src="/images/pages/result/octopusLogoMob.png" className="d-inline-block d-xl-none logo66" />
                          </>
                        ) : (
                          ''
                        )} */}
                        {/* {newQuoteData?.batteryData?.battery_kWh !== '1' ? (
                          <>
                            <img src="/images/pages/result/octopusLogoSmall.png" className="d-none d-xl-inline-block" />
                            <img src="/images/pages/result/octopusLogoMob.png" className="d-inline-block d-xl-none logo66" />
                          </>
                        ) : (
                          ''
                        )} */}
                      </div>
                      <div className="font14Blue" style={{ textWrap: 'nowrap' }}>
                        £
                        {addCommas(
                          getParseInt(sortedData?.EstimatedExportEarnings) / 4
                        )}{' '}
                        per quarter
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 order-3 order-xl-3">
                {/* <div className="grayBox borderRadius18 grayBoxFlex greenBoxMob cursorPointer" onClick={() => { setOpenFinanceCalculatorPopup(true); }}> */}
                <div className="grayBox borderRadius18 grayBoxFlex greenBoxMob cursorPointer" onClick={() => {
                  changePopupData(sortedData?.combo_name);
                  setOpeningModalName((prev) => {
                    let newarr = prev.filter((name) => name !== modalEnum.closeFinanceCalculatorPopup)
                    return [...newarr, modalEnum.financeCalculatorPopup]
                  });
                }}>
                  <div className="font16Brown fontNormal col-8 px-1">
                    Estimated <br />
                    Payback time (ROI)
                  </div>
                  {/* <div className="row"> */}
                  {/* <div className="mt-0 col-4 px-1 mb-auto">
                    <div className="font26Blue lineHeight50Mob">{`${(
                      (Number(orderTotal) + Number(userDepositAmount)) /
                      (getParseInt(newQuoteData?.before_solar) -
                        getParseInt(newQuoteData?.new_after_solar) +
                        getParseInt(newQuoteData?.EstimatedExportEarnings))
                    ).toFixed(1)} Years`}</div>
                    <div className="font14Blue">
                      on finance
                    </div>
                  </div> */}
                  {/* Estimated Return <br /> of investment <br /> on finance */}
                  {/* Estimated Return of investment on finance */}
                  {/* <div className="mt-0 col-4 px-1 mb-auto">
                    <div className="font26Blue lineHeight50Mob">{`${sortedData?.financePaybackTime?.toFixed(1)  } Years`}</div>
                    <div className="font14Blue">
                      on finance
                    </div>
                  </div> */}
                  <div className="col-4 mt-1 px-1 mb-auto">
                    <div className="font26Blue lineHeight50Mob fontGreen">{`${sortedData?.cashPaybackTime?.toFixed(1)} Years`}</div>
                    <div className="font14Blue">
                      cash purchase
                    </div>
                    {/* Estimated Return <br /> of investment <br /> cash purchases */}
                    {/* Estimated Return of investment cash purchases */}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="comboNewBtnGreen1 mt-4">
              {/* <div className="font28Blue lineHeight22 textCenter lineHeight50Mob">
                Estimate Package Cost
              </div> */}
              <div className="mt-4 lightBtn align-items-center">
                {/* <div className="me-4"><img src="/images/pages/result/octopusLogo.png" /></div>
                  <div><img src="/images/pages/result/mscLogo2.png" /></div> */}
                {
                  isSaleOn ? (
                    <>
                      <div className="newLightBox newLightBoxWithOfferPadding borderRadius18 newLightBoxMob1">
                        <div className="col-12 mt-11 text-center">
                          <div className="font14Blue mb-1">Cash Estimate</div>
                          <div className="font14Blue mb-1">
                            Normally {' '}
                            <strong className='fw-bold text-decoration-line-through'>
                              £
                              {addCommas(
                                getParseInt(sortedData?.totalEstimatedPrice * 1.15)
                              )}
                            </strong>
                          </div>
                          <div className="font24 lineHeight22 text-nowrap">
                            NOW £
                            {addCommas(
                              getParseInt(sortedData?.totalEstimatedPrice)
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                    :
                    (
                      <>
                        <div className="newLightBox borderRadius18 newLightBoxMob1">
                          <div className="col-12 mt-11 text-center">
                            <div className="font14Blue mb-1">Cash Estimate</div>
                            <div className="font32Blue lineHeight22 font80Mob mb-1">
                              £
                              {addCommas(
                                getParseInt(sortedData?.totalEstimatedPrice)
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )
                }

                <div className="newLightBox borderRadius18 cursorPointer newLightBoxMob2" onClick={() => {
                  changePopupData(sortedData?.combo_name);
                  setOpeningModalName((prev) => {
                    let newarr = prev.filter((name) => name !== modalEnum.closeFinanceCalculatorPopup)
                    return [...newarr, modalEnum.financeCalculatorPopup]
                  });
                }} >
                  <div className="col-12 mt-0 text-center">
                    <div className="font14Blue mb-1">Or Monthly From</div>
                    <div className="font32Blue-lineHeight22 font80Mob   ">
                      {/* <span className="font14Blue">Or</span>  */}
                      <span style={{ borderBottom: '3px dotted black', display: "inline-block " }} className='font32BlueNoMinW lineHeight22 font80Mob lineHeight08 ' >

                        £
                        {addCommas(
                          getParseFloat(sortedData?.globalMonthly).toFixed(2)
                        )}
                      </span>
                    </div>
                    <div className='font8px'>
                      Click for more info
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">

              {/* <div className='animationBorder borderRadius10px mt-4 z-0'>
              <div className='m1px position-rel z-1 w-100'>
                <button
                  type="button"
                  className="newBtnGreen mt-0"
                  onClick={() => {
                    setOpenResultPagePopUp(true);
                    setDisableScroll(true)
                    // saveCurrentPackageInfo(newQuoteData, OBJCOMBO)
                  }}
                >
                  More details4
                </button>
              </div>
            </div> */}

              {/* <div className='animationBorder borderRadius10px mt-4 z-0'>
            <div className='m1px position-rel z-1 w-100'>
              <button
                type="button"
                className="newBtnGreen mt-0"
                onClick={() => {
                  // setOpenResultPagePopUp(true);
                  changePopupData(sortedData?.combo_name);
                      // console.log("firstopen",openingModalName)
                      setOpeningModalName((prev)=>{
                        let newarr= prev.filter((name)=>name!==modalEnum.closeResultPagePopup)
                        return [...newarr,modalEnum.openResultPagePopup]
                      });
                      setDisableScroll(true)

                  // saveCurrentPackageInfo(newQuoteData, OBJCOMBO)

                }}
              >
                More details
                </button>
              </div>
            </div> */}


              <div className='mt-4'>
                {sortedData?.combo_name && displayEnquireAboutThisPackage()}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="p-3 py-2 sectionLastPart d-none d-xl-block">
          <div className="row">
            <div className="col font20Blue">Get this incredible package from as little as £{getParseInt(globalMonthly/4)} per week</div>
            <div className="col-auto position-relative">
              <button type="button" className="btnGreen" onClick={()=>saveCurrentPackageInfo(newQuoteData,OBJCOMBO)}>Enquire About This Package</button>
            </div>
          </div>
        </div>
        <button type="button" className="btnGreen d-block d-xl-none">Enquire About This Package</button> */}
      </div>
      <div />
    </>
  );
};

export default ComponentNewOne;
