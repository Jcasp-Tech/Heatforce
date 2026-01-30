import ResultComponent from '@/components/ResultsComponent';
import ResultLoader, { getRandomArbitrary } from '@/components/theme/loader';
import {
  getCombosAPI,
  getConfirmWebLeadComboDataAPI,
  getKKFactorRegionIdAPI,
  getQuarterlyUnitRatesAPI,
  getRegionDataAPI,
  getRegionQuarterlyDetailsAPI,
  getStandingChargeByRegionIdAPI,
  getWebLeadResultsDataAPI,
} from '@/redux/services/general.api';
import { wrapper } from '@/redux/store';
import { GOOGLE_API_KEY, libraries } from '@/utils/constants';
import { nextRedirect, setProcessingCounter } from '@/utils/helpers';
import useList from '@/utils/useList';
import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export interface ResultsProps {
  codeId: any;
}

const Result = ({ codeId: codeIdProp }: ResultsProps) => {
  const router = useRouter();
  // Get codeId from props (server-side) or router (client-side navigation)
  const codeId = codeIdProp || (router.query?.code as string) || '';
  
  const [, setLeadData] = useState<any>({});
  const [quoteData, setQuoteData] = useState<any>({});
  const [webLeadType, setWebLeadType] = useState<any>();
  const [apiQuoteLoading, setApiQuoteLoading] = useState(false);
  const [loadingSaving, setLoadingSaving] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY as string,
    libraries: libraries as any,
  });

  const { apiParam, setApiParam } = useList({
    queryParams: { randomString: '' },
  });

  const getResults = useCallback(
    async (_id: string) => {
      setApiQuoteLoading(true);
      setError(null);

      try {
        const params = { ...apiParam, randomString: _id };
        const res = await getWebLeadResultsDataAPI(params);
        
        if (!res) {
          throw new Error('No data received from server');
        }
        
        const allLeadDatas = res?.leadData;
        const allRoofDatas = res?.roofData;
        
        if (!allLeadDatas) {
          throw new Error('Lead data not found. The quote may not exist or has expired.');
        }
        
        if (!allRoofDatas || !Array.isArray(allRoofDatas) || allRoofDatas.length === 0) {
          throw new Error('Roof data not found. Please try again.');
        }

        const roofDatas = allRoofDatas.map((roof: any, index: number) => {
          const draw_points = roof.draw_points
            ? JSON.parse(JSON.parse(roof.draw_points))
            : null;
          return {
            id: roof.id,
            index: (index + 1) as 1 | 2 | 3,
            draw_points: draw_points,
            roofShading: roof.roofShading,
            roof_pitch: roof.roof_pitch,
            roof_direction: roof.roof_direction,
            suggested_roof_area: roof.suggested_roof_area
              ? parseFloat(roof.suggested_roof_area)
              : null,
            suggested_panel: roof.suggested_panel,
          };
        });

        setLeadData(allLeadDatas);

        const RegionQueryParams = { postcode: allLeadDatas?.postalCode };
        const regionsDataApis = await getRegionDataAPI(RegionQueryParams);
        const regionsData = regionsDataApis?.data;
        const region_id = regionsData?.region_id;

        const [
          quarterlyUnitRates,
          standingChargeDatas,
          kkFactorDatas,
          regionQuarterlyDetails,
        ] = await Promise.all([
          getQuarterlyUnitRatesAPI(),
          region_id ? getStandingChargeByRegionIdAPI(region_id) : null,
          region_id ? getKKFactorRegionIdAPI(region_id) : null,
          region_id ? getRegionQuarterlyDetailsAPI(region_id) : null,
        ]);

        const recommendedPanels = Math.min(
          res.roofData.reduce(
            (total, { suggested_panel }) => total + suggested_panel,
            0
          ),
          25
        );
        const total_panels =
          (allLeadDatas?.total_panels || recommendedPanels) <= 25
            ? allLeadDatas?.total_panels || recommendedPanels
            : recommendedPanels;

        let comboData;
        if (allLeadDatas?.lead_status === 'CONFIRM') {
          const confirmedCombo = await getConfirmWebLeadComboDataAPI(
            allLeadDatas?.combo?.id
          ); //NEED TO DO WITH LEAD DATA for COMBO
          comboData = [
            {
              ...confirmedCombo,
            },
          ];
        } else {
          comboData = await getCombosAPI(allLeadDatas?.web_lead_type);
        }

        // Determine selectedVariant for each combo
        const updatedCombos = comboData.map((combo: any) => {
          combo = {
            ...combo,
            web_lead_type: allLeadDatas?.web_lead_type,
            solar_system_size: allLeadDatas?.solar_system_size,
          };
          const combo_main_id = combo.id;
          let batteryVariants = sortBattery(combo.battery_more, combo);
          let selectedVariant;

          // Check for matching battery_kWh from leadData
          if (allLeadDatas?.lead_status === 'CONFIRM') {
            selectedVariant = batteryVariants.find(
              (battery: any) =>
                battery.battery_kWh === parseFloat(allLeadDatas?.battery_kWh)
            );
          } else {
            // Default to the second or first variant

            if (allLeadDatas?.web_lead_type === 1) {
              selectedVariant =
                batteryVariants[1] || batteryVariants[0] || null;
            } else {
              selectedVariant = batteryVariants.find(
                (battery: any) =>
                  battery.battery_kWh >=
                  parseFloat(allLeadDatas?.solar_system_size)
              );

              if (!selectedVariant) {
                selectedVariant =
                  batteryVariants[1] || batteryVariants[0] || null;
              }
            }
          }
          return {
            combo_main_id,
            combo_name: combo.combo_name,
            combo_type: combo.combo_type,
            // solar_panels: combo.solar_panels,
            // optimisers: combo.optimisers,
            // inverters: combo.inverters,
            batteryVariants,
            selectedVariant,
          };
        });

        const quoteDataTemp = {
          id: allLeadDatas.id,
          web_lead_id: allLeadDatas.id,
          title: allLeadDatas.title,
          firstName: allLeadDatas.firstName,
          lastName: allLeadDatas.lastName,
          phone: allLeadDatas.phone,
          email: allLeadDatas.email,
          notes_comments: allLeadDatas.notes_comments,
          postalCode: allLeadDatas.postalCode,
          annual_saving: allLeadDatas.annual_saving,
          payback_time: allLeadDatas.payback_time,
          cash_payback_time: allLeadDatas.cash_payback_time,
          export_earning: allLeadDatas.export_earning,
          ownership: allLeadDatas.ownership,
          property: allLeadDatas.property,
          floors: allLeadDatas.floors,
          bedrooms: allLeadDatas.bedrooms,
          roof_space: allLeadDatas.roof_space,
          location: allLeadDatas.location,
          total_Price: allLeadDatas.total_Price,
          monthly_apr_from: allLeadDatas.monthly_apr_from,
          before_solar: allLeadDatas.before_solar,
          after_solar: allLeadDatas.after_solar,
          estimated_co2_reduction: allLeadDatas.estimated_co2_reduction,
          panel_name: allLeadDatas.panel_name,
          panel_feature: allLeadDatas.panel_feature,
          total_panels: total_panels,
          inverter_name: allLeadDatas.inverter_name,
          inverter_feature: allLeadDatas.inverter_feature,
          inverter_variation: allLeadDatas.inverter_variation,
          battery_name: allLeadDatas.battery_name,
          battery_feature: allLeadDatas.battery_feature,
          battery_size: allLeadDatas.battery_size,

          occupants: allLeadDatas.occupants,
          energy_routine: allLeadDatas.energy_routine,
          energy_usage: allLeadDatas.energy_usage,
          no_energy_usage: allLeadDatas.no_energy_usage,
          annual_energy_usage: allLeadDatas.annual_energy_usage,

          pinLocation_lat: allLeadDatas.pinLocation_lat,
          pinLocation_lng: allLeadDatas.pinLocation_lng,
          findZoom: allLeadDatas.findZoom,
          lead_image: allLeadDatas.lead_image,

          estimated_annual_energy: allLeadDatas.estimated_annual_energy,

          randomstring: allLeadDatas.randomstring,
          lead_status: allLeadDatas.lead_status,
          web_lead_type: allLeadDatas.web_lead_type,
          solar_system_size: allLeadDatas.solar_system_size,
          log: allLeadDatas.log,
        };

        const quoteDatas = {
          ...quoteDataTemp,
          roofData: roofDatas,
          total_panels,
          recommendedPanels,
          regionsData,
          quarterlyUnitRates,
          regionQuarterlyDetails,
          standingChargeData: standingChargeDatas?.data,
          kkFactorData: kkFactorDatas?.data,
          comboData: updatedCombos,
        };

        setQuoteData(quoteDatas);
        setApiQuoteLoading(false);

        console.log('allLeadData', { quoteData: quoteDatas });
        setError(null);
        // setLoadingSaving(false);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        console.error('Error details:', {
          message: error?.message,
          response: error?.response?.data,
          codeId: _id,
          params,
        });
        setError(
          error?.response?.data?.message || 
          error?.message || 
          'Failed to load quote results. Please check the URL and try again.'
        );
        setApiQuoteLoading(false);
        setLoadingSaving(false);
      }
    },
    [apiParam]
  );

  const sortBattery = useCallback((batteries: any, combo: any) => {
    return Object.values(batteries || {})
      .map((battery: any) => ({
        key: battery.key,
        features: battery.features,
        battery_pdf: battery.battery_pdf,
        battery_image: battery.battery_image,
        battery_price: battery.battery_price,
        combo_battery: battery.combo_battery,
        combo_desc: battery.combo_desc,
        combo_name: battery.combo_name,
        combo_image: battery.combo_image,
        combo_features: battery.combo_features,
        logo_left_image: battery.logo_left_image,
        logo_right_image: battery.logo_right_image,
        solar_logo_image: battery.solar_logo_image,
        variantName: battery.variantName,
        battery_id: battery.battery_id,
        battery_name: battery.battery_name,
        battery_brand_name: battery.battery_brand_name,
        battery_brand_tag_image: battery.battery_brand_tag_image,
        battery_brand_image: battery.battery_brand_image,
        solar_panels: battery.solar_panels || combo.solar_panels,
        optimisers: battery.optimisers || combo.optimisers,
        inverters: battery.inverters || combo.inverters,
        annual_energy_usage:
          battery.annual_energy_usage || combo.annual_energy_usage,
        combo_main_id: combo.id,
        battery_kWh: parseFloat(battery.battery_kWh),
        web_lead_type: combo?.web_lead_type,
        solar_system_size: combo?.solar_system_size,
      }))
      .sort((a, b) => a.battery_kWh - b.battery_kWh);
  }, []);

  useEffect(() => {
    if (codeId) {
      setApiParam((prev: any) => ({
        ...prev,
        randomString: codeId || '',
      }));
    }
  }, [codeId, setApiParam]);

  useEffect(() => {
    if (codeId && router.isReady) {
      console.log('Fetching results for codeId:', codeId);
      getResults(codeId);
    } else if (!codeId && router.isReady) {
      console.warn('codeId is missing:', { codeIdProp, routerCode: router.query?.code });
    }
  }, [codeId, router.isReady, getResults, codeIdProp]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (quoteData?.web_lead_type) {
        localStorage.setItem('WebLeadType', quoteData?.web_lead_type);
        setWebLeadType(Number(window.localStorage.getItem('WebLeadType')));
      } else {
        localStorage.removeItem('WebLeadType');
      }
    }
  }, [quoteData]);

  useEffect(() => {
    setProcessingCounter(0);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(
      () => setLoadingSaving(false),
      getRandomArbitrary(4500, 5000)
    );
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Development time comments this code for fast Development */}
      {quoteData &&
        typeof quoteData === 'object' &&
        Object.keys(quoteData).length > 0 && (
          <ResultLoader
            loading={loadingSaving}
            apiQuoteLoading={apiQuoteLoading}
          />
        )}

      {error && !apiQuoteLoading && !loadingSaving && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Error Loading Results</h2>
          <p>{error}</p>
          <button
            onClick={() => {
              setError(null);
              if (codeId) {
                getResults(codeId);
              }
            }}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {isLoaded &&
        quoteData &&
        typeof quoteData === 'object' &&
        Object.keys(quoteData).length > 0 &&
        webLeadType !== undefined &&
        !error && (
          <>
            <ResultComponent
              {...{
                isLoaded,
                codeId,
                quoteData,
                setQuoteData,
                getResults,
                apiQuoteLoading,
                setApiQuoteLoading,
                setLoadingSaving,
                webLeadType,
              }}
            />
          </>
        )}

      {!isLoaded && !error && !codeId && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Loading maps...</p>
        </div>
      )}

      {!codeId && router.isReady && !error && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Invalid Quote Code</h2>
          <p>The quote code is missing or invalid. Please check the URL and try again.</p>
        </div>
      )}
    </>
  );
};

Result.getInitialProps = wrapper.getInitialPageProps(() => async (ctx: any) => {
  const codeId = ctx?.query?.code;
  if (!codeId) {
    nextRedirect({ ctx, location: '/' });
  }
  return { codeId };
});

export default Result;
