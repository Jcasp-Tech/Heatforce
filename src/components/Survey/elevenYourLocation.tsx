import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/modulesStyles/survey.module.scss";
import { QUESTION } from "@/utils/constants";
import { AutoComplete, Spin } from "antd";
// import { getLocationAPI, postcodeSearchAPI } from '@/redux/services/common.api';
import Image from "next/image";
import {
  getLocationAPI,
  postcodeSearchAPI,
  retreiveLocationAPI,
} from "@/redux/services/general.api";
import toast from "react-hot-toast";
// import { zapprChatBotOpen } from '@/utils/helpers';
// import {  show } from '@intercom/messenger-js-sdk';

export interface ElevenYourLocationProps {
  handleChange: (d: any, data: any, nextC: any) => void;
  allQuestionsData?: any;
  setCurrentPinLocation: (d: any) => void;
  setInfoModalOpen: (d: any) => void;
  setDisableMap: (d: any) => void;
  setIsHelpPopup: (d: boolean) => void;
  setDisableScroll: (d: boolean) => void;
  // postCode?: string | undefined;
  isMobile: boolean;
  setBack: (d: boolean) => void;
  back: boolean;
}

const ElevenYourLocation = (props: ElevenYourLocationProps) => {
  const {
    handleChange,
    setCurrentPinLocation,
    setDisableMap,
    isMobile,
    setBack,
    back,
    setIsHelpPopup,
    setDisableScroll,
    allQuestionsData,
  } = props;
  const questionConst = QUESTION;

  const questionIndex = 13; //Change index to 13 from 11

  const [addressList, setAddressList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [PostCode] = useState(() => {
    const storedValue = window.localStorage.getItem("postcode");
    return storedValue ? storedValue.toUpperCase() : "";
  });
  const [value, setValue] = useState("");
  const [addressId, setAddressId] = useState<any>(null);
  const [isSubmit, setSubmit] = useState(false);
  const autoCompleteRef = useRef<any>(null);
  // const handleArrowClick = () => {
  //   if (autoCompleteRef.current) {
  //     autoCompleteRef.current.focus(); // Focus on AutoComplete input
  //   }
  // };

  const onBack = () => {
    setBack(true);
  };

  const handleBackSpecial = () => {
    if (
      allQuestionsData.web !== null &&
      allQuestionsData?.web_lead_type !== ""
    ) {
      if (allQuestionsData.web_lead_type === 1) {
        handleChange(
          questionIndex - 1,
          { solar_system_size: allQuestionsData.solar_system_size },
          questionConst[questionIndex - 1].id
        );
      } else {
        handleChange(
          questionIndex - 2,
          { solar_system_size: allQuestionsData.solar_system_size },
          questionConst[questionIndex - 2].id
        );
      }
    }
  };

  const getAddressWithPostalCode = async (
    code: any,
    isPostCodeFirstParam: any,
    fetchNew: boolean = false
  ) => {
    setIsLoading(true);
    try {
      const tmpAdd: any = [];
      const res = await postcodeSearchAPI(code, "", fetchNew);
      if (res && res?.Items) {
        // console.log("postcodeSearchAPIMain: ", res);

        // res?.suggestions?.map((itm: any) => {
        //   tmpAdd.push({
        //     value: itm.id,
        //     label: itm.address,
        //   });
        //   return itm;
        // });

        // if (res?.suggestions?.length > 0) {
        //   setAddressList(tmpAdd);
        //   if (isPostCodeFirstParam) {
        //     setAddressId(tmpAdd[0].value);
        //     setValue(tmpAdd[0].label);
        //   }
        // } else {
        //   setAddressList([]);
        // }

        // Filtering Addresses for Type="Container"

        let tempAddArr = await Promise.all(
          res.Items.map(async (itm: any) => {
            if (itm.Type === "Container") {
              const ContainerIdRes = await postcodeSearchAPI(
                code,
                itm.Id,
                true
              );
              // console.log("postcodeSearchAPIContainer: ", ContainerIdRes);
              return ContainerIdRes?.Items;
            } else {
              return itm;
            }
          })
        );

        tempAddArr = tempAddArr.flat();

        console.log("tempAddArr: ", tempAddArr);

        //Filtering all address and remove dubplicates and give single array with unique address list
        const filteredAddress = tempAddArr.filter(
          (item, index, array) =>
            array.findIndex((x) => x.Text === item.Text) === index
        );

        console.log("filteredAddress: ", filteredAddress);

        filteredAddress.map((itm: any) => {
          tmpAdd.push({
            value: itm.Id,
            label: itm.Text,
          });
          return itm;
        });

        if (tmpAdd.length > 0) {
          // console.log("tmpAdd", tmpAdd);
          setAddressList(tmpAdd);
          if (isPostCodeFirstParam) {
            setAddressId(tmpAdd[0].value);
            setValue(tmpAdd[0].label);
          }
        } else {
          setAddressList([]);
        }
      }

      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 100);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  const handleVenueChange = (data: any) => {
    setAddressId(null);
    setSubmit(false);
    setValue(data.toUpperCase());
    getAddressWithPostalCode(data.toUpperCase(), false);
  };

  const getMapCenter = async () => {
    if (addressId) {
      try {
        let locationArg: { id: string; location: string; country: string };
        let retrieveLocationRes = await retreiveLocationAPI(addressId);

        if (retrieveLocationRes && retrieveLocationRes.Items) {
          retrieveLocationRes = retrieveLocationRes.Items.filter(
            (addr: any) => addr.Language === "ENG"
          );
          console.log("retrieveLocationRes:", retrieveLocationRes[0]);

          let {
            Line1,
            Line2,
            City,
            PostalCode,
            CountryName,
            CountryIso2,
            CountryIso3,
          } = retrieveLocationRes[0];

          locationArg = {
            id: addressId,
            location: `${
              Line1 ? Line1 + ", " : ""
            }${City}, ${PostalCode}, ${CountryName}`,
            country: CountryIso2 || CountryIso3,
          };
          // console.log("locationArg: ", locationArg);

          let locationRes = await getLocationAPI(locationArg);

          console.log("locationRes: ", locationRes.Items);

          if (
            locationRes &&
            locationRes.Items &&
            locationRes.Items.length > 0
          ) {
            setCurrentPinLocation({
              lat: locationRes.Items[0].Latitude,
              lng: locationRes.Items[0].Longitude,
            });
            handleChange(
              questionIndex + 1,
              { postalCode: PostalCode, location: value },
              questionConst[questionIndex + 1].id
            );
            setDisableMap(false);
          } else {
            locationArg = {
              id: addressId,
              location: ` ${
                Line2 ? Line2 + ", " : ""
              }${City}, ${PostalCode}, ${CountryName}`,
              country: CountryIso2 || CountryIso3,
            };

            let locationLin2Res = await getLocationAPI(locationArg, true);
            console.log("locationLin2Res: ", locationLin2Res.Items);
            if (
              locationLin2Res &&
              locationLin2Res.Items &&
              locationLin2Res.Items.length > 0
            ) {
              setCurrentPinLocation({
                lat: locationLin2Res.Items[0].Latitude,
                lng: locationLin2Res.Items[0].Longitude,
              });
              handleChange(
                questionIndex + 1,
                { postalCode: PostalCode, location: value },
                questionConst[questionIndex + 1].id
              );
              setDisableMap(false);
            } else {
              // throw new Error(
              //   "getLocationAPI: Error occured during fetching longitude and latitude"
              // );
              toast.error(
                "Error occured during fetching address, Try other postcode"
              );
            }
          }
        } else {
          toast.error(
            "Error occured during fetching address, Try other postcode"
          );
        }
      } catch (error) {
        console.log(error);
        throw new Error("Failed to get map center");
      }
    }
  };

  const onSelect = (data: string, optvalue: any) => {
    if (data) {
      setAddressId(data);
      setValue(optvalue.label);
    }
  };

  useEffect(() => {
    if (PostCode) {
      console.log("getAddressWithPostalCode: First time ");
      getAddressWithPostalCode(PostCode, false, true);
      setValue(PostCode);
    }
  }, [PostCode]);

  return (
    <div
      data-aos={isMobile ? (back ? "fade-left" : "fade-right") : ""}
      className={`${styles.surveyContainer}`}
      id={`${questionConst[questionIndex].id}`}
    >
      <div>
        <div className={`${styles.questionHeader}`}>
          {" "}
          {questionConst[questionIndex].qhead}
        </div>
        <p className={`${styles.questionText}`}>
          {questionConst[questionIndex].qtxt}
        </p>
      </div>
      <div id="search-location" className={styles.inputFormDiv}>
        <div
          className={`${styles.inputWrapper}  ant-select-selector ant-select-focused`}
        >
          <AutoComplete
            ref={autoCompleteRef}
            options={addressList}
            onSelect={(val, option) => onSelect(val, option)}
            onSearch={(text) => handleVenueChange(text)}
            placeholder="Enter postcode"
            className={`${styles.numberInput} autocomplete relative fbqTrackFindLocationChange `}
            value={value}
            notFoundContent={isLoading ? <Spin /> : "No matches found"}
          >
            {/* <div className="" onClick={handleArrowClick} style={{ position: 'absolute',height:'50px',width:"50px",right:"0",transform:"translatey(-50%)",display:'flex',top:"50%",background:'red',backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover" }}  ></div> */}
          </AutoComplete>

          <button
            type="submit"
            className={`${styles.nextButtonDiv} fbqTrackFindLocationClick`}
            onClick={() => {
              getMapCenter();
              setSubmit(true);
            }}
          >
            <div className={`${styles.nextButtonTextDark} `}>Search</div>
          </button>
        </div>
      </div>
      <div>
        <div className="mt-3">
          {!addressId && isSubmit && (
            <div className="mb-3 d-none-mob d-flex justify-content-center align-items-center text-center h5">
              <p className="m-0 text-danger">
                Please provide an address with a valid postcode
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.locationInfoBox}`}>
        <div
          className={`${styles.backButtonDivSmall}`}
          onClick={() => {
            setIsHelpPopup(true), setDisableScroll(true);
          }}
        >
          <div>
            <div>
              <Image
                quality={100}
                src="/images/question.svg"
                width={21}
                height={24}
                alt="question"
                className={`${styles.questionIcon}`}
              />
            </div>
          </div>
          <div
            onClick={() => {
              // show();3
              // zapprChatBotOpen()
            }}
          >
            <div className={`${styles.backButtonTextLight}`}>
              {" "}
              Can &apos; t find your address ?
            </div>
            <div className={`${styles.backButtonTextDark}`}> Request Help</div>
          </div>
        </div>
        <div
          className={`${styles.backButtonDivSmall} mobile-view `}
          onClick={() => {
            handleBackSpecial(), onBack();
          }}
        >
          <div>
            <div>
              <Image
                quality={100}
                src="/images/backIcon.svg"
                width={35}
                height={35}
                alt="back"
                className={`${styles.backIcon}`}
              />
            </div>
          </div>
          <div>
            <div className={`${styles.backButtonTextLight}`}>
              {" "}
              Made a mistake ?
            </div>
            <div className={`${styles.backButtonTextDark}`} onClick={onBack}>
              {" "}
              Go Back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevenYourLocation;
