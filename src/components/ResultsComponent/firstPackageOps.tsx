import { memo, useEffect, useState } from 'react';

import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import SummaryDisplayMap from '../gooleMap/summaryDisplayMap';
import { isImageUrlValid } from '@/redux/services/general.api';
import { useSearchParams } from 'next/navigation';

export interface FirstPackageOpsProps {
  setIsEditRoofRestartOpen: (data: boolean) => void;
  isLoaded: any;
  drawRoofs: any;
  setOpenSaveEstimatePopup: (data: boolean) => void;
  openSaveEstimatePopup: boolean;
  setDisableScroll: (data: boolean) => void;
  setOpenRestartSurveyModal: (data: boolean) => void;
  quoteData: any;
  increaseNoOfPanels: () => void;
  decreaseNoOfPanels: () => void;
  disabledNoOfPanels: boolean;
  webLeadType: number;
}

const FirstPackageOps = (props: FirstPackageOpsProps) => {
  const {
    setIsEditRoofRestartOpen,
    drawRoofs,
    setOpenSaveEstimatePopup,
    setDisableScroll,
    setOpenRestartSurveyModal,
    quoteData,
    isLoaded,
    increaseNoOfPanels,
    decreaseNoOfPanels,
    disabledNoOfPanels,
    webLeadType,
  } = props;

  const [drawRoofsNew, setDrawRoofsNew] = useState([]);

  const [showMap, setShowMap] = useState(false);
  const [formattedPanelKWH, setFormattedPanelKWH] = useState(0);
  const [
    showMapPointerToShowMapAfterSavingImage,
    setShowMapPointerToShowMapAfterSavingImage,
  ] = useState(false);

  const handleEdit = () => {
    setIsEditRoofRestartOpen(true);
  };

  const handleRestartSurvey = () => {
    setOpenRestartSurveyModal(true);
    setDisableScroll(true);
  };

  useEffect(() => {
    setDrawRoofsNew(drawRoofs);
    setShowMap(false);
    setShowMapPointerToShowMapAfterSavingImage(false);
    let t = setTimeout(() => {
      setShowMap(true);
    }, 1200);
    return () => {
      clearTimeout(t);
    };
  }, [drawRoofs]);

  useEffect(() => {
    const solarSystemSize: number =
      quoteData?.comboData?.[0]?.selectedVariant?.solar_system_size || 0;
    console.log('solarSystemSize', solarSystemSize);
    setFormattedPanelKWH(solarSystemSize);
  }, [
    quoteData?.total_panels,
    quoteData?.comboData?.[0]?.selectedVariant?.solar_system_size,
  ]);

  const numberToWords = (n) => {
    const ones = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const tens = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];

    if (n === 0) return 'zero';
    if (n < 20) return ones[n];
    if (n < 100)
      return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
    if (n < 1000)
      return (
        ones[Math.floor(n / 100)] +
        ' hundred' +
        (n % 100 ? ' and ' + numberToWords(n % 100) : '')
      );
    return 'Number too large for this function';
  };

  const searchParams = useSearchParams();
  const updateMap = searchParams.get('updatemap');

  const [isValidImage, setIsValidImage] = useState(false);
  const [isValidImageSet, setIsValidImageSet] = useState(false);
  useEffect(() => {
    if (quoteData) {
      if (quoteData?.lead_image?.path && quoteData?.lead_status === 'CONFIRM' && updateMap !== "1") {
        const checkImage = async () => {
          const isValid = await isImageUrlValid(quoteData?.lead_image?.path);
          setIsValidImage(isValid);
          setIsValidImageSet(true);
        };
        checkImage();
      } else {
        setIsValidImageSet(true);
      }
    }
  }, [quoteData])

  return (
    <div>
      <Toaster />
      <div className="mb-60 w-100">
        <div className="row col-12 mainDivContainer">
          <div className="col-6 mapContainer">
            <div className="bgSky ridues padding24">
              <div className="d-flex justify-content-between align-items-center">
                <div className="font24Blue">{webLeadType === 1 ? "Your house" : "Your home"}</div>
                {quoteData?.lead_status !== 'CONFIRM' && (
                  <a className="link16Blue" onClick={() => handleEdit()}>
                    {webLeadType === 1 ? "Edit Roof Space" : "Edit your home"}
                  </a>
                )}
              </div>
              <div className="my-2 position-relative">
                {webLeadType === 1 ? (
                  <div className="panel">
                    <div className="row justify-content-between align-items-center">
                      <div className="col d-flex">
                        <div>
                          <Image
                            src="/images/pages/result/panel.png"
                            height={40}
                            width={40}
                            alt="panel"
                          />
                        </div>
                        <div className="font18Blue fontBold ms-2 ms-md-3">
                          {quoteData?.comboData?.[0]?.selectedVariant?.total_panels || 0} panels
                          <br />
                          <span className="font15Blue fontLight">
                            {formattedPanelKWH} kWh System
                          </span>
                        </div>
                      </div>
                      {quoteData?.lead_status !== 'CONFIRM' && (
                        <div className="col-auto d-flex">
                          <button
                            type="button"
                            className="countButton me-4"
                            style={{
                              cursor: `${quoteData?.total_panels <= 6 ||
                                quoteData?.lead_status === 'CONFIRM'
                                // || disabledNoOfPanels
                                ? 'not-allowed'
                                : 'pointer'
                                }`,
                            }}
                            disabled={
                              quoteData?.total_panels <= 6 ||
                              quoteData?.lead_status === 'CONFIRM'
                              || disabledNoOfPanels
                            }
                            onClick={() => {
                              decreaseNoOfPanels();
                            }}
                          >
                            <Image
                              height={3}
                              width={15}
                              alt="minus_image"
                              src="/images/pages/result/minus.png"
                            />
                          </button>
                          <button
                            type="button"
                            className="countButton position-relative"
                            style={{
                              cursor: `${quoteData?.total_panels >= 25 ||
                                quoteData?.lead_status === 'CONFIRM'
                                // || disabledNoOfPanels
                                ? 'not-allowed'
                                : 'pointer'
                                }`,
                            }}
                            disabled={
                              quoteData?.total_panels >= 25 ||
                              quoteData?.lead_status === 'CONFIRM'
                              || disabledNoOfPanels
                            }
                            onClick={() => {
                              increaseNoOfPanels();
                            }}
                          >
                            <Image
                              height={15}
                              width={15}
                              src="/images/pages/result/plus.png"
                              alt="plus_image"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  className={`miniMap 
                ${showMapPointerToShowMapAfterSavingImage
                      ? 'has_image'
                      : 'no_img'
                    } 
                ${showMap ? 'has_showMap' : 'no_showMap'} 
                ${drawRoofsNew ? 'has_drawRoofsNew' : 'no_drawRoofsNew'} 
                ${drawRoofs ? 'has_drawRoofs' : 'no_drawRoofs'} 
                `}
                >
                  {isLoaded && isValidImageSet && isValidImage && (
                    <Image
                      quality={100}
                      src={quoteData?.lead_image?.path}
                      alt="checkout badge"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '22px',
                      }}
                    />
                  )}
                  {isValidImageSet && (!isValidImage || !quoteData?.lead_image?.path) && isLoaded && drawRoofsNew && showMap && drawRoofs && (
                    <SummaryDisplayMap
                      {...{
                        allRoofs: drawRoofsNew,
                        quoteData: quoteData,
                        isLoaded: isLoaded,
                        roof: 'dmpatel',
                      }}
                      setShowMapPointerToShowMapAfterSavingImage={
                        setShowMapPointerToShowMapAfterSavingImage
                      }
                    />
                  )}
                  {quoteData?.lead_status !== 'CONFIRM' && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: '#E6E3E0',
                        zIndex:
                          showMap && showMapPointerToShowMapAfterSavingImage
                            ? -10
                            : 0,
                        display:
                          showMap && showMapPointerToShowMapAfterSavingImage
                            ? 'none'
                            : '',
                        borderRadius: '20px',
                      }}
                      className="map_loading pulse"
                    ></div>
                  )}
                </div>
              </div>

              {webLeadType === 1 ? (
                <div className="font17BlueLight">
                  <span className="fontMed">
                    Based on your roof space, we recommend{' '}
                    {quoteData?.recommendedPanels ?? 0} panels.
                  </span>{' '}
                  If you already know how many you require, use the buttons to
                  adjust the total.
                </div>
              ) : webLeadType === 2 ? (
                <div className="font17BlueLight">
                  <span className="fontMed">
                    Based on your{' '}
                    <b className="fontBold">
                      {quoteData?.solar_system_size || 0}
                    </b>
                    KWh system, we recommend{' '}
                    <b className="fontBold">
                      {quoteData.comboData
                        ? numberToWords(quoteData.comboData.length)
                        : 'zero'}
                    </b>{' '}
                    battery packages tailored to your energy needs.
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-6 col-lg-6 mx-auto my-3 mt-xl-0 mb-xl-0 btnDivContainer">
            <div
              className="nav nav-pills navPillsCustom row g-3 position-relative"
              id="myTab"
            >
              {quoteData?.lead_status !== 'CONFIRM' && (
                <div className="btnWrapper z-1">
                  <div className="nav-item col-auto col-xl" role="presentation">
                    <div className="animationBorder borderRadius20px z-0">
                      <div className="m1px position-rel z-1 w-100">
                        <button
                          className="nav-link newNavLink"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="home-tab-pane"
                          onClick={() => handleRestartSurvey()}
                        >
                          Restart Estimate
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="nav-item col-auto col-xl" role="presentation">
                    <div className="animationBorder borderRadius20px z-0">
                      <div className="m1px position-rel z-1 w-100">
                        <button
                          className="nav-link active"
                          id="profile-tab"
                          type="button"
                          role="tab"
                          aria-controls="profile-tab-pane"
                          onClick={() => {
                            setOpenSaveEstimatePopup(true);
                            setDisableScroll(true);
                          }}
                        >
                          Save Estimate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-11 d-flex img-wrapper result-page-jiffy-img">
                <div className="img-user-icon">
                  <Image
                    quality={100}
                    src="/images/Jiffy.webp"
                    alt="user-icon"
                    width={340}
                    height={385}
                  />
                </div>
                <div className="img-jiffy-icon">
                  <Image
                    quality={100}
                    src="/images/pages/result/jiffy-img.webp"
                    alt="jiffy"
                    className="jiffyImg"
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FirstPackageOps);
