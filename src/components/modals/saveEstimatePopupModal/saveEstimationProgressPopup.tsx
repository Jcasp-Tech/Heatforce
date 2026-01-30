import { useForm } from 'react-hook-form';
import styles from './saveEstimationProgressPopup.module.scss';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserInfoQuoteWebLeadDataAPI } from '@/redux/services/general.api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { event, EVENTENUMS } from '@/components/Pixel/facebook/lib/fpixel';
import { getParseInt } from '@/components/NumberFunctions';

export interface SaveEstimationProgressPopupProps {
  setOpenSaveEstimatePopup: (value: boolean) => void;
  setDisableScroll: (value: boolean) => void;
  codeId: string;
  quoteData: any;
  setQuoteData: any;
  setInitialAutoOpenSaveEstimatePopup: (value: boolean) => void;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name field is required'),
  lastName: yup.string().required('Last name field is required'),

  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email field is required'),
  phone: yup
    .string()
    .matches(
      /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/,
      'Please provide a valid UK contact number. '
    )
    .required('Contact Numbe Field field is required'),
});

const SaveEstimationProgressPopup = (
  props: SaveEstimationProgressPopupProps
) => {
  const {
    setOpenSaveEstimatePopup,
    setDisableScroll,
    // codeId,
    quoteData,
    setQuoteData,
    setInitialAutoOpenSaveEstimatePopup
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  // const { sortedComboData }: any = useSelector((state: RootState) => state)
  useEffect(() => {
    // console.log("sortedComboData",sortedComboData)
  }, [])
  const onSubmitHandler = async (data: any) => {
    setLoading(true);
    const toastId = toast.loading('Saving Data, Please Wait!');
    try {

      let quoteDataTemp = { ...quoteData };
      const comboData = quoteDataTemp?.comboData ? quoteDataTemp?.comboData : [];

      const keysToRemove = [
        // 'battery_brand_image',
        // 'battery_brand_tag_image',
        // 'battery_pdf',
        // 'logo_right_image',
        // 'updatedFields',
        // 'battery_image',
        // 'combo_battery',
        // 'combo_desc',
        // 'combo_features',
        // 'combo_image',
        // 'combo_name',
        // 'features',
        // 'inverters',
        // 'optimisers',
        // 'postalCode',
        // 'quoteDataObject',
        // 'variantName',
        // 'solar_logo_image',
        // 'solar_panels',
        // 'logo_left_image',
        // 'logo_left_image',
        'web_lead_id',
        'key',
      ];

      const removeKeys = (obj, keys) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) => !keys.includes(key))
        );
      };

      const selectedVariants = comboData
        .filter(item => item?.selectedVariant)
        .map(item => removeKeys(item.selectedVariant, keysToRemove));

      const keysToRemoveQuoteData = [

        "log",

        "randomstring",
        "recommendedPanels",
        "regionsData",

        "web_lead_id",

        "kkFactorData",
        "comboData",
      ];
      const cleanQuoteData = Object.fromEntries(
        Object.entries(quoteData ?? {}).filter(([key]) => !keysToRemoveQuoteData.includes(key))
      );
      const comboDataFirstSelectedVariant = selectedVariants?.[0];
      let dataToSave = {
        ...cleanQuoteData,
        total_panels: quoteDataTemp.total_panels || 0,
        randomstring: quoteDataTemp?.randomstring || "",
        annual_energy_usage: comboDataFirstSelectedVariant?.annual_energy_usage || quoteDataTemp.annual_energy_usage || 0,
        total_Price: comboDataFirstSelectedVariant?.totalEstimatedPrice || 0,
        monthly_apr_from: comboDataFirstSelectedVariant?.monthly_apr_from,
        after_solar: comboDataFirstSelectedVariant?.new_after_solar || 0,
        before_solar: comboDataFirstSelectedVariant?.before_solar || 0,
        estimated_annual_energy: comboDataFirstSelectedVariant?.estimated_annual_energy || 0,
        estimated_co2_reduction: comboDataFirstSelectedVariant?.before_annual_CO2_emmisions -
          comboDataFirstSelectedVariant?.after_annual_CO2_emmisions || 0,
        // annual_saving: comboDataFirstSelectedVariant?.annual_saving || 0,
        annual_saving: getParseInt(comboDataFirstSelectedVariant?.before_solar) -
          getParseInt(comboDataFirstSelectedVariant?.new_after_solar) +
          getParseInt(comboDataFirstSelectedVariant?.EstimatedExportEarnings) || 0,

        cash_payback_time: comboDataFirstSelectedVariant?.cashPaybackTime,
        payback_time: comboDataFirstSelectedVariant?.financePaybackTime,
        export_earning: comboDataFirstSelectedVariant?.EstimatedExportEarnings || 0,
        panel_name: comboDataFirstSelectedVariant?.solar_panels?.solar_panel_name || "",
        panel_feature: comboDataFirstSelectedVariant?.solar_panels?.features || "",
        inverter_name: comboDataFirstSelectedVariant?.inverters?.inverter_name || "",
        inverter_feature: comboDataFirstSelectedVariant?.inverter_variation_selected?.features || "",
        inverter_variation: comboDataFirstSelectedVariant?.inverter_variation_selected?.inverter_kWh || "",
        battery_name: comboDataFirstSelectedVariant?.battery_name || "",
        battery_brand: comboDataFirstSelectedVariant?.battery_brand_name || '',
        battery_feature: comboDataFirstSelectedVariant?.features || "",
        battery_kWh: comboDataFirstSelectedVariant?.battery_kWh || "",
        battery: comboDataFirstSelectedVariant,
        battery_size: 'none',
        combo: { id: comboDataFirstSelectedVariant?.combo_main_id, name: comboDataFirstSelectedVariant?.combo_name },
        solar_system_size: comboDataFirstSelectedVariant?.solar_system_size || 0,

      };
      const log = {
        quoteData: cleanQuoteData,
        selectedVariants,
        globalMonthly: comboDataFirstSelectedVariant?.monthly,
        monthly: comboDataFirstSelectedVariant?.monthly,
        sixtyMonths: comboDataFirstSelectedVariant?.sixtyMonths,
        twelveMonths: comboDataFirstSelectedVariant?.twelveMonths,
        selectedMonths: comboDataFirstSelectedVariant?.selectedMonths,
        interest: comboDataFirstSelectedVariant?.interest,
        loan: comboDataFirstSelectedVariant?.loan,
        rangeFinance: comboDataFirstSelectedVariant?.RangeFinance,
      };
      let dataSaveNow = {
        ...dataToSave,
        ...data,
        id: quoteDataTemp?.web_lead_id,
        saveEstimate: true,
        lead_status: 'QUOTE',
        log: JSON.stringify(log),
      };
      const keysToRemoveQuoteDataSaveNow = [
        "web_lead_id",
        "kkFactorData",
        "roofData",
        "quarterlyUnitRates",
        "regionQuarterlyDetails",
        "recommendedPanels",
        "regionsData",
        "standingChargeData",
        "comboData",
        "key",
        "lead_image",
      ]
      dataSaveNow = Object.fromEntries(
        Object.entries(dataSaveNow ?? {}).filter(([key]) => !keysToRemoveQuoteDataSaveNow.includes(key))
      );
      console.log('dataSaveNow', { dataSaveNow, comboDataFirstSelectedVariant });

      await updateUserInfoQuoteWebLeadDataAPI(dataSaveNow);
      toast.success('Successfully Updated The Details!', { id: toastId });
      event(EVENTENUMS.Lead, { 'context': 'result-Page SAVE YOUR ESTIMATE FORM POPUP submission' })

      setQuoteData(() => ({
        ...quoteData,
        ...data,
        lead_status: 'QUOTE',
      }));
    } catch (error) {
      console.log('dataSaveNow', { error });
      toast.error('Error Occurred Please Try Again!', { id: toastId });
    } finally {
      setLoading(false);

      setOpenSaveEstimatePopup(false), setDisableScroll(false);
    }
  };

  useEffect(() => {
    if (quoteData?.firstName) {
      setValue('firstName', quoteData?.firstName);
    }
    if (quoteData?.lastName) {
      setValue('lastName', quoteData?.lastName);
    }
    if (quoteData?.phone) {
      setValue('phone', quoteData?.phone);
    }
    if (quoteData?.email) {
      setValue('email', quoteData?.email);
    }
    // console.log('quoteData from form', quoteData);
  }, [quoteData]);
  return (
    <>
      <div className={`${styles.saveEstimationProgressPopup}`}>
        <div
          onClick={() => {
            setInitialAutoOpenSaveEstimatePopup(false),
              setOpenSaveEstimatePopup(false), setDisableScroll(false);
          }}
          className={`${styles.transparentContainer}`}
        >
          <div
            data-aos="zoom-in"
            className={`${styles.dialogBox} `}
            onClick={(e) => {
              e.stopPropagation();

            }}
          >
            <div className='side_bar'>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className={`${styles.contentSection}`}>
                  <div className={`${styles.saveEstimate}`}>
                    Save your estimate
                  </div>
                  <div className={`${styles.descriptionText1}`}>
                    Would you like to save your progress? We can email you a link
                    to continue your session.
                  </div>
                  <div className="d-flex flex-column position-relative">
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        //   gridTemplateRows: 'repeat(2,minmax(0,1fr))',
                      }}
                    >
                      <label
                        htmlFor="firstName"
                        className={`${styles.descriptionText2}`}
                      >
                        First Name
                      </label>
                      <input
                        {...register('firstName')}
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="e.g John "
                        className={`${errors?.firstName ? 'error-border' : ''}`}
                      />
                    </div>
                    <p
                      style={{
                        textAlign: 'start',
                        marginBottom: '0',
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        paddingTop: '4px',
                        position: 'absolute',
                        bottom: '-21px',
                      }}
                    >
                      {errors.firstName?.message?.toString()}
                    </p>
                  </div>
                  <div className="d-flex flex-column position-relative">
                    <div
                      style={{
                        //   position: 'relative',
                        //   display: 'grid',
                        //   gridTemplateRows: 'repeat(2,minmax(0,1fr))',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <label
                        htmlFor="lastName"
                        className={`${styles.descriptionText2}`}
                      >
                        Last Name
                      </label>
                      <input
                        {...register('lastName')}
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="e.g  Smith"
                        className={`${errors?.lastName ? 'error-border' : ''}`}
                      />
                    </div>
                    <p
                      style={{
                        // textAlign: 'start',
                        // marginBottom: '0',
                        // color: 'red',
                        // fontWeight: 'bold',
                        // fontSize: '14px',
                        // paddingTop: '4px',
                        textAlign: 'start',
                        marginBottom: '0',
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        paddingTop: '4px',
                        position: 'absolute',
                        bottom: '-21px',
                      }}
                    >
                      {errors.lastName?.message?.toString()}
                    </p>
                  </div>
                  <div className="d-flex flex-column position-relative">
                    <div
                      style={{
                        //   position: 'relative',
                        //   display: 'grid',
                        //   gridTemplateRows: 'repeat(2,minmax(0,1fr))',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <label
                        htmlFor="email"
                        className={`${styles.descriptionText2}`}
                      >
                        Email Address
                      </label>
                      <input
                        {...register('email')}
                        id="email"
                        type="text"
                        name="email"
                        placeholder="e.g John.smith@example.co.uk"
                        className={`${errors?.email ? 'error-border' : ''}`}
                      />
                    </div>
                    <p
                      style={{
                        // textAlign: 'start',
                        // marginBottom: '0',
                        // color: 'red',
                        // fontWeight: 'bold',
                        // fontSize: '14px',
                        // paddingTop: '4px',
                        textAlign: 'start',
                        marginBottom: '0',
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        paddingTop: '4px',
                        position: 'absolute',
                        bottom: '-21px',
                      }}
                    >
                      {errors.email?.message?.toString()}
                    </p>
                  </div>
                  <div className="d-flex flex-column position-relative">
                    <div
                      style={{
                        //   position: 'relative',
                        //   display: 'grid',
                        //   gridTemplateRows: 'repeat(2,minmax(0,1fr))',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <label
                        htmlFor="phone"
                        className={`${styles.descriptionText2}`}
                      >
                        Contact Number
                      </label>
                      <input
                        {...register('phone')}
                        id="phone"
                        type="text"
                        name="phone"
                        placeholder="e.g. 01234 567890"
                        className={`${errors?.phone ? 'error-border' : ''}`}
                      />
                    </div>
                    <p
                      style={{
                        // textAlign: 'start',
                        // marginBottom: '0',
                        // color: 'red',
                        // fontWeight: 'bold',
                        // fontSize: '14px',
                        // paddingTop: '4px',
                        textAlign: 'start',
                        marginBottom: '0',
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        paddingTop: '4px',
                        position: 'absolute',
                        bottom: '-21px',
                      }}
                    >
                      {errors.phone?.message?.toString()}
                    </p>
                  </div>
                  <div />

                  <div className={`${styles.buttonSection} text-center`}>
                    <button
                      disabled={loading}
                      type="submit"
                      className={`${styles.buttonClass} ${styles.blueBG} `}
                      onClick={() => { setInitialAutoOpenSaveEstimatePopup(false) }}
                    >
                      Save estimate
                    </button>
                    <div
                      className={`${styles.buttonClass} ${styles.greyBG} `}
                      onClick={() => {
                        setInitialAutoOpenSaveEstimatePopup(false),
                          setOpenSaveEstimatePopup(false), setDisableScroll(false);
                      }}
                    >
                      Continue without saving
                    </div>
                  </div>
                  <div className={`${styles.descriptionText3}`}>
                    By providing your email address and submitting, you consent to
                    us using your data to send a copy of your quote(s) to your
                    email and occasionally follow up with additional information,
                    such as available discounts. Your submission indicates
                    agreement with our{' '}
                    <Link
                      className="link-underline-dark text-dark d-inline"
                      href="/privacy-policy/"
                      target="_blank"
                    >
                      privacy policy
                    </Link>
                    .
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveEstimationProgressPopup;
