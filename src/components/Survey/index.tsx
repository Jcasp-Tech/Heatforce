import { roofDetails } from "@/redux/services/types";
import { DEFAULTDATA, GOOGLE_API_KEY, libraries, QUESTION, ROOFDETAILSARRAY } from "@/utils/constants";
import { deepClone, sleep } from "@/utils/helpers";
import { useLoadScript } from "@react-google-maps/api";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import Trustpilot from "../homePageComponents/trustpilot/trustreview5star";
import AddEditRoofModal from "../modals/addEditRoofModal";
import DirectionValidationModal from "../modals/directionsValidationModal";
import EightEnterConsum from "./eightEnergyInput";
import ElevenYourLocation from "./elevenYourLocation";
import Fantastic from "./Fantastic";
import FifteenRoofPitch from "./fifteenRoofPitch";
import FiveOccupants from "./fiveOccupants";
import FourBedroom from "./fourBedroom";
import FourteenDrawMap from "./fourteenDrawMap";
import NineEnergyUse from "./nineEnergyDesc";
import OnePropertyOwner from "./onePropertyOwner";
import SevenEnergyConsum from "./sevenEnergyConsum";
import SeventeenRoofDirection from "./seventeenRoofDirection";
import SixEnergyUsage from "./sixEnergyUsage";
import SixteenRoofShading from "./sixteenRoofShading";
import WeCantHelp from "./sorryCantHelp";
import TenRoofSpaces from "./tenRoofSpace";
import ThirteenDrawAroundRoof from "./thirteenDrawAroundRoof";
import ThreeFloorCount from "./threePropertySize";
import TwelvePinLocation from "./twelvePinLocation";
import TwoPropertyType from "./twoPropertyType";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from "react-hot-toast";
import RequestHelpPopup from "../modals/requestHelpPopupModal/requestHelpPopup";
import LetsTalkItThroughPopup from "../modals/talkItThroughPopupModal/letsTalkItThroughPopup";
import NineteenWebLeadType from "./nineteenWebLeadType";
import SolarSystem from "./SolarSystem";


interface SurveyData {
    ownership: string;
    property: string;
    floors: number;
    bedrooms: number;
    occupants: number;
    energy_routine: string;
    energy_usage: number | null;
    annual_energy_usage: number;
    no_energy_usage: string;
    roof_space: number;
    postalCode: string;
    pinLocation: string;
    location: string;
    gMap: string;
    drawAround: string,
    roof_pitch: string;
    roofShading: number | Boolean | null;
    roof_direction: string;
    roofArea: string;
    lead_status: string;
    web_lead_type: number;
    solar_system_size: number;
}


