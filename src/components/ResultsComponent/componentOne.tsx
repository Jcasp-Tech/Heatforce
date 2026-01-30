import { useEffect, useRef, useState } from 'react';
import { getParseFloat, getParseInt } from '../NumberFunctions';
import { addCommas } from '@/utils/helpers';
import Image from 'next/image';
import GlobalCursor from '../globalCursor';
import { event, EVENTENUMS } from '../Pixel/facebook/lib/fpixel';

export interface ComponentOneProps {
  componentComboData: any;
  quoteData: any;
  addDataForSorting: any;
  setDisableScroll: (value: boolean) => void;
  index: number;
  changePopupData: (d: any) => void;
  saveCurrentPackageInfo: (d: any) => void;
  setOpeningModalName: (d: any) => void;
  setOpenResultPagePopUp: (d: any) => void;
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
let no_sort=0;
const ComponentOne = (props: ComponentOneProps) => {
  const {
    componentComboData,
    quoteData,
    setDisableScroll,
    addDataForSorting,
    index,
    changePopupData,
    setOpeningModalName,
    setOpenResultPagePopUp,
    saveCurrentPackageInfo,
    webLeadType,
  } = props;

  console.log('index', index);

  const PixelEventLimitingRef = useRef(true);
  const [isSaleOn, setIsSaleOn] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState<any>();
  const [batteryVariants, setBatteryVariants] = useState<any>();

  const { combo_main_id } = componentComboData;

  const handleBatteryVariantChange = (batteryVariantSelected: any) => {
    if (
      batteryVariantSelected &&
      batteryVariants &&
      batteryVariantSelected.battery_kWh !== selectedVariant.battery_kWh
    ) {
      console.log(
        'handleBatteryVariantChange',
        batteryVariantSelected.battery_kWh
      );

      console.log('batteryVariantSelected', batteryVariantSelected);
      no_sort = 1
      setSelectedVariant(batteryVariantSelected);
    }
  };
  
  useEffect(() => {
    if (componentComboData?.selectedVariant) {
      const selectedVariantNew = componentComboData?.selectedVariant;
      setSelectedVariant(selectedVariantNew);
      setBatteryVariants(componentComboData?.batteryVariants);
      // setInverterVariations(Object.values(selectedVariantNew?.inverters?.more))
    }
    console.log('selectedVariants', selectedVariant);
  }, [componentComboData?.selectedVariant]);

  useEffect(() => {
    if (!selectedVariant?.battery_kWh) {
      return;
    }
    let updatedSelectedVariant = { ...selectedVariant };

    addDataForSorting({
      selected_battery_key: updatedSelectedVariant.key,
      combo_main_id: updatedSelectedVariant.combo_main_id,
      no_sort: no_sort,
    });
  }, [
    selectedVariant?.battery_kWh,
    selectedVariant?.totalEstimatedPrice,
    selectedVariant?.monthly_apr_from,
  ]);

  const displayEnquireAboutThisPackage = () => {
    return (
      <div
        className={`animationBorder borderRadius10px z-0 ${quoteData?.lead_status === 'CONFIRM' ? 'opacity-0 pe-none' : ''
          }  `}
      >
        <div className="m1px position-rel z-1 w-100">
          <div
            onClick={() => {
              event(EVENTENUMS.InitiateCheckout, {
                package_name: selectedVariant?.combo_name,
                content_type: 'package',
              });
              saveCurrentPackageInfo(selectedVariant);
            }}
            className="componentOneBookCallBackForFreeSurvey text-center"
          >
            Enquire about this package
          </div>
        </div>
      </div>
    );
  };

  const enumLabel = [
    {
      value: 1,
      label1: 'OUR TOP PICK: ',
      //  label2: 'Higher Cost | Earn More' ,
      label2: '',
    },
    {
      value: 2,
      label1: 'OUR SECOND PICK: ',
      // label2: 'More affordable | Earn a Little Less',
      label2: '',
    },
    {
      value: 3,
      label1: 'OUR THIRD PICK: ',
      // label2: 'Most affordable | Earn the Least',
      label2: '',
    },
    {
      value: 4,
      label1: 'OUR FOURTH PICK: ',
      // label2: 'Most affordable | Earn the Least',
      label2: '',
    },
    {
      value: 5,
      label1: 'OUR FIFTH PICK: ',
      // label2: 'Most affordable | Earn the Least',
      label2: '',
    },
    {
      value: 6,
      label1: 'OUR SIXTH PICK: ',
      // label2: 'Most affordable | Earn the Least',
      label2: '',
    },
    {
      value: 7,
      label1: 'OUR SEVENTH PICK: ',
      // label2: 'Most affordable | Earn the Least',
      label2: '',
    },
    {
      value: 8,
      label1: 'OUR EIGHTH PICK: ',
      // label2: 'Most affordable | Earn the Least',
      label2: '',
    },
    {
      value: 9,
      label1: 'OUR NINTH PICK: ',
      // label2: 'Most affordable | Earn the Least',
      label2: '',
    },
    {
      value: 10,
      label1: 'OUR TENTH PICK: ',
      // label2: 'Most affordable | Earn the Least',
      label2: '',
    },
  ];
  const displaySquareTickImg = () => {
    return (
      <Image
        quality={100}
        style={{
          height: '28px',
          width: '25px',
        }}
        width={100}
        height={100}
        src="/otherpages/purpleCheckmark.svg"
        alt="square-tick"
      />
    );
  };
  useEffect(() => {
    if (webLeadType) {
      if (webLeadType === 1) {
        setIsSaleOn(true);
      } else {
        setIsSaleOn(false);
      }
    }
  }, [webLeadType]);

  return (
    <>
      <div className={`section1`} id={`section${index + 1}`}>
        <div className={index % 2 == 0 ? 'sectionDiv1' : 'sectionDiv2'}>
          <GlobalCursor
            blob={index % 2 == 0 ? 'globalBlob' : 'globalBlob2'}
            id={`section${index + 1}`}
          />
        </div>
        <div className="headingWrapper col-12">
          <div className="topLine">
            <div className="number">
              <span className="numberOption">Option</span>
              {index + 1}
            </div>
            {
              <div className="mainHeading col-11">
                {quoteData?.lead_status === 'CONFIRM' ? (
                  <span className="font34Green">YOUR CHOSEN OPTION : </span>
                ) : (
                  <>
                    <span className="font34Green">
                      {enumLabel[index]?.label1}
                    </span>
                    <span className="valign">{enumLabel[index]?.label2}</span>
                  </>
                )}
              </div>
            }
          </div>
          <div className="number">
            <span className="numberOption">Option</span>
            {index + 1}
          </div>
          <div className={`heading${1} comboHeading${1} col-11 m-0`}>
            <div className="mb-4">
              <p className="chooseBatteryText">
                Choose the battery size you need
              </p>
              <div className="d-flex flex-row align-items-left gap-2 chooseBatteryButton">
                {batteryVariants?.map((batteryVariant: any) => {
                  // Destructuring to avoid repeated access to props
                  const { battery_kWh, key } = batteryVariant;
                  const isBatterySelected =
                    battery_kWh === selectedVariant?.battery_kWh;
                  const isLeadConfirm = quoteData?.lead_status === 'CONFIRM';
                  const isNoBattery = batteryVariant?.battery_kWh === 1;

                  // Precompute the class names based on conditions
                  const buttonClass = isBatterySelected
                    ? 'BatteryVariantBoxSelected BatteryVariantWithOfferPadding borderRadius18'
                    : isLeadConfirm &&
                      battery_kWh !== selectedVariant?.battery_kWh
                      ? 'BatteryVariantBoxDisabled BatteryVariantWithOfferPadding borderRadius18'
                      : 'BatteryVariantBox BatteryVariantWithOfferPadding borderRadius18';

                  const textClass =
                    isLeadConfirm &&
                      battery_kWh !== selectedVariant?.battery_kWh
                      ? 'font15Disable font15-battery lineHeight15 mt-2'
                      : isBatterySelected
                        ? 'font15Selected lineHeight15'
                        : 'font15-battery lineHeight15';

                  const textClassBrandName = (isBatterySelected
                    ? 'font11BlueSelected mb-2'
                    : 'font11Blue mb-2') + " " + batteryVariant?.key + "_" + batteryVariant?.battery_id;

                  const content = isNoBattery
                    ? 'No Battery'
                    : `${battery_kWh} KWh`;

                  return (
                    <button
                      key={key + 'Mobile'}
                      className={buttonClass}
                      onClick={() => {
                        handleBatteryVariantChange(batteryVariant);
                      }}
                      disabled={
                        isLeadConfirm &&
                        battery_kWh !== selectedVariant?.battery_kWh
                      }
                    >
                      <div className="col-12 mt-11 text-center cursor-pointer">
                        <div className="col-12 mt-11 text-center">
                          <div className={textClassBrandName}>
                            {batteryVariant?.battery_brand_name}
                          </div>
                          <div className={textClass}>{content}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="topLine headingWrapperMain">
          <div className="number">
            <span className="numberOption">Option</span>
            {index + 1}
          </div>
          {
            <div className="mainHeading">
              {quoteData?.lead_status === 'CONFIRM' ? (
                <span className="font34Green">YOUR CHOSEN OPTION : </span>
              ) : (
                <>
                  <span className="font34Green">
                    {enumLabel[index]?.label1}
                  </span>
                  <span className="valign">{enumLabel[index]?.label2}</span>
                </>
              )}
            </div>
          }
        </div>
        <div className="comboCard mt-4">
          <div className="row mt-1 mt-xl-3 col-12 comboCardDiv position-relative">
            <div className="col-6 comboImageWrapper position-relative ">
              <div className="d-flex ml-5 flex-column logoImgDiv">
                <div className="mb-2 iconNone">
                  {webLeadType === 1
                    ? selectedVariant?.solar_logo_image?.path && (
                      <Image
                        quality={100}
                        src={selectedVariant.solar_logo_image?.path}
                        alt="dasolarLogo"
                        width={200}
                        height={150}
                      />
                    )
                    : selectedVariant?.battery_brand_image?.path && (
                      <Image
                        quality={100}
                        src={selectedVariant.battery_brand_image?.path}
                        alt="dabatteryLogo"
                        width={200}
                        height={150}
                      />
                    )}
                </div>
                <div className="mt-logo brand-tag-work-with-icon">
                  {webLeadType === 1
                    ? selectedVariant?.logo_left_image?.path && (
                      <Image
                        quality={100}
                        src={selectedVariant?.logo_left_image?.path}
                        className="workWith"
                        alt="jiffy"
                        width={150}
                        height={150}
                      />
                    )
                    : selectedVariant?.battery_brand_tag_image?.path && (
                      <Image
                        quality={100}
                        src={selectedVariant.battery_brand_tag_image?.path}
                        alt="dabatteryLogo"
                        width={150}
                        height={150}
                      />
                    )}
                </div>
              </div>

              <div className="ButtonBatteryVariant">
                <p className="font20">Choose the battery size you need</p>
                <div className="d-flex flex-row lg:flex-row justify-content-center gap-2">
                  {batteryVariants?.map((batteryVariant: any) => {
                    // Destructuring to avoid repeated access to props
                    const { battery_kWh, key } = batteryVariant;
                    const isBatterySelected =
                      battery_kWh === selectedVariant?.battery_kWh;
                    const isLeadConfirm = quoteData?.lead_status === 'CONFIRM';
                    const isNoBattery = batteryVariant?.battery_kWh === 1;

                    // Precompute the class names based on conditions
                    const buttonClass = isBatterySelected
                      ? 'BatteryVariantBoxSelected BatteryVariantWithOfferPadding borderRadius18'
                      : isLeadConfirm &&
                        battery_kWh !== selectedVariant?.battery_kWh
                        ? 'BatteryVariantBoxDisabled BatteryVariantWithOfferPadding borderRadius18'
                        : 'BatteryVariantBox BatteryVariantWithOfferPadding borderRadius18';

                    const textClass =
                      isLeadConfirm &&
                        battery_kWh !== selectedVariant?.battery_kWh
                        ? 'font17Disable lineHeight22 mt-2'
                        : isBatterySelected
                          ? 'font17Selected lineHeight22'
                          : 'font17 lineHeight22';
                    const textClassBrandName = (isBatterySelected
                      ? 'font11BlueSelected mb-1'
                      : 'font11Blue mb-1') + " " + batteryVariant?.key + "_" + batteryVariant?.battery_id;

                    const content = isNoBattery
                      ? 'No Battery'
                      : `${battery_kWh} KWh`;

                    return (
                      <button
                        key={key + 'Desktop'}
                        className={buttonClass}
                        onClick={() => {
                          handleBatteryVariantChange(batteryVariant);
                        }}
                        disabled={
                          isLeadConfirm &&
                          battery_kWh !== selectedVariant?.battery_kWh
                        }
                      >
                        <div className="col-12 mt-11 text-center px-1 cursor-pointer">
                          <div className="col-12 mt-11 text-center">
                            <div className={textClassBrandName}>
                              {batteryVariant?.battery_brand_name}

                            </div>
                            <div className={textClass}>{content}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <Image
                  quality={100}
                  // Battery Combo Image For Desktop
                  src={selectedVariant?.combo_image?.path}
                  width={460}
                  height={460}
                  alt="comboImage"
                  className="comboImage1 position-relative ml-auto"
                />
              </div>

              <Image
                quality={100}
                // Battery Combo Image For Mobile
                src={selectedVariant?.combo_image?.path}
                width={200}
                height={250}
                alt="comboImage mt-5"
                className="comboImage1 position-relative ml-auto BatteryOnlyMobileComponent"
              />
              {webLeadType === 1
                ? selectedVariant?.logo_right_image?.path && (
                  <div className="mt-logo logo_right_image">
                    <Image
                      quality={100}
                      src={selectedVariant.logo_right_image.path}
                      alt="work-with"
                      className="workWithIcon"
                      width={120}
                      height={120}
                    />
                  </div>
                )
                : ''}
            </div>

            <div className="col-5 combo1Icon">
              <div className="d-flex flex-column align-items-start">
                <div className="me-4 mb-2">
                  <Image
                    quality={100}
                    src={selectedVariant?.battery_brand_image?.path}
                    alt="dasolarLogo"
                    className="solar_logo_image"
                    width={webLeadType === 1 ? 250 : 300}
                    height={webLeadType === 1 ? 120 : 80}
                  />
                </div>
              </div>

              <ul className="checkList comboCheckList1 mt-2">
                {selectedVariant?.combo_features
                  ?.split('\n')
                  .map((item: any, index: number) => {
                    let displayNumber = `1 X ${selectedVariant?.inverter_variation_selected
                      ?.inverter_kWh || 1
                      } kWh `;
                    if (index === 0 || index === 3) {
                      displayNumber = `${quoteData?.total_panels} X `;
                    }
                    if (
                      index === 2 &&
                      selectedVariant?.battery_unique_id !== 'NoBattery'
                    ) {
                      displayNumber = `1 X `;
                    }
                    if (
                      index === 2 &&
                      selectedVariant?.battery_unique_id == 'NoBattery'
                    ) {
                      displayNumber = `${quoteData?.total_panels} X `;
                    }
                    if (
                      index === 3 &&
                      selectedVariant?.battery_unique_id == 'NoBattery'
                    ) {
                      displayNumber = ``;
                    }

                    if (index >= 4) {
                      displayNumber = '';
                    }

                    return (
                      <li key={index}>
                        <span>{displaySquareTickImg()}</span>
                        {webLeadType === 1 ? displayNumber : ''}

                        {item}
                      </li>
                    );
                  })}
              </ul>

              <div className="d-flex justify-content-between align-items-center mt-4">
                {isSaleOn ? (
                  <>
                    <div className="lightBox lightBoxWithOfferPadding borderRadius18 ">
                      <div className="col-12 mt-11 text-center">
                        <div className="col-12 mt-11 text-center">
                          <div className="font14Blue mb-1">Cash Estimate </div>
                          <div className="font14Blue mb-1">
                            Normally{' '}
                            <strong className="fw-bold text-decoration-line-through">
                              £
                              {addCommas(
                                getParseInt(
                                  selectedVariant?.totalEstimatedPrice * 1.15
                                )
                              )}
                            </strong>
                          </div>
                          <div className="font24 lineHeight22 text-nowrap">
                            NOW £
                            {addCommas(
                              getParseInt(selectedVariant?.totalEstimatedPrice)
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lightBox borderRadius18 ">
                      <div className="col-12 mt-11 text-center">
                        <div className="col-12 mt-11 text-center">
                          <div className="font14Blue mb-1">Cash Estimate </div>
                          <div className="font30 lineHeight22">
                            £
                            {addCommas(
                              getParseInt(selectedVariant?.totalEstimatedPrice)
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div
                  className="lightBox borderRadius18 cursorPointer"
                  onClick={() => {
                    changePopupData(combo_main_id);
                    setOpeningModalName((prev) => {
                      const updated = [
                        ...prev.filter(
                          (name) =>
                            name !== modalEnum.closeFinanceCalculatorPopup
                        ),
                        modalEnum.financeCalculatorPopup,
                      ];
                      return Array.from(new Set(updated));
                    });
                  }}
                >
                  <div className="col-12 mt-0 text-center">
                    <div className="font14Blue mb-1">Or Monthly From</div>
                    <div className="font30-lineHeight22 dottedUnderlineGlobal">
                      <span
                        style={{
                          borderBottom: '3px dotted black',
                          display: 'inline-block ',
                        }}
                        className="font32BlueNoMinW lineHeight22 font80Mob lineHeight08"
                      >
                        £
                        {addCommas(
                          quoteData?.lead_status === 'CONFIRM'
                            ? getParseFloat(quoteData?.monthly_apr_from)
                            : getParseFloat(
                              selectedVariant?.monthly_apr_from
                            ).toFixed(2)
                        )}
                      </span>
                    </div>
                    <div className="font8px">Click for more info</div>
                  </div>
                </div>
              </div>

              <div className="comboNewBtnGreen viewFullBreakdownBorderRadius2 mt-4 z-0 w-100">
                <button
                  type="button"
                  className="newBtnBlue mt-0 position-rel viewFullBreakdownBorderRadius2 z-1 "
                  onClick={() => {
                    setOpenResultPagePopUp(true);
                    if (PixelEventLimitingRef.current) {
                      event(
                        EVENTENUMS.Search + '_' + selectedVariant?.combo_name,
                        {
                          package_name: selectedVariant?.combo_name,
                          content_type: 'package',
                        }
                      );
                      PixelEventLimitingRef.current = false;
                    }
                    changePopupData(combo_main_id);

                    setOpeningModalName((prev) => {
                      const updated = [
                        ...prev.filter(
                          (name) => name !== modalEnum.closeResultPagePopup
                        ),
                        modalEnum.openResultPagePopup,
                      ];
                      return Array.from(new Set(updated));
                    });
                    setDisableScroll(true);
                  }}
                >
                  View full breakdown...
                  <div className="blueButtonInnerDiv z-n1"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 mt-4 bgLightGray position-relative">
          <ul className="checkList comboCheckList2 mt-2">
            {selectedVariant?.combo_features &&
              selectedVariant?.combo_features
                .split('\n')
                .map((item: any, index: number) => {
                  let displayNumber = `1 X ${selectedVariant?.inverter_variation_selected
                    ?.inverter_kWh || 1
                    } kWh `;
                  if (index === 0 || index === 3) {
                    displayNumber = `${quoteData?.total_panels} X `;
                  }
                  if (
                    index === 2 &&
                    selectedVariant?.battery_unique_id !== 'NoBattery'
                  ) {
                    displayNumber = `1 X `;
                  }
                  if (
                    index === 2 &&
                    selectedVariant?.battery_unique_id == 'NoBattery'
                  ) {
                    displayNumber = `${quoteData?.total_panels} X `;
                  }
                  if (
                    index === 3 &&
                    selectedVariant?.battery_unique_id == 'NoBattery'
                  ) {
                    displayNumber = ``;
                  }

                  if (index >= 4) {
                    displayNumber = '';
                  }

                  return (
                    <li key={index}>
                      <span>
                        <Image
                          quality={100}
                          src="/images/pages/result/newCheckBlk.webp"
                          alt="newCheckBlk"
                          width={25}
                          height={28}
                        />
                      </span>
                      {webLeadType === 1 ? displayNumber : ''}
                      {item}
                    </li>
                  );
                })}

            <div className="viewFullBreakdownBorderRadius2 mb-3 z-0 widthFitContent">
              <button
                type="button"
                className="newBtnBlue mt-0 position-rel viewFullBreakdownBorderRadius2 z-1 "
                onClick={() => {
                  setOpenResultPagePopUp(true);
                  if (PixelEventLimitingRef.current) {
                    event(
                      EVENTENUMS.Search + '_' + selectedVariant?.combo_name,
                      {
                        package_name: selectedVariant?.combo_name,
                        content_type: 'package',
                      }
                    );
                    PixelEventLimitingRef.current = false;
                  }
                  changePopupData(combo_main_id);

                  setOpeningModalName((prev) => {
                    const updated = [
                      ...prev.filter(
                        (name) => name !== modalEnum.closeResultPagePopup
                      ),
                      modalEnum.openResultPagePopup,
                    ];
                    return Array.from(new Set(updated));
                  });
                  setDisableScroll(true);
                }}
              >
                <div className="px-4 fontMed">View full breakdown...</div>
                <div className="blueButtonInnerDiv z-n1"></div>
              </button>
            </div>
          </ul>
          <div className="font22Blue font18px lineHeight22 textCenter lineHeight50Mob">
            Your Estimated Annual Savings
          </div>
          <div className="font16Blue fontLight textCenter marginTop5 mb-3 mb-xl-0">
            Based on your usage of {selectedVariant?.annual_energy_usage || 0}
            kWh
          </div>
          <div className="col-12 col-md-12 col-lg-12 px-0 estimateCardDivmxAuto mx-auto mt-4">
            <div className="row g-3 estimateCardDiv">
              <div className="col-12 order-0 order-xl-0 componentOneEstimatedAnnualElectricityBill02">
                <div
                  className="grayBox borderRadius18 cursor-pointer"
                  onClick={() => {
                    changePopupData(combo_main_id);
                    setOpeningModalName((prev) => {
                      const updated = [
                        ...prev.filter(
                          (name) => name !== modalEnum.closeSolarSavingPopup
                        ),
                        modalEnum.solarSavingPopup,
                      ];
                      return Array.from(new Set(updated));
                    });
                    setDisableScroll(true);
                  }}
                >
                  <div className="electricityBillDIV d-flex justify-content-between">
                    <div className="font16Brown fontNormal col-4 pe-1">
                      Estimated Annual
                      <br />
                      Electricity Bill
                    </div>

                    <div className="d-flex justify-content-between w-100 gap-2">
                      <div className="col-33">
                        <div className="font14Black">Before solar</div>
                        <div className="font26Blue lineHeight50Mob">
                          £
                          {addCommas(
                            getParseInt(selectedVariant?.before_solar)
                          )}
                        </div>
                      </div>
                      <div className="col-33">
                        <div className="font14Black">After solar</div>
                        <div className="font26Blue lineHeight50Mob">
                          £
                          {addCommas(
                            getParseInt(selectedVariant?.new_after_solar)
                          )}
                        </div>
                      </div>
                      <div className="col-33 text-reductionn">
                        <div className="font14Black">Bill Reduction</div>

                        <div className="font24Greenn fontGreen font26Blue fontMed font85GreenMob">
                          {getParseInt(
                            selectedVariant?.after_electricity_bill_percentage
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
                    changePopupData(combo_main_id);
                    setOpeningModalName((prev) => {
                      const updated = [
                        ...prev.filter(
                          (name) => name !== modalEnum.closeSolarSavingPopup
                        ),
                        modalEnum.solarSavingPopup,
                      ];
                      return Array.from(new Set(updated));
                    });

                    setDisableScroll(true);
                  }}
                >
                  <div className="font20Brown fontNormal borderbotmBrown">
                    Estimated Annual Electricity Bill
                  </div>
                  <div className="electricityBillDIV">
                    <div className="col-4 mt-1">
                      <div className="font14Black">Before solar</div>
                      <div className="font26Blue lineHeight50Mob">
                        £{addCommas(getParseInt(selectedVariant?.before_solar))}
                      </div>
                    </div>
                    <div className="col-4 mt-1">
                      <div className="font14Black">After solar</div>
                      <div className="font26Blue lineHeight50Mob">
                        £
                        {addCommas(
                          getParseInt(selectedVariant?.new_after_solar)
                        )}
                      </div>
                    </div>
                    <div className="col-4 mt-1">
                      <div className="font14Black">Bill Reduction</div>

                      <div className="fontGreen font26Blue fontMed font85GreenMob">
                        {getParseInt(
                          selectedVariant?.after_electricity_bill_percentage
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
                          getParseInt(selectedVariant?.EstimatedExportEarnings)
                        )}
                      </div>
                      <div className="font14Blue">
                        £
                        {addCommas(
                          getParseInt(
                            selectedVariant?.EstimatedExportEarnings / 4
                          )
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
                      £{getParseInt(selectedVariant?.EstimateAnnualBillSaving)}
                    </div>
                    <div className="font14Blue">
                      £
                      {addCommas(
                        getParseInt(
                          selectedVariant?.EstimateAnnualBillSaving / 12
                        )
                      )}{' '}
                      per month
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-6 order-3 order-xl-3">
                <div
                  className="grayBox borderRadius18 grayBoxFlex greenBoxMob cursorPointer"
                  onClick={() => {
                    changePopupData(combo_main_id);
                    setOpeningModalName((prev) => {
                      const updated = [
                        ...prev.filter(
                          (name) =>
                            name !== modalEnum.closeFinanceCalculatorPopup
                        ),
                        modalEnum.financeCalculatorPopup,
                      ];
                      return Array.from(new Set(updated));
                    });
                  }}
                >
                  <div className="font20Brown fontNormal col-8 px-1">
                    Estimated <br /> Payback time (ROI)
                  </div>
                  <div className="col-4 mt-0 px-1">
                    <div className="font26Blue lineHeight50Mob fontGreen">{`${(
                      Number(selectedVariant?.totalEstimatedPrice) /
                      (Number(selectedVariant?.before_solar) -
                        Number(selectedVariant?.new_after_solar) +
                        Number(selectedVariant?.EstimatedExportEarnings))
                    ).toFixed(1)} Years`}</div>
                    <div className="font14Blue">cash purchase</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comboNewBtnGreen1 estimateDiv">
              <div className="mt-4 lightBtn align-items-center">
                {isSaleOn ? (
                  <>
                    <div className="newLightBox newLightBoxWithOfferPadding borderRadius18 newLightBoxMob1">
                      <div className="col-12 mt-11 text-center">
                        <div className="font14Blue mb-1">Cash Estimate</div>
                        <div className="font14Blue mb-1">
                          Normally{' '}
                          <strong className="fw-bold text-decoration-line-through">
                            £
                            {addCommas(
                              getParseInt(
                                selectedVariant?.totalEstimatedPrice * 1.15
                              )
                            )}
                          </strong>
                        </div>
                        <div className="font24 lineHeight22 text-nowrap">
                          NOW £
                          {addCommas(
                            getParseInt(selectedVariant?.totalEstimatedPrice)
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="newLightBox borderRadius18 newLightBoxMob1">
                      <div className="col-12 mt-0 text-center">
                        <div className="font14Blue mb-1">Cash Estimate</div>
                        <div className="font32Blue lineHeight22 font80Mob mb-1">
                          £
                          {addCommas(
                            getParseInt(selectedVariant?.totalEstimatedPrice)
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div
                  className="newLightBox borderRadius18 newLightBoxMob2 cursorPointer"
                  onClick={() => {
                    changePopupData(combo_main_id);

                    setOpeningModalName((prev) => {
                      const updated = [
                        ...prev.filter(
                          (name) =>
                            name !== modalEnum.closeFinanceCalculatorPopup
                        ),
                        modalEnum.financeCalculatorPopup,
                      ];
                      return Array.from(new Set(updated));
                    });
                  }}
                >
                  <div className="col-12 mt-0 text-center">
                    <div className="font14Blue mb-1">Or Monthly From</div>
                    <div className="font32Blue-lineHeight22 font80Mob mb-1 ">
                      <span
                        style={{
                          borderBottom: '3px dotted black',
                          display: 'inline-block ',
                        }}
                        className="font32BlueNoMinW lineHeight22 font80Mob lineHeight08"
                      >
                        £
                        {addCommas(
                          quoteData?.lead_status === 'CONFIRM'
                            ? getParseFloat(quoteData?.monthly_apr_from)
                            : getParseFloat(
                              selectedVariant?.monthly_apr_from
                            ).toFixed(2)
                        )}
                      </span>
                    </div>
                    <div className="font8px">Click for more info</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {selectedVariant?.combo_name && displayEnquireAboutThisPackage()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentOne;
