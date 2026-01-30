import { useEffect, useState } from 'react';

import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import SummaryDisplayMap from '../gooleMap/summaryDisplayMap';


export interface BatteryOnlyFirstPackageOpsProps {
    seteditRoofRestartOpen: (data: boolean) => void;
    drawRoofs: any;
    isLoaded: boolean | undefined;
    setOpenSaveEstimatePopup: (data: boolean) => void;
    openSaveEstimatePopup: boolean;
    setDisableScroll: (data: boolean) => void;
    setOpenRestartSurveyModal: (data: boolean) => void;
    quoteData: any
    iseditRoofRestartOpen: boolean;
    totalPackages: any;
}

const BatteryOnlyFirstPackageOps = (props: BatteryOnlyFirstPackageOpsProps) => {

    const {
        seteditRoofRestartOpen,
        drawRoofs,
        isLoaded,
        setOpenSaveEstimatePopup,
        setDisableScroll,
        setOpenRestartSurveyModal,
        quoteData,
        totalPackages
    } = props;
    const [drawRoofsNew, setDrawRoofsNew] = useState([]);

    const leadData = quoteData?.leadData;

    // const [noOfPanels, setNoOfPanels] = useState(quoteData?.totalPanels>25?25:quoteData?.totalPanels);
    const [showMap, setShowMap] = useState(false);
    const [showMapPointerToShowMapAfterSavingImage, setShowMapPointerToShowMapAfterSavingImage] = useState(false);


    const handleEdit = () => {
        seteditRoofRestartOpen(true);
    };

    const handleRestartSurvey = () => {
        setOpenRestartSurveyModal(true);
        setDisableScroll(true);
    };

    useEffect(() => {

        setDrawRoofsNew(drawRoofs)
        setShowMap(false)
        setShowMapPointerToShowMapAfterSavingImage(false)
        let t = setTimeout(() => {
            setShowMap(true)
        }, 1200)
        return () => {
            clearTimeout(t)
        }
    }, [isLoaded, drawRoofs]);

    const numberToWords = (n) => {
        const ones = [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ];
        const tens = [
            '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ];

        if (n === 0) return 'zero';
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + numberToWords(n % 100) : '');
        return 'Number too large for this function';
    };

    return (
        <div>
            <Toaster />
            <div className="mb-60 w-100">
                <div className="row col-12 mainDivContainer">
                    <div className="col-12 mapContainer">
                        <div className="bgSky ridues padding24">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="font24Blue">Your home</div>
                                {quoteData?.leadData?.lead_status !== "CONFIRM" && <a className="link16Blue"

                                    onClick={() => handleEdit()}
                                >Edit your home</a>}
                            </div>
                            <div className="my-2 position-relative">
                                <div className='miniMap'>
                                    {isLoaded && drawRoofsNew && showMap && drawRoofs &&
                                        (<SummaryDisplayMap
                                            {...{
                                                isLoaded,
                                                allRoofs: drawRoofsNew,
                                                quoteData: quoteData,
                                                leadData: leadData,
                                                roof: 'dmpatel'
                                            }}
                                            setShowMapPointerToShowMapAfterSavingImage={setShowMapPointerToShowMapAfterSavingImage}
                                        />)
                                    }
                                    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, background: '#E6E3E0', zIndex: showMap && showMapPointerToShowMapAfterSavingImage ? -10 : 0, display: showMap && showMapPointerToShowMapAfterSavingImage ? 'none' : '', borderRadius: "20px" }} className='map_loading pulse' ></div>
                                </div>
                            </div>
                            <div className="font17BlueLight">
                                <span className="fontMed">Based on your <b className='fontBold'>{quoteData?.leadData?.solar_system_size}</b>KWh system, we recommend <b className='fontBold'>{totalPackages ? numberToWords(totalPackages) : 'two'}</b> battery packages tailored to your energy needs.</span>
                            </div>
                        </div>
                    </div>
                </div>
                {quoteData?.leadData?.lead_status !== "CONFIRM" && (
                    <div className="row col-12 mt-4">
                        <div className="col-12 d-flex justify-content-center btnDivContainer">
                            <div className="nav nav-pills navPillsCustom row g-3" id="myTab">
                                <div className='btnWrapper' style={{ position: 'relative', left: 'auto', display: 'flex', gap: '20px' }}>
                                    <div className="nav-item col-auto col-xl" role="presentation">
                                        <div className='animationBorder borderRadius20px z-0'>
                                            <div className='m1px position-rel z-1 w-100'>
                                                <button className="nav-link newNavLink" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                                                    type="button" role="tab" aria-controls="home-tab-pane"
                                                    onClick={() => handleRestartSurvey()}
                                                >Restart Estimate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-item col-auto col-xl" role="presentation">
                                        <div className='animationBorder borderRadius20px z-0'>
                                            <div className='m1px position-rel z-1 w-100'>
                                                <button className="nav-link active" id="profile-tab"
                                                    type="button" role="tab" aria-controls="profile-tab-pane"
                                                    onClick={() => {
                                                        setOpenSaveEstimatePopup(true); setDisableScroll(true)
                                                    }}
                                                    style={{ whiteSpace: 'nowrap' }}
                                                >Save Estimate</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BatteryOnlyFirstPackageOps