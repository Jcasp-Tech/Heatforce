import Image from 'next/image';
import styles from './resultPagePopup.module.scss';
// import PrimaryProductImageSpliderPopup from "../productImageSpliderModa;/primaryProductImageSpliderPopup";
// import { useState } from "react";
import { getParseFloat, getParseInt } from '@/components/NumberFunctions';
import { addCommas } from '@/utils/helpers';
// import CalculationsDrawer from "../calculatorModal/calculationsDrawer";
import { event, EVENTENUMS } from '@/components/Pixel/facebook/lib/fpixel';
import { useEffect, useState } from 'react';
import PrimaryProductImageSpliderPopup from '../productImageSpliderModa;/primaryProductImageSpliderPopup';
import MiniCalculationDrawer from './MiniFinaceCalculator/MiniFinanceCalculator';
import { useLoanCalculator } from '@/customhook/useLoanCalculator';

export interface ResultPagePopupProps {
  setDisableScroll: (value: boolean) => void;
  setOpenResultPagePopUp: (value: boolean) => void;
  setOpenSolarSavingPopup: (value: boolean) => void;
  setOpenFinanceCalculatorPopup: (value: boolean) => void;
  orderTotal: number;
  userDepositAmount: number;
  quoteData: any;
  setIsPopupInPopup: (value: boolean) => void;
  globalMonthly: number;
  totalPrice: number;
  addDataForSorting: any;
  openingModalName?: modalEnum[];
  setOpeningModalName: (d: any) => void;
  saveCurrentPackageInfo: (d: any) => void;
  changePopupData: (d: any) => void;
  scrolltoSection: any;
  comboData: any;
  componentComboData: any;
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

const ResultPagePopup = (props: ResultPagePopupProps) => {
  const {
    setDisableScroll,
    setIsPopupInPopup,
    addDataForSorting,
    setOpeningModalName,
    changePopupData,
    scrolltoSection,
    comboData,
    componentComboData,
    quoteData,
    saveCurrentPackageInfo,
    webLeadType,
  } = props;
  const {
    selectedVariantCalc,
    handleRangeChange,
    selectedMonths,
    setSelectedMonths,
  } = useLoanCalculator(componentComboData?.selectedVariant ?? {}, quoteData);

  const [selectedVariant, setSelectedVariant] = useState<any>();
  const [, setBatteryVariants] = useState<any>();

  const [isImageSpliderOpen, setIsImageSpliderOpen] = useState(false);
  const [selectedSliderImage, setSelectedSliderImage] = useState<any>(null);
  const [selectedSliderImagePath, setSelectedSliderImagePath] = useState<any>(
    selectedVariant?.combo_image?.path
  );
  const [isMobile, setIsMobile] = useState(false);

  const { combo_main_id } = componentComboData;

  useEffect(() => {
    if (componentComboData?.selectedVariant) {
      const selectedVariantNew = componentComboData?.selectedVariant;
      setSelectedVariant(selectedVariantNew);
      setBatteryVariants(componentComboData?.batteryVariants);
      setSelectedSliderImage(1);
      setSelectedSliderImagePath(selectedVariantNew?.combo_image?.path);
    }
  }, [componentComboData?.selectedVariant]);

  const displayCircleTickImg = () => {
    return (
      <Image
        quality={100}
        className={`${styles.circleTickImg}`}
        width={999}
        height={999}
        src="/images/resultPopupModule/circle-tick.webp"
        alt="circle-tick"
      />
    );
  };

  const displaySquareTickImg = () => {
    return (
      <Image
        quality={100}
        className={`${styles.squareTickImg}`}
        width={999}
        height={999}
        src="/images/resultPopupModule/square-tick.webp"
        alt="square-tick"
      />
    );
  };

  const displayEstimatedStatsBlocksSection = () => {
    return (
      <div
        className={`${styles.estimatedStatsBlocksSection}`}
        data-aos="zoom-in"
      >
        <div
          className={`${styles.e4e7eb_BG} ${styles.estimatedStatsBlock}`}
          style={{ cursor: 'pointer' }}
          onClick={() => {
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
          <div
            className={` ${styles.titleText} ${styles.bottomBorderSolidGreyDesktop}`}
          >
            Estimated Annual Electricity Bill
          </div>
          <div className={`d-flex justify-content-between`}>
            <div>
              <div className={` ${styles.descriptionText1} `}>Before solar</div>
              <div className={` ${styles.numbersText1}`}>
                £{addCommas(getParseInt(selectedVariant?.before_solar))}
              </div>
            </div>
            <div>
              <div className={` ${styles.descriptionText1} `}>After solar</div>
              <div className={` ${styles.numbersText1}`}>
                £{addCommas(getParseInt(selectedVariant?.new_after_solar))}
              </div>
            </div>
            <div>
              <div className={` ${styles.descriptionText1} `}>
                Bill Reduction
              </div>
              <div className={` ${styles.numbersText1} ${styles.greenFont}`}>
                {getParseInt(
                  selectedVariant?.after_electricity_bill_percentage
                )}
                %
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.e4e7eb_BG}  ${styles.estimatedStatsBlock} d-flex justify-content-between align-items-center`}
        >
          <div className={` ${styles.titleText}`}>
            Estimated Annual Export Earnings
          </div>
          <div className={` ${styles.numbersText2}  ${styles.greenFont}`}>
            £{addCommas(getParseInt(selectedVariant?.EstimatedExportEarnings))}
          </div>
        </div>

        <div className={`${styles.e4e7eb_BG} ${styles.estimatedStatsBlock}`}>
          <div className={` ${styles.titleText}`}>Payback time (ROI)</div>
          <div className={`${styles.gap2} d-flex `}>
            <div>
              <div
                className={` ${styles.numbersText1}`}
              >{`${selectedVariantCalc?.financePaybackTime?.toFixed(
                1
              )} Years`}</div>
              <div className={`${styles.descriptionText21}`}>On Finance</div>
            </div>
            <div className={` ${styles.CashPurchasesDiv}`}>
              <div
                className={` ${styles.numbersText1}`}
              >{`${selectedVariantCalc?.cashPaybackTime?.toFixed(
                1
              )} Years`}</div>
              <div className={`${styles.descriptionText21}`}>
                Cash Purchases
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayBookCallBackForFreeSurvey = (comboName) => {
    return (
      <div className="animationBorder borderRadius10px z-0 w-100">
        <div className="m1px position-rel z-1 w-100">
          <div className="d-flex " data-aos="zoom-in">
            <div
              onClick={() => {
                event(EVENTENUMS.InitiateCheckout, {
                  package_name: comboName,
                  content_type: 'package',
                });
                saveCurrentPackageInfo(selectedVariantCalc);
              }}
              className={`${styles.bookCallBackForFreeSurvey} `}
            >
              Enquire about this package
            </div>
          </div>
        </div>
      </div>
    );
  };
  const displayEnquireAboutThisPackage = (comboName) => {
    return (
      <div
        onClick={() => {
          event(EVENTENUMS.InitiateCheckout, {
            package_name: comboName,
            content_type: 'package',
          });
          saveCurrentPackageInfo(selectedVariantCalc);
        }}
        className={`${styles.bookCallBackForFreeSurvey}`}
      >
        Enquire about this package
      </div>
    );
  };
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div className={`${styles.resultPagePopup}`}>
        <div
          onClick={() => {
            scrolltoSection();
            setOpeningModalName((prev) => {
              const updated = [
                ...prev.filter(
                  (name) => name !== modalEnum.openResultPagePopup
                ),
                modalEnum.closeResultPagePopup,
              ];
              return Array.from(new Set(updated));
            });
            addDataForSorting({
              selected_battery_key: selectedVariantCalc.key,
              combo_main_id,
              updatedSelectedVariant: selectedVariantCalc,
              no_sort: 1
            });
            setDisableScroll(false), setIsPopupInPopup(false);
          }}
          className={`${styles.transparentContainer} `}
          data-aos="zoom-in"
        >
          {isImageSpliderOpen && selectedSliderImage && (
            <PrimaryProductImageSpliderPopup
              {...{
                setIsImageSpliderOpen,
                selectedVariant,
                selectedIndex: selectedSliderImage,
              }}
            />
          )}
          {isImageSpliderOpen && selectedSliderImage && (
            <PrimaryProductImageSpliderPopup
              {...{
                setIsImageSpliderOpen,
                selectedVariant,
                selectedIndex: selectedSliderImage,
              }}
            />
          )}

          <div
            className={`${styles.dialogBox}  `}
            id="scrollcontianer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className={`${styles.closeButton}`}
              onClick={() => {
                scrolltoSection();
                setOpeningModalName((prev) => {
                  const updated = [
                    ...prev.filter(
                      (name) => name !== modalEnum.openResultPagePopup
                    ),
                    modalEnum.closeResultPagePopup,
                  ];
                  return Array.from(new Set(updated));
                });
                addDataForSorting({
                  selected_battery_key: selectedVariantCalc.key,
                  combo_main_id,
                  updatedSelectedVariant: selectedVariantCalc,
                });
                setDisableScroll(false), setIsPopupInPopup(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
            <div className={`${styles.leftSection}`}>
              <div className={`${styles.widthLimiterLeft} `}>
                <div className={`${styles.primaryProductImageComponent}`}>
                  <div className={`${styles.topDiv}`}>
                    <Image
                      quality={100}
                      className={``}
                      width={webLeadType===2 ? 119 : 130}
                      height={webLeadType===2 ? 40 : 50}
                      sizes="100vw"
                      src={selectedVariant?.battery_brand_image?.path}
                      alt="product"
                    />
                  </div>

                  <div className="resultPagePopupImageMainDiv">
                    <div
                      className={`${styles.imageSlider} cursor-pointer componentsImageDiv`}
                    >
                      {selectedVariant?.combo_image?.path && (
                        <div
                          onClick={() => {
                            setSelectedSliderImage(1);
                            setSelectedSliderImagePath(
                              selectedVariant.combo_image.path
                            );
                          }}
                        >
                          <Image
                            quality={100}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                            src={selectedVariant.combo_image.path}
                            alt="product"
                          />
                        </div>
                      )}

                      {webLeadType === 1 &&
                        selectedVariant?.solar_panels?.solar_panel_image
                          ?.path && (
                          <div
                            onClick={() => {
                              setSelectedSliderImage(1);
                              setSelectedSliderImagePath(
                                selectedVariant.solar_panels.solar_panel_image
                                  .path
                              );
                            }}
                          >
                            <Image
                              quality={100}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                              src={
                                selectedVariant.solar_panels.solar_panel_image
                                  .path
                              }
                              alt="product"
                            />
                          </div>
                        )}

                      {webLeadType === 1 &&
                        selectedVariant?.inverter_variation_selected
                          ?.inverter_image?.path && (
                          <div
                            onClick={() => {
                              setSelectedSliderImage(3);
                              setSelectedSliderImagePath(
                                selectedVariant?.inverter_variation_selected
                                  ?.inverter_image?.path
                              );
                            }}
                          >
                            <Image
                              quality={100}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                              src={
                                selectedVariant?.inverter_variation_selected
                                  ?.inverter_image?.path
                              }
                              alt="product"
                            />
                          </div>
                        )}

                      {webLeadType === 1 &&
                        selectedVariant?.optimisers?.optimiser_image?.path && (
                          <div
                            onClick={() => {
                              setSelectedSliderImage(2);
                              setSelectedSliderImagePath(
                                selectedVariant.optimisers.optimiser_image.path
                              );
                            }}
                          >
                            <Image
                              quality={100}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                              src={
                                selectedVariant.optimisers.optimiser_image.path
                              }
                              alt="product"
                            />
                          </div>
                        )}

                      {selectedVariant?.battery_kWh !== 1 &&
                        selectedVariant?.battery_image?.path && (
                          <div
                            onClick={() => {
                              setSelectedSliderImage(4);
                              setSelectedSliderImagePath(
                                selectedVariant.battery_image.path
                              );
                            }}
                          >
                            <Image
                              quality={100}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                              src={selectedVariant.battery_image.path}
                              alt="product"
                            />
                          </div>
                        )}
                    </div>

                    <div className="comboImageDiv">
                      {selectedSliderImagePath && (
                        <Image
                          quality={100}
                          width={200}
                          height={200}
                          style={{
                            objectFit: 'contain',
                            mixBlendMode: 'multiply',
                          }}
                          src={selectedSliderImagePath}
                          alt="product"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className={`${styles.hideInMobile}`}>
                  {displayEstimatedStatsBlocksSection()}
                </div>

                <div
                  className={`${styles.showMoreSection} ${styles.solidUnderlineGrey} ${styles.hideInMobile} text-end cursor-pointer`}
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
                  }}
                >
                  show more
                </div>
                <div />
                {webLeadType === 1 && (
                  <div className={`${styles.specsSection}`}>
                    <div className={`${styles.titleText}`}>Specs</div>
                    <div className={`${styles.descriptionText}`}>
                      <div>
                        <div className="d-flex align-items-center">
                          {displayCircleTickImg()}
                          {parseInt(
                            selectedVariant?.solar_panels?.solar_panel_kWh || 0
                          ) * 0.001}{' '}
                          Kwh panels
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
                          Optimized for low-light
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={`${styles.rightSection}`}>
              <div className={`${styles.widthLimiterRight}`}>
                <div className={`${styles.rightsideTitle}`}>
                  {`${selectedVariant?.combo_name} ${
                    selectedVariant?.battery_kWh === '1'
                      ? `(No Battery Required)`
                      : ''
                  }`}
                  {/* {`${componentComboData?.combo_name} ${selectedVariant?.battery_kWh === '1' ? `(No Battery Required)` : ''}`} */}
                </div>
                <div className={`${styles.priceEstimateMonthlyPeriodWithImg}`}>
                  <div>
                    <div className={`${styles.text1}`}>Price estimate</div>
                    <div className={`${styles.text2}`}>
                      £
                      {addCommas(
                        getParseInt(selectedVariantCalc?.totalEstimatedPrice)
                      )}
                    </div>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      const container = document.getElementById(
                        isMobile
                          ? 'minicalculatormobile'
                          : 'minicalculatordesktop'
                      );
                      container?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }}
                  >
                    <div className={`${styles.text1}`}>or, monthly</div>
                    <div
                      className={`${styles.text2} ${styles.dottedUnderline}`}
                    >
                      £
                      {addCommas(
                        getParseFloat(
                          selectedVariantCalc?.monthly_apr_from
                        ).toFixed(2)
                      )}
                      <span
                        className={`${styles.perMonth} ${styles.hideInDesktop}`}
                      >
                        per month
                      </span>
                    </div>
                  </div>
                </div>

                {quoteData?.lead_status !== 'CONFIRM' && (
                  <div className="animationBorder borderRadius10px widthFitContentDesktop z-0">
                    <div className="m1px position-rel z-1 w-100">
                      <div className="d-flex " data-aos="zoom-in">
                        {selectedVariant?.combo_name &&
                          displayEnquireAboutThisPackage(
                            selectedVariant?.combo_name
                          )}
                      </div>
                    </div>
                  </div>
                )}

                <div className={`${styles.squareTickWithTextSection}`}>
                  {selectedVariant?.combo_features
                    ?.split('\n')
                    .map((item, index) => {
                      let displayNumber = `1 X ${
                        selectedVariant?.inverter_variation_selected
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
                        <div key={index} className={`${styles.mobileW100}`}>
                          {displaySquareTickImg()}

                          {webLeadType === 1 ? displayNumber : ''}

                          {item}
                        </div>
                      );
                    })}
                </div>

                <div className={`${styles.hideInDesktop}`}>
                  {displayEstimatedStatsBlocksSection()}
                </div>

                <div
                  className={`${styles.showMoreSection} ${styles.solidUnderlineGrey} ${styles.hideInDesktop} text-end`}
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
                  }}
                >
                  show more
                </div>
                <div className={styles.hideInDesktop} id="minicalculatormobile">
                  <MiniCalculationDrawer
                    userDepositAmount={selectedVariantCalc?.userDepositAmount}
                    RangeFinance={selectedVariantCalc?.RangeFinance}
                    getParseInt={getParseInt}
                    handleRangeChange={handleRangeChange}
                    setSelectedMonths={setSelectedMonths}
                    twelveMonths={selectedVariantCalc?.twelveMonths}
                    sixtyMonths={selectedVariantCalc?.sixtyMonths}
                    monthly={selectedVariantCalc?.monthly}
                    loan={selectedVariantCalc?.loan}
                    interest={selectedVariantCalc?.interest}
                    selectedMonths={selectedMonths}
                    totalEstimatedPrice={
                      selectedVariantCalc?.totalEstimatedPrice
                    }
                    orderTotal={selectedVariantCalc?.orderTotal}
                    leadStatus={quoteData?.lead_status}
                  />
                </div>
                {quoteData?.lead_status !== 'CONFIRM' && (
                  <div className={`${styles.hideInDesktop}`}>
                    {selectedVariant?.combo_name &&
                      displayBookCallBackForFreeSurvey(
                        selectedVariant?.combo_name
                      )}
                  </div>
                )}
                <div />

                <div
                  className={`${styles.hideInMobile}`}
                  id="minicalculatordesktop"
                >
                  <MiniCalculationDrawer
                    userDepositAmount={selectedVariantCalc?.userDepositAmount}
                    RangeFinance={selectedVariantCalc?.RangeFinance}
                    getParseInt={getParseInt}
                    handleRangeChange={handleRangeChange}
                    setSelectedMonths={setSelectedMonths}
                    twelveMonths={selectedVariantCalc?.twelveMonths}
                    sixtyMonths={selectedVariantCalc?.sixtyMonths}
                    monthly={selectedVariantCalc?.monthly}
                    loan={selectedVariantCalc?.loan}
                    interest={selectedVariantCalc?.interest}
                    selectedMonths={selectedMonths}
                    totalEstimatedPrice={
                      selectedVariantCalc?.totalEstimatedPrice
                    }
                    orderTotal={selectedVariantCalc?.orderTotal}
                    leadStatus={quoteData?.lead_status}
                  />
                </div>

                {webLeadType === 1 && (
                  <div className={`${styles.listHeader}`}>
                    Maximize Savings and Sustainability
                  </div>
                )}
                {webLeadType === 1 && (
                  <div>
                    <ul className={`${styles.listStyles}`}>
                      <li>
                        Reduce energy bills: Generate your own electricity and
                        slash your monthly expenses.
                      </li>
                      <li>
                        Store excess energy: The GivEnergy battery ensures you
                        can utilise solar power day and night.
                      </li>
                      <li>
                        Seamlessly integrate: The hybrid inverter optimizes
                        energy usage, maximizing efficiency and savings.
                      </li>
                      <li>
                        Featuring premium N-Type solar cell construction
                        technology which has been specifically optimised to work
                        in low-light conditions, which is handy in the UK.
                      </li>
                    </ul>
                  </div>
                )}
                <div className={`${styles.hideInDesktop}`}>
                  <div className={`${styles.rightsideCardHeaders}`}>
                    Package Product Datasheets
                  </div>

                  <div className={`${styles.gridPdf}  `}>
                    {selectedVariant?.battery_pdf?.path && (
                      <div
                        className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                        onClick={() =>
                          window.open(selectedVariant?.battery_pdf?.path)
                        }
                      >
                        <div className={`${styles.rightsideCardProductDiv}`}>
                          <Image
                            quality={100}
                            className={`${styles.hFill} `}
                            width={45}
                            height={45}
                            src="/images/resultPopupModule/_Path_.webp"
                            alt="product"
                          />
                        </div>
                        <div>
                          <div className={`${styles.text1} `}>
                            {selectedVariant?.battery_name}
                          </div>
                          <div className={`${styles.text2} `}>
                            Click to view
                          </div>
                        </div>
                      </div>
                    )}
                    {webLeadType === 1 &&
                      selectedVariant?.solar_panels &&
                      selectedVariant?.solar_panels?.solar_panel_pdf?.path && (
                        <div
                          className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                          onClick={() =>
                            window.open(
                              selectedVariant?.solar_panels.solar_panel_pdf
                                ?.path
                            )
                          }
                        >
                          <div className={`${styles.rightsideCardProductDiv}`}>
                            <Image
                              quality={100}
                              className={`${styles.hFill} `}
                              width={45}
                              height={45}
                              src="/images/resultPopupModule/_Path_.webp"
                              alt="product"
                            />
                          </div>
                          <div>
                            <div className={`${styles.text1} `}>
                              {' '}
                              {selectedVariant?.solar_panels.solar_panel_name}
                            </div>
                            <div className={`${styles.text2} `}>
                              Click to view
                            </div>
                          </div>
                        </div>
                      )}
                    {selectedVariant?.inverter_variation_selected?.inverter_pdf
                      ?.path && (
                      <div
                        className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                        onClick={() =>
                          window.open(
                            selectedVariant?.inverter_variation_selected
                              ?.inverter_pdf?.path
                          )
                        }
                      >
                        <div className={`${styles.rightsideCardProductDiv}`}>
                          <Image
                            quality={100}
                            className={`${styles.hFill} `}
                            width={45}
                            height={45}
                            src="/images/resultPopupModule/_Path_.webp"
                            alt="product"
                          />
                        </div>
                        <div>
                          <div className={`${styles.text1} `}>
                            {selectedVariant?.inverters?.inverter_name}
                          </div>
                          <div className={`${styles.text2} `}>
                            Click to view
                          </div>
                        </div>
                      </div>
                    )}
                    {webLeadType === 1 &&
                      selectedVariant?.optimisers &&
                      selectedVariant?.optimisers.optimiser_pdf?.path && (
                        <div
                          className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                          onClick={() =>
                            window.open(
                              selectedVariant?.optimisers.optimiser_pdf?.path
                            )
                          }
                        >
                          <div className={`${styles.rightsideCardProductDiv}`}>
                            <Image
                              quality={100}
                              className={`${styles.hFill} `}
                              width={45}
                              height={45}
                              src="/images/resultPopupModule/_Path_.webp"
                              alt="product"
                            />
                          </div>
                          <div>
                            <div className={`${styles.text1} `}>
                              {selectedVariant?.optimisers.optimiser_name}
                            </div>
                            <div className={`${styles.text2} `}>
                              Click to view
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <div className={`${styles.rightsideCardHeaders}`}>
                  What your package includes...
                </div>
                <div
                  className={
                    webLeadType === 1
                      ? styles.desktopFlex1
                      : styles.desktopFlex1ForBattery
                  }
                >
                  {webLeadType === 1 && selectedVariant?.solar_panels && (
                    <div
                      className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                    >
                      <div
                        className={`${styles.rightsideCardProductDiv} bg-white`}
                      >
                        <Image
                          quality={100}
                          className={`${styles.hFill} ${styles.padding04}`}
                          width={45}
                          height={45}
                          src={
                            selectedVariant?.solar_panels.solar_panel_image
                              ?.path ||
                            '/images/resultPopupModule/meyer-burger-black-angle.webp'
                          }
                          alt={selectedVariant?.solar_panels.solar_panel_name}
                        />
                      </div>
                      <div>
                        <div className={`${styles.text1}`}>
                          {' '}
                          {selectedVariant?.solar_panels.solar_panel_name}
                        </div>
                        <div className={`${styles.text2}`}>
                          {`${quoteData?.total_panels}X Panels`}{' '}
                          {`(${(
                            selectedVariant?.solar_panels?.solar_panel_kWh *
                            quoteData?.total_panels *
                            0.001
                          ).toFixed(1)} kWh)`}{' '}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedVariant &&
                    selectedVariant?.battery_kWh !== 1 &&
                    selectedVariant?.battery_unique_id !== 'NoBattery' && (
                      <div
                        className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                      >
                        <div
                          className={`${styles.rightsideCardProductDiv} bg-white`}
                        >
                          <Image
                            quality={100}
                            className={`${styles.hFill} ${styles.padding04}`}
                            width={45}
                            height={45}
                            src={
                              selectedVariant?.battery_image?.path ||
                              '/images/resultPopupModule/meyer-burger-black-angle.webp'
                            }
                            alt={
                              comboData?.selectedCombo?.battery?.battery_name ||
                              selectedVariant?.battery_name
                            }
                          />
                        </div>
                        <div>
                          <div className={`${styles.text1}`}>
                            1 X {selectedVariant?.battery_name}
                          </div>
                          <div className={`${styles.text2}`}>
                            {selectedVariant?.battery_kWh} kWh Battery
                          </div>
                        </div>
                      </div>
                    )}
                  {selectedVariant?.inverters && (
                    <div
                      className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                    >
                      <div
                        className={`${styles.rightsideCardProductDiv} bg-white`}
                      >
                        <Image
                          quality={100}
                          className={`${styles.hFill} ${styles.padding04}`}
                          width={45}
                          height={45}
                          src={
                            selectedVariant?.inverter_variation_selected
                              ?.inverter_image?.path ||
                            '/images/resultPopupModule/meyer-burger-black-angle.webp'
                          }
                          alt={
                            selectedVariant?.selected?.inverters.inverter_name
                          }
                        />
                      </div>
                      <div>
                        <div className={`${styles.text1}`}>
                          1 X{' '}
                          {selectedVariant?.inverter_variation_selected
                            ?.inverter_kWh || 1}{' '}
                          kWh {selectedVariant?.inverters.inverter_name}
                        </div>
                        {webLeadType !== 1 && (
                          <div className={`${styles.text2}`}>
                            Hybrid Inverter
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {webLeadType === 1 && selectedVariant?.optimisers && (
                    <div
                      className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                    >
                      <div
                        className={`${styles.rightsideCardProductDiv} bg-white`}
                      >
                        <Image
                          quality={100}
                          className={`${styles.hFill} ${styles.padding04}`}
                          width={45}
                          height={45}
                          src={
                            selectedVariant?.optimisers.optimiser_image?.path ||
                            '/images/resultPopupModule/meyer-burger-black-angle.webp'
                          }
                          alt={selectedVariant?.optimisers.optimiser_name}
                        />
                      </div>
                      <div>
                        <div className={`${styles.text1}`}>
                          {selectedVariant?.optimisers.optimiser_name}
                        </div>
                        <div
                          className={`${styles.text2}`}
                        >{`${quoteData?.total_panels}X Optimisers`}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={`${styles.rightsideCardHeaders}`}>
                  What else is included...
                </div>

                <div
                  className={
                    webLeadType === 1
                      ? styles.desktopgrid3
                      : styles.desktopgrid2ForBattery
                  }
                >
                  <div
                    className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                  >
                    <div
                      className={`${styles.rightsideCardProductDiv} bg-white`}
                    >
                      <Image
                        quality={100}
                        className={`${styles.wFill} `}
                        width={45}
                        height={45}
                        src="/images/resultPopupModule/_Clip Group_.webp"
                        alt="product"
                      />
                    </div>

                    <div className="productInfoDiv">
                      <div className={`${styles.text1}`}>
                        Full MCS installation
                      </div>
                      <div className={`${styles.text2}`}>
                        Inc. all required paperwork
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                  >
                    <div
                      className={`${styles.rightsideCardProductDiv} bg-white`}
                    >
                      <Image
                        quality={100}
                        className={`${styles.hFill} ${styles.padding04} `}
                        width={45}
                        height={45}
                        src="/images/resultPopupModule/_Group_.webp"
                        alt="product"
                      />
                    </div>
                    <div>
                      <div className={`${styles.text1}`}>
                        DNO (grid supplier) application
                      </div>
                      <div className={`${styles.text2}`}>
                        Inc. all required paperwork
                      </div>
                    </div>
                    {/* <div>
                                            <div className={`${styles.text1}`}>Electrical installation</div>
                                            <div className={`${styles.text2}`}>Inc. all required cables and fittings</div>
                                        </div> */}
                  </div>
                  {webLeadType === 1 && (
                    <div
                      className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                    >
                      <div
                        className={`${styles.rightsideCardProductDiv} bg-white`}
                      >
                        <Image
                          quality={100}
                          className={`${styles.wFill} ${styles.padding04} `}
                          width={45}
                          height={45}
                          src="/images/resultPopupModule/_Group_ (1).webp"
                          alt="product"
                        />
                      </div>
                      <div>
                        <div className={`${styles.text1}`}>
                          Premium on-roof works
                        </div>
                        <div className={`${styles.text2}`}>
                          Inc. rail system, hooks & clamps
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                  >
                    <div
                      className={`${styles.rightsideCardProductDiv} bg-white`}
                    >
                      <Image
                        quality={100}
                        className={`${styles.wFill} `}
                        width={45}
                        height={45}
                        src="/images/resultPopupModule/_Clip Group_ (1).webp"
                        alt="product"
                      />
                    </div>

                    <div>
                      <div className={`${styles.text1}`}>HIES protection</div>
                      <div className={`${styles.text2}`}>
                        2 year deposit protection
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                  >
                    <div
                      className={`${styles.rightsideCardProductDiv} bg-white`}
                    >
                      <Image
                        quality={100}
                        className={`${styles.wFill} ${styles.padding04} `}
                        width={45}
                        height={45}
                        src="/images/resultPopupModule/_Group_ (3).webp"
                        alt="product"
                      />
                    </div>
                    <div>
                      <div className={`${styles.text1}`}>
                        Electrical installation
                      </div>
                      <div className={`${styles.text2}`}>
                        Inc. all required cables and fittings
                      </div>
                    </div>
                  </div>
                  {webLeadType === 1 && (
                    <div
                      className={`${styles.e4e7eb_BG} ${styles.rightsideCard1}`}
                    >
                      <div
                        className={`${styles.rightsideCardProductDiv} bg-white`}
                      >
                        <Image
                          quality={100}
                          className={`${styles.hFill} ${styles.padding04} `}
                          width={45}
                          height={45}
                          src="/images/resultPopupModule/_Group_ (2).webp"
                          alt="product"
                        />
                      </div>

                      <div>
                        <div className={`${styles.text1}`}>Scaffolding</div>
                        <div className={`${styles.text2}`}>
                          Once we&apos;ve finalised your design
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`${styles.hideInMobile}`}>
                  <div
                    className={`${styles.rightsideCardHeaders}`}
                    style={{ marginBottom: '6px' }}
                  >
                    Package Product Datasheets
                  </div>

                  <div
                    className={
                      webLeadType === 1
                        ? styles.gridPdf
                        : styles.gridPdfForBattery
                    }
                  >
                    {selectedVariant?.battery_pdf?.path && (
                      <div
                        className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                        onClick={() =>
                          window.open(selectedVariant?.battery_pdf?.path)
                        }
                      >
                        <div className={`${styles.rightsideCardProductDiv}`}>
                          <Image
                            quality={100}
                            className={`${styles.hFill} `}
                            width={45}
                            height={45}
                            src="/images/resultPopupModule/_Path_.webp"
                            alt="product"
                          />
                        </div>
                        <div>
                          <div className={`${styles.text1} `}>
                            {selectedVariant?.battery_name}
                          </div>
                          <div className={`${styles.text2} `}>
                            Click to view
                          </div>
                        </div>
                      </div>
                    )}
                    {webLeadType === 1 &&
                      selectedVariant?.solar_panels &&
                      selectedVariant?.solar_panels.solar_panel_pdf?.path && (
                        <div
                          className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                          onClick={() =>
                            window.open(
                              selectedVariant?.solar_panels.solar_panel_pdf
                                ?.path
                            )
                          }
                        >
                          <div className={`${styles.rightsideCardProductDiv}`}>
                            <Image
                              quality={100}
                              className={`${styles.hFill} `}
                              width={45}
                              height={45}
                              src="/images/resultPopupModule/_Path_.webp"
                              alt="product"
                            />
                          </div>
                          <div>
                            <div className={`${styles.text1} `}>
                              {selectedVariant?.solar_panels.solar_panel_name}
                            </div>
                            <div className={`${styles.text2} `}>
                              Click to view
                            </div>
                          </div>
                        </div>
                      )}
                    {selectedVariant?.inverter_variation_selected?.inverter_pdf
                      ?.path && (
                      <div
                        className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                        onClick={() =>
                          window.open(
                            selectedVariant?.inverter_variation_selected
                              ?.inverter_pdf?.path
                          )
                        }
                      >
                        <div className={`${styles.rightsideCardProductDiv}`}>
                          <Image
                            quality={100}
                            className={`${styles.hFill} `}
                            width={45}
                            height={45}
                            src="/images/resultPopupModule/_Path_.webp"
                            alt="product"
                          />
                        </div>
                        <div>
                          <div className={`${styles.text1} `}>
                            {selectedVariant?.inverters?.inverter_name}
                          </div>
                          <div className={`${styles.text2} `}>
                            Click to view
                          </div>
                        </div>
                      </div>
                    )}
                    {webLeadType === 1 &&
                      selectedVariant?.optimisers &&
                      selectedVariant?.optimisers.optimiser_pdf?.path && (
                        <div
                          className={`${styles.e4e7eb_BG} ${styles.rightsideCard2}`}
                          onClick={() =>
                            window.open(
                              selectedVariant?.optimisers.optimiser_pdf?.path
                            )
                          }
                        >
                          <div className={`${styles.rightsideCardProductDiv}`}>
                            <Image
                              quality={100}
                              className={`${styles.hFill} `}
                              width={45}
                              height={45}
                              src="/images/resultPopupModule/_Path_.webp"
                              alt="product"
                            />
                          </div>
                          <div>
                            <div className={`${styles.text1} `}>
                              {selectedVariant?.optimisers.optimiser_name}
                            </div>
                            <div className={`${styles.text2} `}>
                              Click to view
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                {quoteData?.lead_status !== 'CONFIRM' && (
                  <div className={`${styles.hideInDesktop} `}>
                    <div className="animationBorder borderRadius10px z-0 w-100">
                      <div className="m1px position-rel z-1 w-100">
                        <div className="d-flex">
                          {selectedVariant?.combo_name &&
                            displayEnquireAboutThisPackage(
                              selectedVariant?.combo_name
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPagePopup;
