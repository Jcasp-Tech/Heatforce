import { useCallback, useEffect, useRef, useState } from 'react';
import { getParseFloat, getParseInt } from '../NumberFunctions';
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { event, EVENTENUMS } from '../Pixel/facebook/lib/fpixel';
import GlobalCursor2 from '../globalCursor2';

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
  changePopupData: (d: any) => void;
  // setSortedSelectedIndex: any;
  setOpeningModalName: (d: any) => void;
  openingModalName?: modalEnum[];
  comboName: any;
}
enum modalEnum {
  openResultPagePopup = 'openResultPagePopup',
  closeResultPagePopup = 'closeResultPagePopup',
  solarSavingPopup = 'solarSavingPopup',
  closeSolarSavingPopup = 'closeSolarSavingPopup',
  financeCalculatorPopup = 'financeCalculatorPopup',
  closeFinanceCalculatorPopup = 'closeFinanceCalculatorPopup',
}

const ComponentTwo = (props: ComponentOneProps) => {
  const {
    setDisableScroll,
    // setIsPopupInPopup,
    quoteData,
    addDataForSorting,
    // isPopupInPopup,
    OBJCOMBO,
    index,
    // originalcomboData,
    sortedData,
    changePopupData,
    setOpeningModalName,
    comboName
  } = props;

  const { optimisers, inverters, battery, solar_panels } = OBJCOMBO;
  const logData = JSON.parse(quoteData?.leadData?.log ?? '{}')
  const [newQuoteData, setNewquoteData] = useState({ ...quoteData });
  const [, setIsCalculationAPILoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(sortedData?.totalEstimatedPrice ?? 0);
  const [userDepositAmount, setUserDepositAmount] = useState(quoteData?.leadData?.lead_status === "CONFIRM" ? logData?.userDepositAmount : sortedData?.userDepositAmount ?? 0);
  const [sixtyMonths, setSixtyMonths] = useState(quoteData?.leadData?.lead_status === "CONFIRM" ? logData?.sixtyMonths : sortedData?.sixtyMonths ?? 0);
  const [twelveMonths, setTwelveMonths] = useState(quoteData?.leadData?.lead_status === "CONFIRM" ? logData?.twelveMonths : sortedData?.twelveMonths ?? 0);
  const [globalMonthly, setGlobalMonthly] = useState(quoteData?.leadData?.lead_status === "CONFIRM" ? logData?.globalMonthly : sortedData?.globalMonthly ?? 0);
  const [monthly, setMonthly] = useState(quoteData?.leadData?.lead_status === "CONFIRM" ? logData.monthly : sortedData?.monthly ?? 0);
  const [loan, setLoan] = useState(quoteData?.leadData?.lead_status === "CONFIRM" ? logData.loan : sortedData?.loan ?? 0);
  const [interest, setInterest] = useState(quoteData?.leadData?.lead_status === "CONFIRM" ? logData.interest : sortedData?.interest ?? 0);
  const [orderTotal, setOrderTotal] = useState(sortedData?.orderTotal ?? 0);
  const [RangeFinance,] = useState(0);
  const [selectedMonths,] = useState(120);
  const router = useRouter();
  const PixelEventLimitingRef = useRef(true)
  const [isSaleOn,] = useState(true);

  const [batteryVariant, setBateryVariant] = useState<any>();
  const [comboBatteryVariants, setComboBatteryVariants] = useState<any>();

  const handleBatteryVariantChange = (batteryVariant: any) => {
    const newBatteryVariant = comboBatteryVariants.find((battery) => battery.battery_kWh === batteryVariant);
    setBateryVariant(newBatteryVariant)
  }

  useEffect(() => {
    if (OBJCOMBO.battery_more) {

      if (OBJCOMBO?.battery_more?.length) {
        // Extract the whole battery object
        const batteryVariants = OBJCOMBO.battery_more.map((battery: any) => ({
          ...battery,
          battery_kWh: parseFloat(battery.battery_kWh) // Ensure that battery_kWh is a number
        }));

        // Sort the battery variants by battery_kWh in ascending order
        batteryVariants.sort((a, b) => a.battery_kWh - b.battery_kWh);
        setComboBatteryVariants(batteryVariants)

        setBateryVariant(batteryVariants[1]);
      }

    }
  }, [])

  const calLoan = (result: any) => {
    setGlobalMonthly(result.monthlyPayment);
    setMonthly(result.monthlyPayment);
    setLoan(result.loanAmount);
    setOrderTotal(result.totalRepayment);
    setInterest(result.costOfFinance);
  };

  useEffect(() => {
    try {

      if (newQuoteData?.totalEstimatedPrice) {
        const depositAmount =
          (RangeFinance / 100) * newQuoteData?.totalEstimatedPrice;

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
      return { ...prev, ...OBJCOMBO, orderTotal, userDepositAmount, siztyMonths: sixtyMonths, twelveMonths, globalMonthly, monthly, loan, interest, RangeFinance, selectedMonths, selectedCombo: batteryVariant }
    })
  }, [orderTotal, userDepositAmount, sixtyMonths, twelveMonths, globalMonthly, monthly, loan, interest, RangeFinance, selectedMonths, batteryVariant]);

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
        if (allRoofData[i].roof_direction === 'NE') {
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

      if (quoteData?.regionQuarterlyDetails) {
        estimated_co2_reduction = quoteData?.regionQuarterlyDetails[0]?.CO2emission;
      }

      if (quoteData?.regionQuarterlyDetails[0]?.quarterly_unit_rate) {
        averageUnitRate = quoteData?.regionQuarterlyDetails[0]?.quarterly_unit_rate;
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
            battery_energy_storage: batteryData ? batteryData : '1',
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

            const FT = T + taxAmount;
            const with_battery = newQuoteData.regionQuarterlyDetails[0].SEG_Factor_with_battery;
            const without_battery =
              newQuoteData.regionQuarterlyDetails[0].SEG_Factor_without_battery;
            const exportEarningFactor =
              OBJCOMBO?.battery_kWh !== '1' ? with_battery : without_battery;

            const SEG = (EAEG - EUEP) * exportEarningFactor;

            const TOELEBILL = leadCalculation?.total_electricity_bill;
            FEEBS = TOELEBILL - FT;
            estimated_annual_usable = await getParseFloat(
              estimatedEnnualUsableEnergy.totalUsableEnergy,
              5
            );
            afterAnnualCO2 =
              Number(estimated_annual_usable) * Number(estimated_co2_reduction);

            AfterUseablePercentage = (Number(EUEP) * 100) / Number(EAEC);
            AfterElectricityBillPercentage = (FEEBS * 100) / TOELEBILL;
            if (AfterElectricityBillPercentage > 96) {
              AfterElectricityBillPercentage = 96;
            }
            AfterCO2Percentage =
              (afterAnnualCO2 * 100) / before_annual_CO2_emmisions;

            NewAfterSolar = TOELEBILL - FEEBS;

            EstimatedExportEarnings = SEG;
            EstimatedExportEarningsWithoutBattery =
              (EAEG - EUEP) * without_battery;

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
      setIsCalculationAPILoading(false);
    } catch (error) {
      setIsCalculationAPILoading(false);
    }
  };

  useEffect(() => {
    Calculation(quoteData, batteryVariant?.battery_kWh);
  }, [quoteData, batteryVariant]);


  const inverter_variation1: any = Object.values(OBJCOMBO.inverters.more)[0]
  const inverter_variation1_features = inverter_variation1.features

  const inverter_variation2: any = Object.values(OBJCOMBO.inverters.more)[1]
  const inverter_variation2_features = inverter_variation2.features

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
        Number(batteryVariant?.battery_price) +
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
      addDataForSorting(newQuoteData)
    }
  }, [newQuoteData?.financePaybackTime])

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
      payback_time: (
        (Number(orderTotal) + Number(userDepositAmount)) /
        (getParseInt(quoteData?.before_solar) -
          getParseInt(quoteData?.new_after_solar) +
          getParseInt(quoteData?.EstimatedExportEarnings))
      ).toFixed(1) || 0,
      cash_payback_time: (
        Number(quoteData?.totalEstimatedPrice) /
        (Number(quoteData?.before_solar) -
          Number(quoteData?.new_after_solar) +
          Number(quoteData?.EstimatedExportEarnings))
      ).toFixed(1) || 0,

      export_earning: quoteData?.EstimatedExportEarnings || 0,
      panel_name: quoteData?.solar_panels?.solar_panel_name || "",
      panel_feature: quoteData?.solar_panels?.features || "",
      inverter_name: quoteData?.inverters?.inverter_name || "",
      inverter_feature: quoteData?.totalPanels > 16 ? inverter_variation2_features : inverter_variation1_features || "",

      inverter_variation: quoteData?.totalPanels > 16 ? inverter_variation2.inverter_kWh || "" : inverter_variation1.inverter_kWh || "",

      battery_name: batteryVariant?.battery_name || "",
      battery_feature: batteryVariant?.features || "",
      battery_kWh: batteryVariant?.battery_kWh || "",
      combo: OBJCOMBO,
      battery_size: 'none',
      lead_status: quoteData?.lead_status || "",
      log: JSON.stringify({ globalMonthly: quoteData.globalMonthly, monthly: quoteData.monthly, sixtyMonths: quoteData.sixtyMonths, twelveMonths: quoteData.twelveMonths, selectedMonths: quoteData.selectedMonths, userDepositAmount: quoteData.userDepositAmount, orderTotal: quoteData.orderTotal, interest: quoteData.interest, loan: quoteData.loan, RangeFinance: quoteData.RangeFinance, ...quoteData }),
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
    }
  }, [newQuoteData, OBJCOMBO, RangeFinance, selectedMonths, newQuoteData?.totalEstimatedPrice])

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
    saveCurrentPackageInfo(sortedData)
  }, [newQuoteData, OBJCOMBO, sortedData, RangeFinance, selectedMonths, newQuoteData?.totalEstimatedPrice])

  const EstimateAnnualBillSaving = newQuoteData?.before_solar - newQuoteData?.new_after_solar;

  const displayEnquireAboutThisPackage = () => {
    return (
      <div className={`animationBorder borderRadius10px z-0 ${sortedData?.leadData?.lead_status === "CONFIRM" ? 'opacity-0 pe-none' : ''}  `}>
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
      <div className={`${`section${5}`}`} id={`${`section${5}`}`} style={{ marginTop: '85px' }}>
        <div className="sectionDiv2">
          <GlobalCursor2 blob={"globalBlob2"} />
        </div>
        <div className="headingWrapper col-12">
          <div className="topLine">
            <div className="number">
              <span className="numberOption">Option</span>
              {index + 1}
            </div>
            {index === 1 && (
              <div className="mainHeading col-11">{quoteData?.leadData?.lead_status === "CONFIRM" ?
                (<span className="font34Green">YOUR CHOSEN OPTION: </span>) :
                <><span className="font34Green">OUR TOP PICK: </span>
                  <span className="valign">
                    Higher Export Earnings
                  </span></>}
              </div>
            )}
          </div>
          <div
            className={`heading${1} comboHeading${1} col-11`}
          >
            <div className='mb-4'>
              <p className='chooseBatteryText'>Choose the battery size you need</p>
              <div className='d-flex flex-row align-items-center gap-2 chooseButtonBattery2'>
                <div className=
                  {batteryVariant?.battery_kWh === comboBatteryVariants?.[0]?.battery_kWh ? 'BatteryVariantBoxSelected BatteryVariantWithOfferPadding borderRadius18' : 'BatteryVariantBox BatteryVariantWithOfferPadding borderRadius18'}
                  onClick={() => {
                    handleBatteryVariantChange(comboBatteryVariants?.[0]?.battery_kWh)
                  }}
                >
                  <div className={comboBatteryVariants?.[0]?.battery_kWh === 1 ? "col-12 mt-11 text-center px-1 cursor-pointer" : "col-12 mt-11 text-center paddingForBatteryButton cursor-pointer"}>
                    <div className="col-12 mt-11 text-center">
                      {/* <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[0]?.battery_kWh ? 'font11BlueSelected mb-1' : 'font11Blue mb-1'}>{batteryVariant?.battery_brand_name}</div> */}
                      <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[0]?.battery_kWh ? "font15Selected lineHeight20" : "font15-battery lineHeight20"}>
                        {comboBatteryVariants?.[0]?.battery_kWh === 1 ? "No Battery" : `${comboBatteryVariants?.[0]?.battery_kWh} KWh`}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[1]?.battery_kWh ? 'BatteryVariantBoxSelected BatteryVariantWithOfferPadding borderRadius18' : 'BatteryVariantBox BatteryVariantWithOfferPadding borderRadius18'}
                  onClick={() => {
                    handleBatteryVariantChange(comboBatteryVariants?.[1]?.battery_kWh)
                  }}>
                  <div className={comboBatteryVariants?.[1]?.battery_kWh === 1 ? "col-12 mt-11 text-center px-1 cursor-pointer" : "col-12 mt-11 text-center paddingForBatteryButton cursor-pointer"}>
                    <div className="col-12 mt-11 text-center">
                      {/* <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[1]?.battery_kWh ? 'font11BlueSelected mb-1' : 'font11Blue mb-1'}>{batteryVariant?.battery_brand_name}</div> */}
                      <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[1]?.battery_kWh ? "font15Selected lineHeight20" : "font15-battery lineHeight20"}>
                        {comboBatteryVariants?.[1]?.battery_kWh === 1 ? "No Battery" : `${comboBatteryVariants?.[1]?.battery_kWh} KWh`}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=
                  {batteryVariant?.battery_kWh === comboBatteryVariants?.[2]?.battery_kWh ? 'BatteryVariantBoxSelected BatteryVariantWithOfferPadding borderRadius18' : 'BatteryVariantBox BatteryVariantWithOfferPadding borderRadius18'}
                  onClick={() => {
                    handleBatteryVariantChange(comboBatteryVariants?.[2]?.battery_kWh)
                  }}>
                  <div className={comboBatteryVariants?.[2]?.battery_kWh === 1 ? "col-12 mt-11 text-center px-1 cursor-pointer" : "col-12 mt-11 text-center paddingForBatteryButton cursor-pointer"}>
                    <div className="col-12 mt-11 text-center">
                      {/* <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[2]?.battery_kWh ? 'font11BlueSelected mb-1' : 'font11Blue mb-1'}>{batteryVariant?.battery_brand_name}</div> */}
                      <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[2]?.battery_kWh ? "font15Selected lineHeight20" : "font15-battery lineHeight20"}>
                        {comboBatteryVariants?.[2]?.battery_kWh === 1 ? "No Battery" : `${comboBatteryVariants?.[2]?.battery_kWh} KWh`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="topLine headingWrapperMain">
          <div className="number">
            <span className="numberOption">Option</span>
            {index + 1}
          </div>
          {index === 1 && (
            <div className="mainHeading">{quoteData?.leadData?.lead_status === "CONFIRM" ?
              (<span className="font34Green">YOUR SELECTED OPTION </span>) :
              <><span className="font34Green">OUR TOP PICK: </span>
                <span className="valign">
                  Higher Export Earnings
                </span></>}
            </div>
          )}
        </div>
        <div className="comboCard mt-4">
          <div className="row mt-1 mt-xl-3 col-12 comboCardDiv position-relative">
            <div className="col-6 comboImageWrapper position-relative ">
              <div className="d-flex ml-5 flex-column logoImgDiv">
                <div className="mb-2 iconNone">
                  {batteryVariant?.logo_left_image?.path && (
                    <Image quality={100}
                      src={batteryVariant.solar_logo_image?.path}
                      alt="dasolarLogo"
                      width={200}
                      height={150}
                    />
                  )}
                </div>
                <div className="mt-logo brand-tag-work-with-icon">
                  {batteryVariant?.logo_left_image?.path && (
                    <Image quality={100}
                      src={batteryVariant?.logo_left_image?.path}
                      className="workWith"
                      alt="jiffy"
                      width={150}
                      height={150}
                    />
                  )}
                </div>
              </div>

              <div className='ButtonBatteryVariant'>
                <p className='font20'>Choose the battery size you need</p>
                <div className='d-flex flex-row lg:flex-row justify-content-center gap-2'>
                  <div className=
                    {batteryVariant?.battery_kWh === comboBatteryVariants?.[0]?.battery_kWh ? 'BatteryVariantBoxSelected BatteryVariantWithOfferPadding borderRadius18' : 'BatteryVariantBox BatteryVariantWithOfferPadding borderRadius18'}
                    onClick={() => {
                      handleBatteryVariantChange(comboBatteryVariants?.[0]?.battery_kWh)
                    }}
                  >
                    <div className="col-12 mt-11 text-center px-1 cursor-pointer">
                      <div className="col-12 mt-11 text-center">
                        <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[0]?.battery_kWh ? 'font11BlueSelected mb-1' : 'font11Blue mb-1'}>{batteryVariant?.battery_brand_name}</div>
                        <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[0]?.battery_kWh ? "font17Selected lineHeight22 mt-2" : "font17 lineHeight22 mt-2"}>
                          {comboBatteryVariants?.[0]?.battery_kWh === 1 ? "No Battery" : `${comboBatteryVariants?.[0]?.battery_kWh} KWh`}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[1]?.battery_kWh ? 'BatteryVariantBoxSelected BatteryVariantWithOfferPadding borderRadius18' : 'BatteryVariantBox BatteryVariantWithOfferPadding borderRadius18'}
                    onClick={() => {
                      handleBatteryVariantChange(comboBatteryVariants?.[1]?.battery_kWh)
                    }}>
                    <div className="col-12 mt-11 text-center px-1 cursor-pointer">
                      <div className="col-12 mt-11 text-center">
                        <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[1]?.battery_kWh ? 'font11BlueSelected mb-1' : 'font11Blue mb-1'}>{batteryVariant?.battery_brand_name}</div>
                        <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[1]?.battery_kWh ? "font17Selected lineHeight22 mt-2" : "font17 lineHeight22 mt-2"}>
                          {comboBatteryVariants?.[1]?.battery_kWh === 1 ? "No Battery" : `${comboBatteryVariants?.[1]?.battery_kWh} KWh`}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=
                    {batteryVariant?.battery_kWh === comboBatteryVariants?.[2]?.battery_kWh ? 'BatteryVariantBoxSelected BatteryVariantWithOfferPadding borderRadius18' : 'BatteryVariantBox BatteryVariantWithOfferPadding borderRadius18'}
                    onClick={() => {
                      handleBatteryVariantChange(comboBatteryVariants?.[2]?.battery_kWh)
                    }}>
                    <div className="col-12 mt-11 text-center px-1 cursor-pointer">
                      <div className="col-12 mt-11 text-center">
                        <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[2]?.battery_kWh ? 'font11BlueSelected mb-1' : 'font11Blue mb-1'}>{batteryVariant?.battery_brand_name}</div>
                        <div className={batteryVariant?.battery_kWh === comboBatteryVariants?.[2]?.battery_kWh ? "font17Selected lineHeight22 mt-2" : "font17 lineHeight22 mt-2"}>
                          {comboBatteryVariants?.[2]?.battery_kWh === 1 ? "No Battery" : `${comboBatteryVariants?.[2]?.battery_kWh} KWh`}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <Image quality={100}
                  // Battery Combo Image For Desktop
                  src={batteryVariant?.combo_image?.path}
                  width={460}
                  height={460}
                  alt="comboImage"
                  className="comboImage1 position-relative ml-auto"
                />
              </div>

              <Image quality={100}
                // Battery Combo Image For Mobile
                src={batteryVariant?.combo_image?.path}
                width={200}
                height={250}
                alt="comboImage mt-5"
                className="comboImage1 position-relative ml-auto BatteryOnlyMobileComponent"
              />

              <div className="mt-logo logo_right_image">
                {batteryVariant?.logo_right_image?.path && (
                  <Image quality={100}
                    src={batteryVariant.logo_right_image.path}
                    alt="work-with"
                    className="workWithIcon"
                    width={120}
                    height={120}
                  />
                )}
              </div>
            </div>

            <div className="col-5 combo1Icon">
              <div className="d-flex flex-column  align-items-start">
                <div className="me-4 mb-2">
                  <Image quality={100}
                    src={batteryVariant?.solar_logo_image?.path}
                    alt="dasolarLogo"
                    className='solar_logo_image'
                    width={250}
                    height={120}
                  />
                </div>
              </div>

              <ul className="checkList comboCheckList1 mt-2">
                {batteryVariant?.combo_features
                  ?.split('\n')
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
                      <li key={index}>
                        <span>
                          <Image
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
                      </li>
                    );
                  })}
              </ul>

              <div className="d-flex justify-content-between align-items-center mt-4">
                {
                  isSaleOn ? (
                    <>
                      <div className="lightBox lightBoxWithOfferPadding borderRadius18 ">
                        <div className="col-12 mt-11 text-center">
                          <div className="col-12 mt-11 text-center">
                            <div className="font14Blue mb-1">Cash Estimate </div>
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
                      </div>
                    </>
                  )
                    :
                    (
                      <>
                        <div className="lightBox borderRadius18 ">
                          <div className="col-12 mt-11 text-center">
                            <div className="col-12 mt-11 text-center">
                              <div className="font14Blue mb-1">Cash Estimate </div>
                              <div className="font30 lineHeight22">
                                £
                                {addCommas(
                                  getParseInt(sortedData?.totalEstimatedPrice)
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                }
                <div className="lightBox borderRadius18 cursorPointer" onClick={() => {
                  changePopupData(comboName);
                  setOpeningModalName((prev) => {
                    let newarr = prev.filter((name) => name !== modalEnum.closeFinanceCalculatorPopup)
                    return [...newarr, modalEnum.financeCalculatorPopup]
                  });
                }}>
                  <div className="col-12 mt-0 text-center">
                    <div className="font14Blue mb-1">Or Monthly From</div>
                    <div className="font30-lineHeight22 dottedUnderlineGlobal">
                      <span style={{ borderBottom: '3px dotted black', display: "inline-block " }} className='font32BlueNoMinW lineHeight22 font80Mob lineHeight08' >
                        £
                        {addCommas(
                          sortedData?.leadData?.lead_status === "CONFIRM" ? getParseFloat(sortedData?.leadData?.monthly_apr_from) : getParseFloat(sortedData?.globalMonthly).toFixed(2)
                        )}
                      </span>
                    </div>
                    <div className='font8px'>
                      Click for more info
                    </div>
                  </div>
                </div>
              </div>

              <div className='comboNewBtnGreen viewFullBreakdownBorderRadius2 mt-4 z-0 w-100'>
                <button
                  type="button"
                  className="newBtnBlue mt-0 position-rel viewFullBreakdownBorderRadius2 z-1 "
                  onClick={() => {
                    // setOpenResultPagePopUp(true) ;
                    if (PixelEventLimitingRef.current) {
                      event(EVENTENUMS.Search + "_" + sortedData?.combo_name, { 'package_name': sortedData?.combo_name, 'content_type': 'package' });
                      PixelEventLimitingRef.current = false
                    }

                    changePopupData(comboName);
                    setOpeningModalName((prev) => {
                      let newarr = prev.filter((name) => name !== modalEnum.closeResultPagePopup)
                      return [...newarr, modalEnum.openResultPagePopup]
                    });
                    setDisableScroll(true)
                  }
                  }
                >
                  View full breakdown...
                  <div className='blueButtonInnerDiv z-n1'>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 mt-4 bgLightGray position-relative">
          <ul className="checkList comboCheckList2 mt-2">
            {batteryVariant?.combo_features && batteryVariant?.combo_features
              .split('\n')
              .map((item: any, index: number) => {
                return (
                  <li key={index}>
                    <span>
                      <Image quality={100}
                        src="/images/pages/result/newCheckBlk.webp"
                        alt="newCheckBlk"
                        width={25}
                        height={28}
                      />
                    </span>
                    {sortedData?.totalPanels && index == 0 && (<>{sortedData?.totalPanels} X </>)}
                    {index == 1 && (<>1 X </>)}
                    {index == 2 && (<>1 X </>)}
                    {sortedData?.totalPanels && index == 3 && (<>{sortedData?.totalPanels} X </>)}
                    {item}
                  </li>
                );
              })}

            <div className='viewFullBreakdownBorderRadius2 mb-3 z-0 widthFitContent'>
              <button
                type="button"
                className="newBtnBlue mt-0 position-rel viewFullBreakdownBorderRadius2 z-1 "
                onClick={() => {
                  if (PixelEventLimitingRef.current) {
                    event(EVENTENUMS.Search + "_" + sortedData?.combo_name, { 'package_name': sortedData?.combo_name, 'content_type': 'package' });
                    PixelEventLimitingRef.current = false;
                  }

                  // setOpenResultPagePopUp(true);
                  changePopupData(comboName);
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

          </ul>
          <div className="font22Blue font18px lineHeight22 textCenter lineHeight50Mob">
            Your Estimated Annual Savings
          </div>
          <div className="font16Blue fontLight textCenter marginTop5 mb-3 mb-xl-0">
            Based on your usage of {sortedData?.annual_energy_usage}kWh
          </div>
          <div className="col-12 col-md-12 col-lg-12 px-0 estimateCardDivmxAuto mx-auto mt-4">
            <div className="row g-3 estimateCardDiv">

              <div className="col-12 order-0 order-xl-0 componentOneEstimatedAnnualElectricityBill02">
                <div
                  className="grayBox borderRadius18 cursor-pointer"
                  onClick={() => {
                    changePopupData(comboName);
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

              <div className="col-12 col-md-6 col-xl-6 order-0 order-xl-0 componentOneEstimatedAnnualElectricityBill01">
                <div
                  className="grayBox borderRadius18 cursor-pointer"
                  onClick={() => {
                    changePopupData(comboName);
                    setOpeningModalName((prev) => {
                      let newarr = prev.filter((name) => name !== modalEnum.closeSolarSavingPopup)
                      return [...newarr, modalEnum.solarSavingPopup]
                    });

                    setDisableScroll(true)
                  }}
                >
                  <div className="font20Brown fontNormal borderbotmBrown">
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
                    <div className="col-4 mt-1">
                      <div className="font14Black">Bill Reduction</div>

                      <div className="fontGreen font26Blue fontMed font85GreenMob">
                        {getParseInt(
                          sortedData?.after_electricity_bill_percentage
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-6 order-2 order-xl-1">
                <div className="grayBox borderRadius18 grayBoxFlex ">
                  <div className="font20Brown fontNormal font58Mob">
                    Estimated Annual <br />
                    Export Earnings
                  </div>
                  <div className="col-4 justify-content-between">
                    <div className="mt-0">
                      <div className="font24Green fontMed font85GreenMob">
                        £
                        {addCommas(
                          getParseInt(sortedData?.EstimatedExportEarnings)
                        )}
                      </div>
                      <div className="font14Blue">
                        £
                        {addCommas(
                          getParseInt(sortedData?.EstimatedExportEarnings / 4)
                        )}{' '}
                        per quarter
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-6 order-1 order-xl-2">
                <div className="grayBox borderRadius18 grayBoxFlex grayBoxMob">
                  <div className="font20Brown fontNormal font58Mob">
                    Estimated Annual <br /> Bill Saving
                  </div>
                  <div className="col-4 mt-0">
                    <div className="font24Green fontMed font85GreenMob">
                      £
                      {getParseInt(EstimateAnnualBillSaving)}
                    </div>
                    <div className="font14Blue">
                      £
                      {addCommas(
                        getParseInt(EstimateAnnualBillSaving / 12)
                      )}{' '}
                      per month
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-6 order-3 order-xl-3">
                <div className="grayBox borderRadius18 grayBoxFlex greenBoxMob cursorPointer" onClick={() => {

                  changePopupData(comboName);
                  setOpeningModalName((prev) => {
                    let newarr = prev.filter((name) => name !== modalEnum.closeFinanceCalculatorPopup)
                    return [...newarr, modalEnum.financeCalculatorPopup]
                  });

                }}>
                  <div className="font20Brown fontNormal col-8 px-1">
                    Estimated  <br />    Payback time (ROI)
                  </div>
                  <div className="col-4 mt-0 px-1">
                    <div className="font26Blue lineHeight50Mob fontGreen">{`${(
                      Number(sortedData?.totalEstimatedPrice) /
                      (Number(sortedData?.before_solar) -
                        Number(sortedData?.new_after_solar) +
                        Number(sortedData?.EstimatedExportEarnings))
                    ).toFixed(1)} Years`}</div>
                    <div className="font14Blue">
                      cash purchase
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comboNewBtnGreen1 estimateDiv">
              <div className="mt-4 lightBtn align-items-center">
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
                          <div className="col-12 mt-0 text-center">
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

                <div className="newLightBox borderRadius18 newLightBoxMob2 cursorPointer" onClick={() => {
                  changePopupData(comboName);
                  setOpeningModalName((prev) => {
                    let newarr = prev.filter((name) => name !== modalEnum.closeFinanceCalculatorPopup)
                    return [...newarr, modalEnum.financeCalculatorPopup]
                  });
                }} >
                  <div className="col-12 mt-0 text-center">
                    <div className="font14Blue mb-1">Or Monthly From</div>
                    <div className="font32Blue-lineHeight22 font80Mob mb-1 ">
                      <span style={{ borderBottom: '3px dotted black', display: "inline-block " }} className='font32BlueNoMinW lineHeight22 font80Mob lineHeight08' >

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
            <div className='mt-4'>
              {sortedData?.combo_name && displayEnquireAboutThisPackage()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentTwo;
