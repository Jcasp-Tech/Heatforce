import { useCallback, useEffect, useState } from 'react';
import ComponentOne from './componentOne';
import FirstPackageOps from './firstPackageOps';

// import FaqSection from './faqSection';
import {
  electricityBillCalculationAPI,
  energyGenerationCalculationAPI,
  getSFFactorByDirectionsAPI,
  // getWebLeadCalculationAPI,
  updateUserInfoQuoteWebLeadDataAPI,
  usableEnergyProducedCalculationAPI,
} from '@/redux/services/general.api';
import { message } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EditRoofRestartModal from '../modals/editRoofRestart';
import SaveEstimationProgressPopup from '../modals/saveEstimatePopupModal/saveEstimationProgressPopup';
import { getParseFloat, getParseInt } from '../NumberFunctions';

import { useRouter } from 'next/router';
// import FinanceCalculatorPopup from '../modals/financeCalcPopupModal/financeCalculatorPopup'
import dynamic from 'next/dynamic';
import CalculationsDrawer from '../modals/calculatorModal/calculationsDrawer';
import RestartSurveyModal from '../modals/restartSurveyModal';
import SolarSavingsPopup from '../modals/solarSavingPopupModal/solarSavingsPopup';
// import ComponentNewOne from './componentNewOne';
import { useLoanCalculator } from '@/customhook/useLoanCalculator';
import toast from 'react-hot-toast';
const ResultPagePopup = dynamic(
  () => import('../modals/resultPagePopupModal/resultPagePopup'),
  {
    ssr: false,
  }
);