const SurveyComponents = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [, setInfoModalOpen] = useState(false);
    const [, setGenericPopupOpen] = useState(false);
    const [, setGenericPopupText] = useState(' ');
    const [, setHelpInfoModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [, setNewDraw] = useState<any>(null);
    const [isAddEditRoof, setIsAddEditRoof] = useState(false);
    // const [, setIsLoading] = useState(false);
    const [directionValidationOpen, setDirectionValidationOpen] = useState(false);
    const [isValideRedraw, setIsValidateRedraw] = useState(false);
    const [disableMap, setDisableMap] = useState(false);
    // const [zoomed, setZoomed] = useState<number>(42);
    const [zoomed, setZoomed] = useState<number>(21);
    const [, setValidConfirmed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHelpPopup, setIsHelpPopup] = useState(false);
    const [isTalkItThrough, setIsTalkItThrough] = useState(false);
    const [disableScroll, setDisableScroll] = useState(false);
    const [weCanHelpVisible, setWeCanHelpVisible] = useState(false);
    const [back, setBack] = useState(false);
    const questionConst = QUESTION

    const [addEditRoofDetails, setAddEditRoofDetails] =
        useState<roofDetails | null>(null);


    const router = useRouter();
    const { postCode }: any = router.query;
    const [allQuestionsData, setAllQuestionsData] = useState<SurveyData>(DEFAULTDATA);
    const [currentPinLocation, setCurrentPinLocation] = useState({
        lat: 51.6199013,
        lng: -3.9825554,
    });
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY as string,
        libraries: libraries as any,
    });
    const [allRoofs, setAllRoofs] = useState<
        [roofDetails, roofDetails, roofDetails]
    >(ROOFDETAILSARRAY);

    const [, setWebLeadResponsData] = useState({
        randomstring: '',
        id: 0,
    });
    useEffect(() => {
        // // console.log("disableScroll",disableScroll)
    }, [disableScroll])

    const handleAddEditRoof = (
        roof: roofDetails | undefined,
        status: 'add' | 'edit' | 'delete'
    ) => {
        if (roof) {
            if (status === 'add') {
                setIsEdit(false);
                setIsAddEditRoof(true);
                setAddEditRoofDetails(roof);
            } else if (status === 'edit') {
                setIsEdit(true);
                setIsAddEditRoof(true);
                setAddEditRoofDetails(roof);
            } else if (status === 'delete') {
                setIsEdit(false);
                setIsAddEditRoof(false);

                const tmp = deepClone(allRoofs);
                const index = tmp.findIndex((item: any) => item.index === roof.index);
                tmp[index] = {
                    index: roof.index,
                    draw_points: null,
                    roofShading: null,
                    roof_pitch: null,
                    roof_direction: null,
                    suggested_roof_area: null,
                    suggested_panel: null,
                };
                setAllRoofs(tmp);
                setAddEditRoofDetails(null);
            }
        }
    };

    const handleRoofDetails = (data: roofDetails) => {
        if (data.index) {
            const tmp = deepClone(allRoofs);
            const index = tmp.findIndex((item: roofDetails) => item.index === data.index);  /////////////////////////// BREAKING CHANGE
            tmp[index] = data;
            setAllRoofs(tmp);
        }
    };

    const handleSeletedLocation = () => {
        handleChange(
            13,
            { roof_space: allQuestionsData.roof_space },
            QUESTION[13].id
        );
    };

    const handleScrollToDiv = (nextC: string, width: number, count: number = 0) => {
        let nextCElement = document.getElementById(nextC);
        const mobileElement = document.getElementById(`${nextC}_mobile`);
        // if (width < 768 && mobileElement) {
        if (width < 992 && mobileElement) {
            nextCElement = mobileElement;

        }
        let offset = 0;
        switch (nextC) {
            case 'twelvePinLocation':
                // offset = 40; // offset value is provided to prevent user from unwanted refreshing while being on this question.
                offset = 0;
                break;
            case 'fourteenDrawMap':
            case 'seventeenRoofDirection':
                offset = 0;
                break;
            default:
                offset = 0;
        }
        if (nextCElement) {
            scroller.scrollTo(nextC, {
                smooth: true,
                duration: 100,
                offset,
            });
        } else {
            count += 1;
            if (count >= 3) {
                return;
            }
            setTimeout(() => {
                handleScrollToDiv(nextC, width, count);
            }, 200);
        }
    };
    const handleChange = (ans: number, data: any, nextC: string) => {
        setAllQuestionsData((prevState: any) => {
            return {
                ...prevState,
                ...data,
            };
        });
        setQuestionNumber(ans);

        const tmp = deepClone(allRoofs);
        if (data?.roof_pitch) {
            tmp[0].roof_pitch = data.roof_pitch;
            setAllRoofs(tmp);
        }
        if (data?.roofShading) {
            tmp[0].roofShading = data.roofShading;
            setAllRoofs(tmp);
        }

        const width = window.innerWidth;
        if (ans === 15) {
            sleep(400);
        } else {
            sleep(200);
        }
        setTimeout(() => {
            handleScrollToDiv(nextC, width, 0);
        }, 100);

    }

    let AllRoof: any = []

    // const handleSaveRoofWebLead = async (
    //     remString: string,
    //     data: any,
    //     ind: number
    // ) => {
    //     if (webLeadResponsData) {
    //         try {
    //             // const saveData = await saveRoofWebLeadDataAPI(data);
    //             if (data) {
    //                 if (getSetroofs(allRoofs) === ind + 1) {
    //                     router.push(`/quote/results/${remString}`);
    //                     localStorage.setItem('saveQuotes', `/quote/results/${remString}`);
    //                     setIsLoading(false);
    //                 }
    //             }
    //         } catch (error) {
    //             setIsLoading(false);
    //         }
    //     }
    // };

    // const handleSaveQuoteData = async () => {
    //     setIsLoading(true);
    //     if (allQuestionsData) {
    //         const tmpAllQuestionData = deepClone(allQuestionsData);
    //         if (tmpAllQuestionData.energy_usage) {
    //             delete tmpAllQuestionData.no_energy_usage;
    //         } else {
    //             delete tmpAllQuestionData.annual_energy_usage;
    //         }
    //         if (localStorage.getItem('pinCenter')) {
    //             tmpAllQuestionData.pinLocation = JSON.parse(localStorage.getItem('pinCenter') || '{}') || {};
    //         }
    //         if (localStorage.getItem('findZoom')) {
    //             tmpAllQuestionData.findZoom = localStorage.getItem('findZoom')
    //         }
    //         delete tmpAllQuestionData.gMap;
    //         delete tmpAllQuestionData.roofArea;
    //         delete tmpAllQuestionData.roofShading;
    //         delete tmpAllQuestionData.roof_direction;
    //         delete tmpAllQuestionData.roof_pitch;

    //         try {
    //             // const res = await saveQuoteWebLeadDataAPI(tmpAllQuestionData);
    //             // if (res) {
    //             // setWebLeadResponsData({ randomstring: res.randomstring, id: res.id });

    //             for (let i = 0; i < allRoofs.length; i++) {
    //                 if (allRoofs[i]?.draw_points) {
    //                     const shade = allRoofs[i]?.roofShading === 1;
    //                     const tempRoofData = {
    //                         draw_points: JSON.stringify(allRoofs[i]?.draw_points),
    //                         roofShading: shade,
    //                         roof_pitch: allRoofs[i]?.roof_pitch,
    //                         roof_direction: allRoofs[i]?.roof_direction,
    //                         suggested_roof_area: allRoofs[i]?.suggested_roof_area,
    //                         suggested_panel: allRoofs[i]?.suggested_panel,
    //                         WebLead_id: {
    //                             id: '',
    //                         },
    //                     };
    //                     AllRoof.push(tempRoofData)
    //                 }
    //             }
    //             tmpAllQuestionData.roofData = AllRoof
    //             const res = await saveQuoteWebLeadDataAPI(tmpAllQuestionData);
    //             try {
    //                 if (res) {
    //                     setWebLeadResponsData({ randomstring: res.randomstring, id: res.id });

    //                     router.push(`/quote/results/${res.randomstring}`);
    //                     localStorage.setItem('saveQuotes', `/quote/results/${res.randomstring}`);
    //                     setIsLoading(false);
    //                 }
    //             } catch (error) {
    //                 setIsLoading(false);
    //             }
    //         } catch (error) {
    //             setIsLoading(false);
    //         }
    //     }
    // };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 767);
        // const checkMobile = () => setIsMobile(false);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        AOS.init();
    }, [isMobile])

    useEffect(() => {
        window.history.scrollRestoration = 'manual'
    }, []);

    useEffect(() => {
        if (disableScroll) {
            document.body.style.overflow = 'hidden';
            // document.body.style.touchAction = 'none';
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


    return (
        <>
            <div className="container-xxl"
                style={{ transition: 'all', transitionDuration: '1sec' }}
            >
                {(!isMobile || questionNumber <= 1) && !weCanHelpVisible &&
                    <OnePropertyOwner  {...{ handleChange, isMobile, setBack, back, allQuestionsData, setWeCanHelpVisible }} />
                }
                {(!isMobile || questionNumber === 1) && questionNumber <= 1 && allQuestionsData.ownership === 'tenant' && weCanHelpVisible && (
                    <WeCantHelp {...{ handleChange, allQuestionsData, questionNumber, isMobile, setBack, back, setWeCanHelpVisible }} />
                )}
                {(!isMobile || questionNumber <= 2) && !weCanHelpVisible && questionNumber >= 2 && allQuestionsData.ownership === 'owner' && (
                    <TwoPropertyType {...{ handleChange, allQuestionsData, questionNumber, isMobile, setBack, back, setWeCanHelpVisible }} />
                )}
                {questionNumber === 2 && allQuestionsData.property === 'flat' && weCanHelpVisible && (
                    <WeCantHelp {...{ handleChange, allQuestionsData, questionNumber, isMobile, setBack, back, setWeCanHelpVisible }} />
                )}
                {(!isMobile || questionNumber <= 3) && !weCanHelpVisible && questionNumber >= 3 && (
                    <ThreeFloorCount {...{ handleChange, allQuestionsData, isMobile, setBack, back, setWeCanHelpVisible }} />
                )}
                {questionNumber === 3 && weCanHelpVisible && (
                    <WeCantHelp {...{ handleChange, allQuestionsData, questionNumber, isMobile, setBack, back, setWeCanHelpVisible }} />
                )}
                {(!isMobile || questionNumber === 4) && !weCanHelpVisible && questionNumber >= 4 && (
                    <FourBedroom {...{ handleChange, allQuestionsData, isMobile, setBack, back }} />
                )}
                {(!isMobile || questionNumber === 5) && questionNumber >= 5 && (
                    <FiveOccupants {...{ handleChange, allQuestionsData, isMobile, setBack, back }} />
                )}
                {(!isMobile || questionNumber === 6) && questionNumber >= 6 && (
                    <SixEnergyUsage {...{ handleChange, allQuestionsData, isMobile, setBack, back }} />
                )}
                {(!isMobile || questionNumber === 7) && questionNumber >= 7 && (
                    <SevenEnergyConsum {...{ handleChange, allQuestionsData, isMobile, setBack, back, questionNumber }} />
                )}
                {questionNumber >= 1 && allQuestionsData.energy_usage === 1 && (
                    <EightEnterConsum {...{ handleChange, allQuestionsData, isMobile, setBack, back, questionNumber }} />
                )}
                {(!isMobile || questionNumber === 9) && questionNumber >= 9 && allQuestionsData.energy_usage === 0 && (
                    <NineEnergyUse {...{ handleChange, allQuestionsData, isMobile, setBack, back }} />
                )}
                {(!isMobile || questionNumber === 10) && questionNumber >= 10 && (
                    <NineteenWebLeadType {...{
                        handleChange, allQuestionsData, isMobile, setBack, back,
                    }} />
                )}
                {(!isMobile || questionNumber === 11) && questionNumber >= 11 && allQuestionsData.web_lead_type === 2 && (
                    <SolarSystem {...{
                        handleChange, allQuestionsData, isMobile, setBack, back, questionNumber
                    }} />
                )}
                {(!isMobile || questionNumber === 12) && questionNumber >= 12 && allQuestionsData.web_lead_type === 1 && (
                    <TenRoofSpaces {...{
                        handleChange, allQuestionsData, isMobile, setBack, back, setIsTalkItThrough,
                        setDisableScroll,
                    }} />
                )}

                {/* Two elements to counter issue with some components showing despite going back and changing options */}
                {(questionNumber >= 13 && !isMobile) && allQuestionsData.solar_system_size >= 0 && (
                    <div style={{ display: `${(!isMobile || questionNumber === 13) ? 'block' : 'none'}` }}>
                        <ElevenYourLocation {...{
                            handleChange, setCurrentPinLocation,
                            setInfoModalOpen,
                            setDisableMap,
                            allQuestionsData,
                            postCode, isMobile, setBack, back,
                            setIsHelpPopup,
                            setDisableScroll,
                        }} />
                    </div>
                )}

                {/* Two elements to counter issue with some components showing despite going back and changing options */}
                {(questionNumber >= 13 && !isMobile) && allQuestionsData.roof_space !== 0 && !allQuestionsData.solar_system_size && (
                    <div style={{ display: `${(!isMobile || questionNumber === 13) ? 'block' : 'none'}` }}>
                        <ElevenYourLocation {...{
                            handleChange, setCurrentPinLocation,
                            setInfoModalOpen,
                            setDisableMap,
                            allQuestionsData,
                            postCode, isMobile, setBack, back,
                            setIsHelpPopup,
                            setDisableScroll,
                        }} />
                    </div>
                )}
                {(questionNumber >= 1 && isMobile) && (
                    <div style={{ display: `${(!isMobile || questionNumber === 13) ? 'block' : 'none'}` }}>
                        <ElevenYourLocation {...{
                            handleChange, setCurrentPinLocation,
                            setInfoModalOpen,
                            setDisableMap,
                            allQuestionsData,
                            postCode, isMobile, setBack, back,
                            setIsHelpPopup,
                            setDisableScroll,
                        }} />
                    </div>
                )}
                {(!isMobile || questionNumber === 14) && questionNumber >= 14 && isLoaded && (
                    <TwelvePinLocation {...{
                        zoomed,
                        isLoaded,
                        currentPinLocation,
                        setCurrentPinLocation,
                        questionNumber,
                        handleChange,
                        setZoomed,
                        disableMap,
                        setDisableMap,
                        setGenericPopupOpen,
                        allQuestionsData,
                        setGenericPopupText, isMobile, setBack, back,
                        setIsHelpPopup,
                        setDisableScroll,
                    }} />
                )}
                {(!isMobile || questionNumber === 15) && questionNumber >= 15 && !allQuestionsData.solar_system_size && (
                    <ThirteenDrawAroundRoof {...{
                        handleChange, isMobile, setBack, back, setIsHelpPopup,
                        setDisableScroll,
                    }} />
                )}
                {(!isMobile || questionNumber === 15) && questionNumber >= 15 && allQuestionsData.solar_system_size && (
                    <div style={{ display: `${(!isMobile || questionNumber === 15) ? 'block' : 'none'}` }}>
                        <FourteenDrawMap {...{
                            handleChange,
                            zoomed,
                            roof: allRoofs[0],
                            handleRoofDetails,
                            isLoaded,
                            currentPinLocation,
                            handleSeletedLocation,
                            isValideRedraw,
                            setIsValidateRedraw,
                            setNewDraw,
                            allQuestionsData,
                            setHelpInfoModalOpen, isMobile, setBack, back,
                            setIsHelpPopup,
                            setDisableScroll,
                        }} />
                    </div>
                )}
                {(questionNumber >= 16 && !isMobile) && zoomed && isLoaded && allQuestionsData.drawAround !== '' && (
                    <div style={{ display: `${(!isMobile || questionNumber === 16) ? 'block' : 'none'}` }}>
                        <FourteenDrawMap {...{
                            handleChange,
                            zoomed,
                            roof: allRoofs[0],
                            handleRoofDetails,
                            isLoaded,
                            currentPinLocation,
                            handleSeletedLocation,
                            isValideRedraw,
                            setIsValidateRedraw,
                            setNewDraw,
                            allQuestionsData,
                            setHelpInfoModalOpen, isMobile, setBack, back,
                            setIsHelpPopup,
                            setDisableScroll,
                        }} />
                    </div>
                )}
                {(questionNumber >= 1 && isMobile) && zoomed && isLoaded && (
                    <div style={{ display: `${(!isMobile || questionNumber === 16) ? 'block' : 'none'}` }}>
                        <FourteenDrawMap {...{
                            handleChange,
                            zoomed,
                            roof: allRoofs[0],
                            handleRoofDetails,
                            isLoaded,
                            currentPinLocation,
                            handleSeletedLocation,
                            isValideRedraw,
                            setIsValidateRedraw,
                            setNewDraw,
                            allQuestionsData,
                            setHelpInfoModalOpen, isMobile, setBack, back,
                            setIsHelpPopup,
                            setDisableScroll,
                        }} />
                    </div>
                )}
                {(!isMobile || questionNumber === 17) && questionNumber >= 17 && (
                    <FifteenRoofPitch {...{ handleChange, isMobile, setBack, back, allQuestionsData }} />
                )}
                {(!isMobile || questionNumber === 18) && questionNumber >= 18 && (
                    <SixteenRoofShading {...{ handleChange, isMobile, setBack, back, allQuestionsData }} />
                )}
                {(!isMobile || questionNumber === 19) && questionNumber >= 19 && (
                    <SeventeenRoofDirection {...{
                        setDirectionValidationOpen,
                        zoomed,
                        isLoaded,
                        roof: allRoofs[0],
                        handleChange,
                        currentPinLocation,
                        handleRoofDetails,
                        isMobile: false,
                        allRoofs,
                        setGenericPopupOpen,
                        allQuestionsData,
                        setGenericPopupText, setBack, back,
                        setIsHelpPopup,
                        setDisableScroll,
                    }} />
                )}

                {(!isMobile || questionNumber === 20) && questionNumber >= 17 && allQuestionsData.roof_direction && (
                        <Fantastic
                            {...{
                                availableRoof: allQuestionsData.roof_space,
                                isLoaded,
                                // isLoading,
                                // handleSaveQuoteData,
                                allRoofs, isMobile, setBack, back,
                                handleAddEditRoof,
                                allQuestionsData,
                                AllRoof,
                                setWebLeadResponsData
                            }}
                        />
                )}

                {isAddEditRoof && addEditRoofDetails && (
                    <AddEditRoofModal
                        {...{
                            handleSaveRoof: (d) => {
                                handleRoofDetails(d);
                                if (d.roof_direction) {
                                    setIsAddEditRoof(false);
                                }
                            },
                            handleCancel: () => {
                                setIsAddEditRoof(false);
                                handleChange(20, {}, questionConst[20].id);
                            },
                            roof: addEditRoofDetails,
                            currentPinLocation,
                            allRoofs,
                            isEdit,
                            zoomed,
                            setGenericPopupOpen,
                            setGenericPopupText,
                            isMobile, setBack, back,
                            isAddEditRoof,
                            setIsHelpPopup,
                            setDisableScroll,
                        }}
                    />
                )}
                {directionValidationOpen && (
                    <DirectionValidationModal
                        {...{
                            handleChange,
                            visible: directionValidationOpen,
                            setDirectionValidationOpen,
                            setIsValidateRedraw,
                            setValidConfirmed,
                        }}
                    />
                )}

                {isHelpPopup && (<RequestHelpPopup
                    {
                    ...{
                        setIsHelpPopup,
                        setDisableScroll,
                    }
                    }

                />)}

                {isTalkItThrough && (
                    <LetsTalkItThroughPopup {...{
                        setIsTalkItThrough,
                        setDisableScroll,
                    }}
                    />)}
                <Toaster />
                <Trustpilot initialData={null} />
            </div>
        </>
    )
}
export default SurveyComponents;