export interface ResultComponentProps {
  quoteData: any;
  setQuoteData: any;
  isLoaded: any;
  codeId: any;
  getResults: any;
  apiQuoteLoading: boolean;
  setApiQuoteLoading: any;
  setLoadingSaving: any;
  webLeadType: number;
}
enum modalEnum {
  openResultPagePopup = 'openResultPagePopup',
  closeResultPagePopup = 'closeResultPagePopup',
  solarSavingPopup = 'solarSavingPopup',
  closeSolarSavingPopup = 'closeSolarSavingPopup',
  financeCalculatorPopup = 'financeCalculatorPopup',
  closeFinanceCalculatorPopup = 'closeFinanceCalculatorPopup',
}
let sortingVar = 0;
const ResultComponent = (props: ResultComponentProps) => {
  const {
    quoteData,
    setQuoteData,
    isLoaded,
    codeId,
    getResults,
    webLeadType,
    apiQuoteLoading,
    setApiQuoteLoading,
  } = props;

  const [openSaveEstimatePopup, setOpenSaveEstimatePopup] = useState(false);
  const [
    initialAutoOpenSaveEstimatePopup,
    setInitialAutoOpenSaveEstimatePopup,
  ] = useState(true);
  const [drawRoofs, setDrawRoofs] = useState();
  const [isPopupInPopup, setIsPopupInPopup] = useState(false);
  const [disableScroll, setDisableScroll] = useState(false);
  const [isEditRoofRestartOpen, setIsEditRoofRestartOpen] = useState(false);
  const [openRestartSurveyModal, setOpenRestartSurveyModal] = useState(false);
  const [, setAutoUpdateComboDataCalled] = useState(0);
  const [totalPanelsVar, setTotalPanelsVar] = useState(typeof quoteData.total_panels === 'number'
    ? quoteData.total_panels
    : quoteData.recommendedPanels);

  const router = useRouter();

  const [openResultPagePopUp, setOpenResultPagePopUp] = useState(false);
  const [openFinanceCalculatorPopup, setOpenFinanceCalculatorPopup] =
    useState(false);
  const [openSolarSavingPopup, setOpenSolarSavingPopup] = useState(false);
  const [openingModalName, setOpeningModalName] = useState<modalEnum[]>([]);
  const [resultPopupData, setResultPopupData] = useState<any>(null);

  const [currentComboMainId, setCurrentComboMainId] = useState<any>(null);

  const [disabledNoOfPanels, setDisabledNoOfPanels] = useState(false);
  const setCurrentTotalPanelsVar = () => {
    if (!quoteData) return;
    const currentPanels =
      typeof quoteData.total_panels === 'number'
        ? quoteData.total_panels
        : quoteData.recommendedPanels ?? 5;

    const updatedQuoteData = {
      ...quoteData,
      total_panels: Math.min(currentPanels, 25),
    };
    setTotalPanelsVar(updatedQuoteData.total_panels)
  };

  useEffect(() => {
    if (quoteData?.total_panels) {
      setCurrentTotalPanelsVar()
    }
  }, [quoteData.recommendedPanels, quoteData?.roofData]);


  const increaseNoOfPanels = () => {
    if (!quoteData) return;
    if (disabledNoOfPanels) return;
    setDisabledNoOfPanels(true);
    const currentPanels =
      typeof quoteData.total_panels === 'number'
        ? quoteData.total_panels
        : quoteData.recommendedPanels ?? 5;

    const updatedQuoteData = {
      ...quoteData,
      total_panels: Math.min(currentPanels + 1, 25),
    };
    setQuoteData(updatedQuoteData);
    setTotalPanelsVar(updatedQuoteData.total_panels)
  };


  const decreaseNoOfPanels = () => {
    if (!quoteData) return;
    if (disabledNoOfPanels) return;
    setDisabledNoOfPanels(true);
    const currentPanels =
      typeof quoteData.total_panels === 'number'
        ? quoteData.total_panels
        : quoteData.recommendedPanels ?? 5;

    const updatedQuoteData = {
      ...quoteData,
      total_panels: Math.max(currentPanels - 1, 6),
    };
    setQuoteData(updatedQuoteData);
    setTotalPanelsVar(updatedQuoteData.total_panels)
  };

  useEffect(() => {
    if (disableScroll) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    };
  }, [disableScroll]);

  useEffect(() => {
    if (quoteData) {
      setDrawRoofs(quoteData?.roofData);
    }
  }, [quoteData?.roofData]);

  useEffect(() => {
    if (
      quoteData &&
      quoteData?.lead_status === 'DRAFT' &&
      initialAutoOpenSaveEstimatePopup
    ) {
      // setDisableScroll(true);  temporary comment. will have to uncomment
      setOpenSaveEstimatePopup(true);
    }
  }, [quoteData, initialAutoOpenSaveEstimatePopup]);

  useEffect(() => {
    AOS.init();
  }, []);

  const AllVariablesCalculation = async (
    selectedVariantObject: any,
    total_panels: number,
    quoteDataObject: any
  ) => {

    let leadCalculation: any = null;

    try {
      total_panels = totalPanelsVar;
      quoteDataObject = quoteData;

      console.log({ total_panels });
      const allRoofData: any = quoteDataObject.roofData || [];
      const roofPitchData: any = [];
      const sFFactorByDirections: any = [];

      let occurs_annual_energy_usage: number = 0;
      let annual_energy_usage: number =
        quoteDataObject?.annual_energy_usage || 0;
      const no_energy_usage: string = quoteDataObject?.no_energy_usage;
      const occupants: string = quoteDataObject?.occupants;

      let estimated_co2_reduction: number = 0;
      let averageUnitRate: number = 0;
      let before_annual_CO2_emmisions: any = 0;
      let estimated_annual_energy: any = 0;
      let estimated_annual_usable: any = 0;
      let FEEBS: any = 0;
      let new_after_solar: any = 0;
      let afterAnnualCO2: any = 0;
      let AfterUseablePercentage: any = 0;
      let AfterElectricityBillPercentage: any = 0;
      let AfterCO2Percentage: any = 0;
      let EstimatedExportEarnings: any = 0;
      let EstimatedExportEarningsWithoutBattery: any = 0;

      const battery_type = selectedVariantObject.battery_name.toLowerCase().includes('alpha') ? 'alpha' : 'giv';
      console.log({ battery_type, battery_name: selectedVariantObject.battery_name, battery_kWh: selectedVariantObject.battery_kWh })
      let regionQuarterlyDetailsNew = { ...quoteDataObject?.regionQuarterlyDetails[0] };
      if (battery_type == 'alpha') {
        // regionQuarterlyDetailsNew = {
        //   ...regionQuarterlyDetailsNew,
        //   SEG_Factor_with_battery: regionQuarterlyDetailsNew.SEG_Factor_with_battery_alpha ?? regionQuarterlyDetailsNew.SEG_Factor_with_battery,
        //   SEG_Factor_without_battery: regionQuarterlyDetailsNew.SEG_Factor_without_battery_alpha ?? regionQuarterlyDetailsNew.SEG_Factor_without_battery,
        //   quarterly_unit_rate: regionQuarterlyDetailsNew.quarterly_unit_rate_alpha ?? regionQuarterlyDetailsNew.quarterly_unit_rate,
        //   standing_charge_per_day: regionQuarterlyDetailsNew.standing_charge_per_day_alpha ?? regionQuarterlyDetailsNew.standing_charge_per_day,
        // }
      }

      const roofPitchValues = {
        E: { gentle: 1.0309, steep: 0.9624, flat: 1.055, average: 1 },
        W: { gentle: 1.0309, steep: 0.9624, flat: 1.055, average: 1 },
        N: { gentle: 1.1708, steep: 0.8651, flat: 1.507, average: 1 },
        S: { gentle: 0.975, steep: 0.998, flat: 0.844, average: 1 },
        NE: { gentle: 1.1187, steep: 0.92, flat: 1.34, average: 1 },
        NW: { gentle: 1.1187, steep: 0.92, flat: 1.34, average: 1 },
        SE: { gentle: 0.98, steep: 0.9828, flat: 0.8885, average: 1 },
        SW: { gentle: 0.98, steep: 0.9828, flat: 0.8885, average: 1 },
      };

      const directionNames = {
        E: 'East',
        W: 'West',
        N: 'North',
        S: 'South',
        NE: 'NorthEast',
        NW: 'NorthWest',
        SE: 'SouthEast',
        SW: 'SouthWest',
      };


      for (let i = 0; i < allRoofData.length; i++) {
        const roof: any = allRoofData[i] ?? {};
        const direction = roof.roof_direction;
        const pitchType = roof.roof_pitch;

        const roofPitch = roofPitchValues[direction]?.[pitchType] ?? 1; // default to 1 if not found
        roofPitchData.push({ roofPitch, id: roof.id });

        const directionsParams = {
          directions: directionNames[direction] || direction, // fallback to raw value if missing
        };

        const getSFFactorByDirection = await getSFFactorByDirectionsAPI(
          directionsParams
        );

        const formattedSFFactorByDirectionData = {
          id: getSFFactorByDirection?.data?.id,
          directions: getSFFactorByDirection?.data?.directions,
          sk_factor: getSFFactorByDirection?.data?.sk_factor,
          roof_direction: roof.roof_direction,
        };

        sFFactorByDirections.push(formattedSFFactorByDirectionData);
      }
      const annual_energy_usage_temp = getParseInt(annual_energy_usage);
      if (annual_energy_usage_temp === 0 || !annual_energy_usage_temp) {
        const energyUsageMap: Record<string, Record<string, number>> = {
          low: {
            one: 2200,
            two: 2500,
            three: 2800,
            four: 3200,
          },
          fairly: {
            one: 2500,
            two: 3200,
            three: 3600,
            four: 4200,
          },
          high: {
            one: 3500,
            two: 4000,
            three: 5000,
            four: 6500,
          },
        };

        occurs_annual_energy_usage = energyUsageMap[no_energy_usage]?.[occupants] ?? 0;
        annual_energy_usage = occurs_annual_energy_usage;
      }
      if (regionQuarterlyDetailsNew?.CO2emission) {
        estimated_co2_reduction =
          regionQuarterlyDetailsNew?.CO2emission;
      }


      if (regionQuarterlyDetailsNew?.quarterly_unit_rate) {
        averageUnitRate = regionQuarterlyDetailsNew?.quarterly_unit_rate;
      }

      if (
        regionQuarterlyDetailsNew?.standing_charge_per_day &&
        averageUnitRate &&
        annual_energy_usage &&
        estimated_co2_reduction &&
        regionQuarterlyDetailsNew?.VAT &&
        quoteDataObject?.web_lead_id
      ) {
        const electricityBillPayload = {
          standingChargePerDay:
            regionQuarterlyDetailsNew?.standing_charge_per_day,
          averageUnitCharge: averageUnitRate,
          annualElectricityConsumption: annual_energy_usage,
          CO2_emission: estimated_co2_reduction,
          VATPercentage: regionQuarterlyDetailsNew?.VAT,
          web_lead_id: quoteDataObject?.web_lead_id,
        };
        const resData = await electricityBillCalculationAPI(
          electricityBillPayload
        );
        if (resData) {
          leadCalculation = resData;
        }

        // if (leadCalculation && leadCalculation !== null) {
        before_annual_CO2_emmisions = leadCalculation.annual_CO2_emission;
        const mergedData = quoteDataObject?.roofData.map((roofData: any) => {
          const roofPitchValue = roofPitchData.find(
            (rp: any) => rp.id === roofData.id
          );

          const sfFactorValue = sFFactorByDirections.find(
            (sf: any) => sf.roof_direction === roofData.roof_direction
          );
          return {
            kkFactor: quoteDataObject?.kkFactorData?.kk_factor_kWH_normal,
            sfFactor: sfFactorValue?.sk_factor,
            roofPitch: roofPitchValue?.roofPitch,
            shadow: roofData?.roofShading,
            electricityBillId: quoteDataObject?.web_lead_id,
            solarPower: selectedVariantObject?.solar_panels?.solar_panel_kWh,
            noPanels: totalPanelsVar,
            web_lead_type: selectedVariantObject?.web_lead_type,
            solar_system_size: selectedVariantObject?.solar_system_size,
            ...electricityBillPayload
          };
        });
        if (mergedData) {
          const newResDataEnergy = await energyGenerationCalculationAPI(
            mergedData
          );
          if (newResDataEnergy) {
            leadCalculation = newResDataEnergy?.updatedRecord[0];
          }
        }
        // }

        // if (
        //   leadCalculation &&
        //   leadCalculation !== null &&
        //   leadCalculation?.total_energy_generated === null
        // ) {
        //   leadCalculation = null;
        //   const leadCalculations = await getWebLeadCalculationAPI(
        //     quoteDataObject?.web_lead_id
        //   );
        //   if (leadCalculations) {
        //     leadCalculation = leadCalculations;
        //   }
        // }

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
            annual_generation_from_solar: estimated_annual_energy,
            battery_energy_storage: selectedVariantObject.battery_kWh ?? '1',
            arche_type_arche_code:
              quoteDataObject?.energy_routine === 'most_of_the_day'
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

            // const AUC = leadCalculation?.averageUnitCharge;
            const AUC = averageUnitRate;

            const EAEC = annual_energy_usage;
            const EUEP = await getParseFloat(
              estimatedEnnualUsableEnergy.totalUsableEnergy,
              5
            );

            const TVAT = regionQuarterlyDetailsNew?.VAT;
            const EAEG = estimated_annual_energy;

            const T = Number(ASC) + Number(AUC) * (Number(EAEC) - Number(EUEP));

            const taxAmount = T * (Number(TVAT) / 100);

            const FT = T + taxAmount;
            const with_battery = regionQuarterlyDetailsNew.SEG_Factor_with_battery;
            const without_battery = regionQuarterlyDetailsNew.SEG_Factor_without_battery;

            // const PeakRate = 0.2642;
            // const FluxRate = 0.0469;
            // const DayRate = 0.1326;

            // const AverageOfPeakFluxDayRate = (PeakRate + FluxRate + DayRate) / 3;

            // const exportEarningFactor = webLeadType === 2 ? AverageOfPeakFluxDayRate : selectedVariantObject?.battery_kWh !== 1 ? with_battery : without_battery;
            const exportEarningFactor = selectedVariantObject?.battery_kWh !== 1 ? with_battery : without_battery;

            console.log({ exportEarningFactor, with_battery, without_battery })


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

            new_after_solar = TOELEBILL - FEEBS;

            EstimatedExportEarnings = SEG;
            EstimatedExportEarningsWithoutBattery =
              (EAEG - EUEP) * without_battery;

            if (new_after_solar < 40) {
              new_after_solar = 40;
            }
          }
        }
      }
      const before_solar = leadCalculation?.total_electricity_bill;
      const AllVariables = {
        occurs_annual_energy_usage,
        annual_energy_usage,
        no_energy_usage,
        occupants,
        estimated_co2_reduction,
        averageUnitRate,
        after_annual_CO2_emmisions: afterAnnualCO2,
        before_annual_CO2_emmisions,
        estimated_annual_energy,
        estimated_annual_usable,
        FEEBS,
        before_solar: before_solar,
        new_after_solar,
        afterAnnualCO2,
        AfterUseablePercentage,
        after_electricity_bill_percentage: AfterElectricityBillPercentage,
        AfterCO2Percentage,
        EstimatedExportEarnings,
        EstimatedExportEarningsWithoutBattery,
        EstimateAnnualBillSaving: before_solar - new_after_solar,
        after_solar: FEEBS,
        total_panels: totalPanelsVar,
        postalCode: quoteDataObject?.postalCode,
        final_est_electricity_bill_savings: FEEBS,
        after_useable_percentage: AfterUseablePercentage,
        after_CO2_percentage: AfterCO2Percentage,
      };

      selectedVariantObject = { ...selectedVariantObject, ...AllVariables };

      const recalculatedVariant = recalculateLoanValues(selectedVariantObject);
      // console.log('table_name', 'selectedVariantObject', {
      //   selectedVariantObject,
      //   recalculatedVariant,
      // });
      selectedVariantObject = {
        ...selectedVariantObject,
        ...recalculatedVariant,
      };

      return selectedVariantObject;
    } catch (error) {
      console.log('AllVariablesCalculation Error', error);
      return selectedVariantObject;
    }
  };

  const updateTotalEstimatedPrice = useCallback(
    async (selectedVariantObject, total_panels, quoteDataObject) => {
      if (
        !selectedVariantObject ||
        !selectedVariantObject?.solar_panels ||
        !quoteDataObject
      )
        return selectedVariantObject;

      if (totalPanelsVar) {
        total_panels = totalPanelsVar;
      } else {
        total_panels =
          typeof quoteData.total_panels === 'number'
            ? quoteData.total_panels
            : quoteData.recommendedPanels ?? 5;

        setCurrentTotalPanelsVar();
      }
      total_panels = totalPanelsVar;
      quoteDataObject = quoteData;

      const inverterVariations = Object.values(
        selectedVariantObject?.inverters?.more
      );
      const inverter_variation1: any = inverterVariations?.[0];
      const inverter_variation2: any = inverterVariations?.[1];

      let solarPanelPrices: any = [];
      let totalSolarPanelPrice = 0;

      if (webLeadType === 1) {
        solarPanelPrices = selectedVariantObject.solar_panels.solar_panel_price
          ? JSON.parse(selectedVariantObject.solar_panels.solar_panel_price)
          : [];

        totalSolarPanelPrice = solarPanelPrices.reduce(
          (acc: number, data: { noOfPanel: number; price: number }) => {
            if (data.noOfPanel <= total_panels) {
              return acc + Number(data.price);
            }
            return acc;
          },
          0
        );
      }

      const inverter_variation_selected = total_panels > 16 ? inverter_variation2 : inverter_variation1;

      const solar_panel_kWh: number = selectedVariantObject?.solar_panels?.solar_panel_kWh;
      let panelKWH: number = ((solar_panel_kWh ?? 0) * (total_panels ?? 0)) / 1000;
      if (webLeadType == 2) {
        panelKWH = quoteData.solar_system_size || '';
      }
      const solar_system_size = panelKWH;

      const batteryPrice = Number(selectedVariantObject.battery_price || 0);
      const inverterPrice = Number(inverter_variation_selected.inverter_price);

      let optimiserPrice = 0;
      if (selectedVariantObject?.web_lead_type === 1) {
        optimiserPrice =
          Number(selectedVariantObject.optimisers?.optimiser_price || 0) *
          total_panels;
      }
      const totalEstimatedPrice: any = getParseInt(
        totalSolarPanelPrice + batteryPrice + inverterPrice + optimiserPrice
      );

      let updatedSelectedVariantReturn = {
        ...selectedVariantObject,
        totalEstimatedPrice,
        inverter_variation_selected,
        solarPanelPrices,
        totalSolarPanelPrice,
        batteryPrice,
        inverterPrice,
        optimiserPrice,
        solar_system_size,
      };
      updatedSelectedVariantReturn = await AllVariablesCalculation(
        updatedSelectedVariantReturn,
        total_panels,
        quoteDataObject
      ).then((updatedSelectedVariant) => {
        return updatedSelectedVariant;
      });
      setTimeout(() => {
        setDisabledNoOfPanels(false);
      }, 200);
      return updatedSelectedVariantReturn;
    },
    [totalPanelsVar, quoteData?.roofData]
  );

  const getCalculation = useCallback(
    async (
      quoteDataComboData: any[] = [],
      selectedComboData: any,
      total_panels: number,
      quoteDataObject,
      flag = true
    ) => {
      let selectedVariant = { ...selectedComboData.selectedVariant };
      if (flag) {
        const updatedSelectedVariantFromEstimatedPrice =
          await updateTotalEstimatedPrice(
            selectedVariant,
            total_panels,
            quoteDataObject
          );
        selectedVariant = {
          ...selectedVariant,
          ...updatedSelectedVariantFromEstimatedPrice,
        };
      }

      const updatedComboData: any[] = [];

      for (const item of quoteDataComboData) {
        if (selectedComboData.combo_main_id === item.combo_main_id) {
          const updatedBatteryVariants: any[] = [];

          for (const battery of selectedComboData.batteryVariants || []) {
            if (battery.key === selectedVariant.key) {
              selectedVariant = { ...battery, ...selectedVariant };
              updatedBatteryVariants.push(selectedVariant);
            } else if (!battery.totalEstimatedPrice && 0) {
              let updatedSelectedVariantNew = { ...battery };
              if (flag) {
                const updatedBatteryFromEstimatedPrice =
                  await updateTotalEstimatedPrice(
                    updatedSelectedVariantNew,
                    total_panels,
                    quoteDataObject
                  );
                updatedSelectedVariantNew = {
                  ...battery,
                  ...updatedBatteryFromEstimatedPrice,
                };
              }
              updatedBatteryVariants.push(updatedSelectedVariantNew);
            } else {
              updatedBatteryVariants.push({ ...battery });
            }
          }

          let updatedCombo = {
            ...item,
            ...selectedComboData,
            batteryVariants: updatedBatteryVariants,
            selectedVariant: selectedVariant,
          };

          updatedComboData.push({ ...updatedCombo });
        } else {
          updatedComboData.push({ ...item });
        }
      }

      return updatedComboData;
    },
    [totalPanelsVar, quoteData?.roofData]
  );

  const autoUpdateComboData = useCallback(
    async (quoteDataObject) => {
      if (quoteDataObject) {
        let updatedComboTemp = { ...quoteDataObject };
        let currentComboData = updatedComboTemp.comboData || [];
        for (const item of currentComboData) {
          currentComboData = await getCalculation(
            currentComboData,
            item,
            totalPanelsVar,
            quoteDataObject,
            true
          );
        }
        updatedComboTemp = { ...updatedComboTemp, comboData: currentComboData };
        return updatedComboTemp;
      }
      return quoteDataObject;
    },
    [totalPanelsVar, quoteData?.roofData]
  );

  useEffect(() => {
    const callAsync = async () => {
      if (quoteData && quoteData.comboData) {
        sortingVar = 0;
        await new Promise((resolve) => setTimeout(resolve, 100));
        const quoteDataUpdated = await autoUpdateComboData(quoteData);
        setQuoteData(quoteDataUpdated);

        setAutoUpdateComboDataCalled(1);
        setApiQuoteLoading(false);
      }
    };
    callAsync();
  }, [totalPanelsVar, quoteData?.roofData]);

  const getComponentComboData = (
    combo_main_id: string,
    quoteDataObject: any
  ) => {
    let selectedComboData =
      quoteDataObject.comboData.find(
        (a) => a.combo_main_id === combo_main_id
      ) || {};
    return selectedComboData;
  };

  const { recalculateLoanValues } = useLoanCalculator({}, quoteData);

  const getComponentComboDataTemp = async (
    selected_battery_key: string,
    combo_main_id: string,
    quoteDataObject: any
  ) => {
    let selectedComboData = getComponentComboData(
      combo_main_id,
      quoteDataObject
    );
    if (!selectedComboData) return null;
    let batteryVariantsTemp = selectedComboData.batteryVariants || [];
    let selectedVariantTemp =
      batteryVariantsTemp.find((a: any) => a.key === selected_battery_key) ||
      {};

    let updatedBatteryVariants: any[] = [];

    for (const battery of batteryVariantsTemp) {
      if (battery.key === selectedVariantTemp.key) {
        let updatedSelectedVariant = { ...battery, ...selectedVariantTemp };
        updatedBatteryVariants.push(updatedSelectedVariant);
      } else {
        updatedBatteryVariants.push(battery);
      }
    }

    const componentComboDataTemp = {
      ...selectedComboData,
      selectedVariant: selectedVariantTemp,
      batteryVariants: updatedBatteryVariants,
    };

    return componentComboDataTemp;
  };

  const addDataForSorting = useCallback(
    (sortObject: any = {}) => {
      const { selected_battery_key, combo_main_id, updatedSelectedVariant, no_sort } =
        sortObject;
      const callAsync = async () => {
        try {
          let selectedComboData = await getComponentComboDataTemp(
            selected_battery_key,
            combo_main_id,
            quoteData
          );

          if (updatedSelectedVariant) {
            selectedComboData = {
              ...selectedComboData,
              selectedVariant: {
                ...selectedComboData.selectedVariant,
                ...updatedSelectedVariant,
              },
            };
          }

          const comboData = await getCalculation(
            quoteData.comboData,
            selectedComboData,
            totalPanelsVar,
            quoteData,
            true
          );

          sortComboData(comboData, no_sort);
        } catch (error) {
          console.error('Error in addDataForSorting:', error);
        }
      };
      if (
        selected_battery_key &&
        combo_main_id &&
        quoteData &&
        quoteData?.comboData &&
        totalPanelsVar
      ) {
        callAsync();
      }
    },
    [quoteData?.comboData, totalPanelsVar]
  );

  const sortComboData = useCallback(
    (comboData: any, no_sort: any) => {
      if (!comboData) return;

      let sortedComboData = [...(comboData || [])]
      const allHaveFinancePaybackTime = sortedComboData.every(
        (item) => item.selectedVariant?.financePaybackTime != null
      );
      // if (sortingVar <= 0 || !sortingVar || allHaveFinancePaybackTime === false) {
      // sortingVar = 0;
      // }
      // if ((apiQuoteLoading === true || (apiQuoteLoading === false && sortingVar < 3)) && allHaveFinancePaybackTime && no_sort !== 1) {
      if (no_sort !== 1) {
        sortedComboData.sort((a: any, b: any) => {
          const aKwh = a.selectedVariant?.financePaybackTime || 0;
          const bKwh = b.selectedVariant?.financePaybackTime || 0;
          return aKwh - bKwh; // ascending order
        });
        if (apiQuoteLoading === false) {
          sortingVar = sortingVar + 1;
        }
      }
      console.log("allHaveFinancePaybackTime", sortingVar, allHaveFinancePaybackTime, apiQuoteLoading, { no_sort })
      setQuoteData({ ...quoteData, comboData: sortedComboData });
    },
    [quoteData?.comboData, totalPanelsVar, sortingVar]
  );


  const changePopupData = useCallback(
    (id: any) => {
      setCurrentComboMainId(id);
    },
    [totalPanelsVar]
  );

  useEffect(() => {
    if (quoteData?.comboData?.length > 0 && currentComboMainId) {
      const selectedComboData = getComponentComboData(
        currentComboMainId,
        quoteData
      );
      setResultPopupData({ ...selectedComboData });
    }
  }, [totalPanelsVar, quoteData?.comboData, currentComboMainId]);

  useEffect(() => {
    if (resultPopupData) {
      if (openingModalName?.includes(modalEnum.openResultPagePopup))
        setOpenResultPagePopUp(true);
      if (openingModalName?.includes(modalEnum.closeResultPagePopup))
        setOpenResultPagePopUp(false);
      if (openingModalName?.includes(modalEnum.solarSavingPopup))
        setOpenSolarSavingPopup(true);
      if (openingModalName?.includes(modalEnum.closeSolarSavingPopup))
        setOpenSolarSavingPopup(false);
      if (openingModalName?.includes(modalEnum.financeCalculatorPopup))
        setOpenFinanceCalculatorPopup(true);
      if (openingModalName?.includes(modalEnum.closeFinanceCalculatorPopup))
        setOpenFinanceCalculatorPopup(false);
    }
  }, [resultPopupData, openingModalName]);

  const scrolltoSection = () => {
    const index = quoteData?.comboData
      .map((e: any) => e.combo_main_id)
      .indexOf(resultPopupData?.combo_main_id);

    const element = document.getElementById(`section${index + 1}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const saveCurrentPackageInfo = useCallback(
    async (saveCurrentPackageInfoData) => {
      console.log('saveCurrentPackageInfoData', saveCurrentPackageInfoData);

      let quoteDataTemp = { ...quoteData };

      let selectedComboData = await getComponentComboDataTemp(
        saveCurrentPackageInfoData.key,
        saveCurrentPackageInfoData.combo_main_id,
        quoteData
      );

      if (saveCurrentPackageInfoData) {
        selectedComboData = {
          ...selectedComboData,
          selectedVariant: {
            ...selectedComboData.selectedVariant,
            ...saveCurrentPackageInfoData,
          },
        };
      }
      const comboData = [selectedComboData];

      const keysToRemove = ['web_lead_id', 'key'];

      const removeKeys = (obj, keys) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) => !keys.includes(key))
        );
      };

      const selectedVariants = comboData
        .filter((item) => item?.selectedVariant)
        .map((item) => removeKeys(item.selectedVariant, keysToRemove));

      const keysToRemoveQuoteData = [
        'log',
        'randomstring',
        'recommendedPanels',
        'regionsData',

        'web_lead_id',

        'kkFactorData',
        'comboData',
      ];
      let cleanQuoteData = Object.fromEntries(
        Object.entries(quoteData ?? {}).filter(
          ([key]) => !keysToRemoveQuoteData.includes(key)
        )
      );

      const comboDataFirstSelectedVariant: any = selectedVariants?.[0];
      let dataToSave = {
        ...cleanQuoteData,
        total_panels: quoteDataTemp.total_panels || 0,
        randomstring: quoteDataTemp?.randomstring || '',
        annual_energy_usage: comboDataFirstSelectedVariant?.annual_energy_usage || quoteDataTemp.annual_energy_usage || 0,
        total_Price: comboDataFirstSelectedVariant?.totalEstimatedPrice || 0,
        monthly_apr_from: comboDataFirstSelectedVariant?.monthly_apr_from,
        after_solar: comboDataFirstSelectedVariant?.new_after_solar || 0,
        before_solar: comboDataFirstSelectedVariant?.before_solar || 0,
        estimated_annual_energy:
          comboDataFirstSelectedVariant?.estimated_annual_energy || 0,
        estimated_co2_reduction:
          comboDataFirstSelectedVariant?.before_annual_CO2_emmisions -
          comboDataFirstSelectedVariant?.after_annual_CO2_emmisions || 0,
        // annual_saving: comboDataFirstSelectedVariant?.annual_saving || 0,
        annual_saving:
          getParseInt(comboDataFirstSelectedVariant?.before_solar) -
          getParseInt(comboDataFirstSelectedVariant?.new_after_solar) +
          getParseInt(
            comboDataFirstSelectedVariant?.EstimatedExportEarnings
          ) || 0,

        cash_payback_time: comboDataFirstSelectedVariant?.cashPaybackTime,
        payback_time: comboDataFirstSelectedVariant?.financePaybackTime,
        export_earning:
          comboDataFirstSelectedVariant?.EstimatedExportEarnings || 0,
        panel_name:
          comboDataFirstSelectedVariant?.solar_panels?.solar_panel_name || '',
        panel_feature:
          comboDataFirstSelectedVariant?.solar_panels?.features || '',
        inverter_name:
          comboDataFirstSelectedVariant?.inverters?.inverter_name || '',
        inverter_feature:
          comboDataFirstSelectedVariant?.inverter_variation_selected
            ?.features || '',
        inverter_variation:
          comboDataFirstSelectedVariant?.inverter_variation_selected
            ?.inverter_kWh || '',
        battery_name: comboDataFirstSelectedVariant?.battery_name || '',
        battery_brand: comboDataFirstSelectedVariant?.battery_brand_name || '',
        battery_feature: comboDataFirstSelectedVariant?.features || '',
        battery_kWh: comboDataFirstSelectedVariant?.battery_kWh || '',
        battery: comboDataFirstSelectedVariant,
        battery_size: 'none',
        combo: {
          id: comboDataFirstSelectedVariant?.combo_main_id,
          name: comboDataFirstSelectedVariant?.combo_name,
        },
        solar_system_size:
          comboDataFirstSelectedVariant?.solar_system_size || 0,
      };
      cleanQuoteData = {
        ...cleanQuoteData,
        ...comboDataFirstSelectedVariant,
        ...dataToSave,
        comboData: comboData[0],
        randomstring: quoteData?.randomstring,
      };
      const log = {
        quoteData: cleanQuoteData,
        selectedVariants,
        selectedBattery: comboDataFirstSelectedVariant,
        globalMonthly: comboDataFirstSelectedVariant?.monthly,
        monthly: comboDataFirstSelectedVariant?.monthly,
        sixtyMonths: comboDataFirstSelectedVariant?.sixtyMonths,
        twelveMonths: comboDataFirstSelectedVariant?.twelveMonths,
        selectedMonths: comboDataFirstSelectedVariant?.selectedMonths,
        interest: comboDataFirstSelectedVariant?.interest,
        loan: comboDataFirstSelectedVariant?.loan,
        rangeFinance: comboDataFirstSelectedVariant?.RangeFinance,
      };
      let dataSaveNow: any = {
        ...dataToSave,
        // lead_status: 'QUOTE',
        log: JSON.stringify(log),
      };
      const keysToRemoveQuoteDataSaveNow = [
        'web_lead_id',
        'kkFactorData',
        'roofData',
        'quarterlyUnitRates',
        'regionQuarterlyDetails',
        'recommendedPanels',
        'regionsData',
        'standingChargeData',
        'comboData',
        'key',
        'lead_image',
      ];
      dataSaveNow = Object.fromEntries(
        Object.entries(dataSaveNow ?? {}).filter(
          ([key]) => !keysToRemoveQuoteDataSaveNow.includes(key)
        )
      );

      console.log('dataSaveNow', { dataSaveNow });
      const toastId = toast.loading(
        'Saving Current Chosen Packages, Please Wait!'
      );
      // console.log('dataToSave', dataToSave);
      try {
        await updateUserInfoQuoteWebLeadDataAPI(dataSaveNow);
        {
          toast.success(
            'Successfully Save the Current chosen package, Fill in your Details in the form to Confirm Your Booking!',
            { id: toastId, duration: 3000 }
          );
          router.push(`/save/${dataSaveNow.randomstring}`);
        }
      } catch (error) {
        toast.error('Error Occurred Please Try Again!', { id: toastId });
      } finally {
        setOpenSaveEstimatePopup(false);
        setDisableScroll(false);
      }
    },
    [quoteData?.comboData]
  );

  // Create a ref for each component
  // const comboRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <div className="resultContainer">
      <div className="container containerCustom resultCustom bgWhite py-4">
        <h1 className="mb-0">
          {quoteData?.lead_status === 'CONFIRM'
            ? 'Your selected solar package '
            : `We have ${quoteData?.comboData?.length || 0} amazing ${webLeadType === 1 ? 'solar' : 'battery'
            } package options`}
        </h1>
        <div className="font32 mb-mob-0 resultMainText">
          for your {webLeadType === 1 ? "house" : "home"} in {quoteData?.postalCode}...
        </div>

        <FirstPackageOps
          {...{
            isEditRoofRestartOpen,
            setIsEditRoofRestartOpen,
            drawRoofs,
            setOpenSaveEstimatePopup,
            openSaveEstimatePopup,
            setDisableScroll,
            setOpenRestartSurveyModal,
            openRestartSurveyModal,
            quoteData,
            increaseNoOfPanels,
            decreaseNoOfPanels,
            disabledNoOfPanels,
            isLoaded,
            webLeadType,
          }}
        />
        <div className="">
          {quoteData &&
            quoteData.comboData &&
            quoteData.comboData.length > 0 &&
            (() => {
              const elements: any = [];
              for (let index = 0; index < quoteData.comboData.length; index++) {
                const item = quoteData.comboData[index];
                elements.push(
                  // <div
                  //   key={'ComponentOneParent_' + item.combo_main_id}
                  //   ref={(el) => {
                  //     comboRefs.current[item.combo_main_id] = el;
                  //   }}
                  // >
                  <ComponentOne
                    key={'ComponentOne_' + item.combo_main_id}
                    {...{
                      componentComboData: item,
                      setDisableScroll,
                      quoteData: quoteData,
                      index,
                      addDataForSorting,
                      changePopupData,
                      setOpeningModalName,
                      setOpenResultPagePopUp,
                      saveCurrentPackageInfo,
                      webLeadType,
                    }}
                  />
                  // </div>
                );
              }
              return elements;
            })()}
        </div>

        {/* Development time comments this code for fast Development */}
        {openSaveEstimatePopup && (
          <SaveEstimationProgressPopup
            {...{
              setOpenSaveEstimatePopup,
              setDisableScroll,
              codeId,
              quoteData,
              setQuoteData,
            }}
            setInitialAutoOpenSaveEstimatePopup={
              setInitialAutoOpenSaveEstimatePopup
            }
          />
        )}

        {isEditRoofRestartOpen && (
          <EditRoofRestartModal
            {...{
              visible: isEditRoofRestartOpen,
              setIsEditRoofRestartOpen,
              quoteData,
              getResults,
            }}
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
        {openResultPagePopUp && resultPopupData && (
          <ResultPagePopup
            {...{
              setOpenResultPagePopUp,
              setDisableScroll,
              setOpenSolarSavingPopup: () => { },
              setOpenFinanceCalculatorPopup: () => { },
              setIsPopupInPopup,
              quoteData: null,
              webLeadType,
            }}
            componentComboData={resultPopupData}
            quoteData={quoteData}
            scrolltoSection={scrolltoSection}
            changePopupData={changePopupData}
            globalMonthly={resultPopupData?.globalMonthly}
            userDepositAmount={resultPopupData?.userDepositAmount}
            orderTotal={resultPopupData?.orderTotal}
            totalPrice={resultPopupData?.totalEstimatedPrice}
            addDataForSorting={addDataForSorting}
            openingModalName={openingModalName}
            setOpeningModalName={setOpeningModalName}
            comboData={quoteData.comboData}
            saveCurrentPackageInfo={saveCurrentPackageInfo}
          />
        )}

        {resultPopupData &&
          (openFinanceCalculatorPopup ||
            (openFinanceCalculatorPopup && openResultPagePopUp)) && (
            <CalculationsDrawer
              open={openFinanceCalculatorPopup}
              onClose={(sortObject) => {
                sortObject = { ...sortObject, no_sort: 1 };
                console.log({ sortObject }, 'sortObject');

                addDataForSorting(sortObject);
                scrolltoSection();
                changePopupData(sortObject?.combo_main_id);
                setOpeningModalName((prev) => {
                  let newarr = prev.filter(
                    (name) => name !== modalEnum.financeCalculatorPopup
                  );
                  return [...newarr, modalEnum.closeFinanceCalculatorPopup];
                });
              }}
              changePopupData={changePopupData}
              setOpeningModalName={setOpeningModalName}
              componentComboData={resultPopupData}
              quoteData={quoteData}
            />
          )}

        {openSolarSavingPopup && resultPopupData && (
          <SolarSavingsPopup
            {...{
              setOpenSolarSavingPopup,
              setDisableScroll,
              setIsPopupInPopup,
              isPopupInPopup,
              resultPopupData,
              setOpeningModalName,
              modalEnum,
              webLeadType,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ResultComponent;
