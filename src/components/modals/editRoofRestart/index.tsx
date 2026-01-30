/* eslint-disable import/no-extraneous-dependencies, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import { Divider, Modal } from 'antd';
import { useRouter } from 'next/router';

import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { InfoCircleIcon } from '@/components/theme/icons/infoCircleIcon';
import {
  saveRoofDetailsAPI,
  updateErrorLogs
} from '@/redux/services/general.api';
import type { roofDetails } from '@/redux/services/types';
import { ROOFDETAILSARRAY } from '@/utils/constants';
import {
  deepClone,
  getOrdinal
} from '@/utils/helpers';

import AddEditRoofModal from '../addEditRoofModal';
import modalStyle from './restartModal.module.scss';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setPointers } from '@/redux/slices/pointers/pointerReducer';

export interface RestartModalProps {
  visible: boolean;
  setIsEditRoofRestartOpen: (data: boolean) => void;
  quoteData: any;
  getResults: any;
}

// interface Roof {
//   id: number;
//   draw_points: string;
//   roofShading: null | number;
//   roof_pitch: string | null;
//   roof_direction: string;
//   suggested_roof_area: string;
//   suggested_panel: number;
// }
const EditRoofRestartModal = (props: RestartModalProps) => {
  const { setIsEditRoofRestartOpen, visible, quoteData, getResults } = props;
  // const [roofDetails, setRoofDetails] = useState<roofDetails[]>([]);
  const [, setGenericPopupOpen] = useState(false);
  const [, setGenericPopupText] = useState(' ');
  const [closeText, setCloseText] = useState('Close');
  // const [rawResult, setRawResult] = useState<any>({});
  const [webLeadType, setWebLeadType] = useState<any>();

  const router = useRouter();

  const pinLocation = { lat: parseFloat(quoteData?.pinLocation_lat || 51.6199013), lng: parseFloat(quoteData?.pinLocation_lng || -3.9825554) }

  const [currentPinLocation, setCurrentPinLocation] = useState<any>(pinLocation);

  const [zoomed] = useState<any>(parseFloat((quoteData?.findZoom) || 18.5));

  const [isMobile,] = useState(false);
  const [back, setBack] = useState(false);
  const [, setIsHelpPopup] = useState(false);
  const [, setDisableScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clearAllState, setClearAllState] = useState(0);

  const [isEdit, setIsEdit] = useState(false);
  // const [panelCount, setPanelCount] = useState(0);
  // const [noOfRoofs, ] = useState(roofSpace[quoteData.roof_space] || '1');//necessary dont remove this
  const [isAddEditRoof, setIsAddEditRoof] = useState(false);
  const [isProcessingComplete, setIsProcessingComplete] = useState(0);
  const [addEditRoofDetails, setAddEditRoofDetails] =
    useState<roofDetails | null>(null);
  const [validatePanel, setValidatePanel] = useState(false);
  const [allRoofs, setAllRoofs] = useState<[roofDetails, roofDetails, roofDetails]>(ROOFDETAILSARRAY);
  const dispatch = useDispatch()


  const handleAddEditRoof = (
    roof: roofDetails | undefined,
    status: 'add' | 'edit' | 'delete' | 'clear'
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
      } else if (status === 'clear') {
        setIsEdit(false);
        setIsAddEditRoof(true);
        setAddEditRoofDetails(roof);
      }
    }
  };

  const handleChange = () => { };

  const onProcessingComplete = () => {
    setIsProcessingComplete(isProcessingComplete + 1);
  };

  const getRoofDetails = async () => {
    const randomString: any = quoteData?.randomstring;
    if (randomString !== null && quoteData) {

      const newAllRoofs: [roofDetails, roofDetails, roofDetails] = [
        quoteData.roofData?.[0] || allRoofs[0],
        quoteData.roofData?.[1] || allRoofs[1],
        quoteData.roofData?.[2] || allRoofs[2],
      ];
      setAllRoofs(newAllRoofs);
      if (!currentPinLocation?.let) {
        if (quoteData.pinLocation_lat && quoteData.pinLocation_lng) {
          setCurrentPinLocation({ lat: parseFloat(quoteData.pinLocation_lat), lng: parseFloat(quoteData.pinLocation_lng) });
        }
      }

      setWebLeadType(quoteData?.web_lead_type);

    }
  };


  const handleRestartQuote = () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      localStorage.removeItem('saveQuotes');
      localStorage.removeItem('postcode');
      localStorage.removeItem('WebLeadType');
      setIsEditRoofRestartOpen(false);
      router.push('/survey');
    }, 500)
  };

  const handleClose = async () => {
    if (closeText === 'Save') {
      setLoading(true)
      const tostId = toast.loading('Saving changes,Please Wait...')
      // setIsEditRoofRestartOpen(false);

      const allPromise = allRoofs.map(async (roof) => {
        if (roof.draw_points || roof.id) {
          try {
            await saveRoofDetailsAPI({
              id: roof.id,
              draw_points: roof.draw_points ? `"${JSON.stringify(roof.draw_points).replace(
                /"/g,
                '\\"'
              )}"` : null,
              roofShading: typeof roof.roofShading === 'boolean' ? roof.roofShading : !!roof.roofShading,
              roof_pitch: roof.roof_pitch,
              roof_direction: roof.roof_direction,
              suggested_roof_area: roof.suggested_roof_area?.toString(),
              suggested_panel: roof.suggested_panel,
              WebLead_id: {
                id: quoteData.id,
                // log: rawResult.log,
                // bettery_kWh: rawResult.betry_kWh,
              },
            });
          } catch (error) {
            console.error(`Error`);
          }
        }
      });
      await Promise.all(allPromise).then(async () => {
        // localStorage.removeItem('WebLeadType');
        // localStorage.removeItem('saveQuotes');

        if (getResults && quoteData?.randomstring) {
          await getResults(quoteData?.randomstring);
          toast.success('Your changes have been saved successfully', { id: tostId })
        } else {
          await updateErrorLogs({
            module_name: "SummaryDisplayMap",
            record_id: quoteData?.id,
            logs: { "line": "185", "function": "editRoofRestart", "msgLog": { msg: "getResults Error window.location.reload()" } },
          })
          window.location.reload();
        }
      }).catch((error) => {
        console.error(`Error`, error);
        toast.error('Error Occurred Please Try Again', { id: tostId })
      }).finally(() => {
        setLoading(false)
        setIsEditRoofRestartOpen(false);
        dispatch(setPointers({ mapDrawingModePointer: 'edited' }))
      });
    } else {
      setIsEditRoofRestartOpen(false);
    }
  };
  const handleRoofDetails = (data: roofDetails) => {
    if (data.index) {
      const tmp = deepClone(allRoofs);
      const index = tmp.findIndex((item: any) => item.index === data.index);
      tmp[index] = data;
      setAllRoofs(tmp);
    }
  };

  const clearAllRoof = async () => {
    setClearAllState(0);
    setAllRoofs((prev) => {
      const tmp = deepClone(prev);
      return tmp.map((roof: roofDetails) => {
        return {
          index: roof.index,
          draw_points: null,
          roofShading: null,
          roof_pitch: null,
          roof_direction: null,
          suggested_roof_area: null,
          suggested_panel: null,
          id: roof.id
        }
      })

    })
    setCloseText('Save');
  };


  useEffect(() => {
    getRoofDetails();
  }, []);
  useEffect(() => {
    let panelCount = 0;
    allRoofs.map((d: roofDetails) => {
      if (d.suggested_panel) {
        panelCount += d.suggested_panel;
      }
      return d;
    });
    if (panelCount >= 6) {
      setValidatePanel(false);
    } else {
      setValidatePanel(true);
    }
  }, [allRoofs])
  const handleCleanRoof = (roof: roofDetails) => {
    setAllRoofs((prev) => {
      const tmp = deepClone(prev);
      const index = tmp.findIndex((item: any) => item.index === roof.index);
      tmp[index] = {
        index: roof.index,
        draw_points: null,
        roofShading: null,
        roof_pitch: null,
        roof_direction: null,
        suggested_roof_area: null,
        suggested_panel: null,
        id: roof.id
      };
      return tmp
    })
    setCloseText('Save');
  }

  return (
    <>
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
              handleChange();
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
            setCloseText,
            onProcessingComplete,
          }} />
      )}
      <Modal
        className={`${modalStyle.infoContainer}`}
        title=""
        centered
        open={visible}
        keyboard={false}
        maskClosable={false}
        onOk={() => setIsEditRoofRestartOpen(false)}
        onCancel={() => setIsEditRoofRestartOpen(false)}
        width={500}
        footer={[]}

      >
        <div
          id="info-installations"
          className=" mt-2 d-flex flex-column justify-content-center align-items-center "
        >
          <h1 className="yp fw-bold">
            {' '}
            <InfoCircleIcon /> Edit Roof
          </h1>
          <p className="qyp mb-3">{webLeadType === 2 ? "Would you like to edit your roof?" : "Which roof would you like to edit?"}</p>
          <Divider />

          <div>
            {allRoofs.map((roof, idx) => (
              <div
                className={webLeadType === 1 ? `qyp mb-3` : `qyp mb-1`}
                key={roof.id}
                onClick={() => { setCloseText('Save'); setClearAllState(1) }}
              >
                <div className="custom-checkbox" />
                <div
                  className="roof-label d-flex  justify-content-center align-items-center "
                  style={{ width: '100%', gap: '8px' }}
                  onClick={() =>
                    handleAddEditRoof(roof, 'edit')
                  }
                >
                  {roof.draw_points ? <div className='clickable-roof d-flex align-items-center' style={{ gap: '8px' }}>
                    {`Roof ${webLeadType === 2 ? '' : idx + 1} - Approx area of 
                  ${allRoofs[idx]?.suggested_roof_area?.toFixed(0)}m², 
                  ${webLeadType === 2 ? `${quoteData?.solar_system_size} kWh` : `${allRoofs[idx]?.suggested_panel?.toFixed(0)}`} `} {allRoofs[idx]?.suggested_panel && <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="pen-to-square"
                      className="svg-inline--fa fa-pen-to-square "
                      style={{ width: '1em', height: '1em' }}
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                      />
                    </svg>}  {roof.draw_points && <DeleteIcon sx={{ color: 'red' }} onClick={(e) => { e.stopPropagation(); handleCleanRoof(roof) }} />}
                  </div> :
                    (webLeadType === 1 ?
                      <div className='animationBorder borderRadius25px my-3 z-0'>
                        <div className='m1px position-rel z-1 w-100'>
                          <button
                            type="button"
                            style={{ background: '#EFEFEF' }}
                            className="add-dash p-2 p-xl-3 w-100  d-flex align-items-center"

                          >
                            <div className="d-flex text-dark align-items-center gap-3 w-100">
                              <div className="text-dark roof-action color-black-background color-white d-flex align-items-center justify-content-center">
                                <svg
                                  fill="#000000"
                                  width="32px"
                                  height="32px"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <g id="SVGRepo_iconCarrier">
                                    <path d="m21.484 11.125-9.022-5a1 1 0 0 0-.968-.001l-8.978 4.96a1 1 0 0 0-.003 1.749l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749zm-9.461 4.73-6.964-3.89 6.917-3.822 6.964 3.859-6.917 3.853z" />
                                    <path d="M12 22a.994.994 0 0 0 .485-.126l9-5-.971-1.748L12 19.856l-8.515-4.73-.971 1.748 9 5A1 1 0 0 0 12 22zm8-20h-2v2h-2v2h2v2h2V6h2V4h-2z" />
                                  </g>
                                </svg>
                              </div>
                              <div>
                                Add your  <span>{`${idx + 1}`}<sup>{`${getOrdinal(idx + 1)}`}</sup></span> roof space
                              </div>
                            </div>
                          </button>

                        </div>
                      </div>
                      :
                      (
                        idx === 0 && allRoofs[0].draw_points === null && webLeadType === 2 && (
                          <div className='animationBorder borderRadius25px my-3 z-0'>
                            <div className='m1px position-rel z-1 w-100'>
                              <button
                                type="button"
                                style={{ background: '#EFEFEF' }}
                                className="add-dash p-2 p-xl-3 w-100  d-flex align-items-center"
                              >
                                <div className="d-flex text-dark align-items-center gap-3 w-100">
                                  <div className="text-dark roof-action color-black-background color-white d-flex align-items-center justify-content-center">
                                    <svg
                                      fill="#000000"
                                      width="32px"
                                      height="32px"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <g id="SVGRepo_iconCarrier">
                                        <path d="m21.484 11.125-9.022-5a1 1 0 0 0-.968-.001l-8.978 4.96a1 1 0 0 0-.003 1.749l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749zm-9.461 4.73-6.964-3.89 6.917-3.822 6.964 3.859-6.917 3.853z" />
                                        <path d="M12 22a.994.994 0 0 0 .485-.126l9-5-.971-1.748L12 19.856l-8.515-4.73-.971 1.748 9 5A1 1 0 0 0 12 22zm8-20h-2v2h-2v2h2v2h2V6h2V4h-2z" />
                                      </g>
                                    </svg>
                                  </div>
                                  <div>
                                    Add your <span>{`1`}<sup>{`${getOrdinal(1)}`}</sup></span> roof space
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        )
                      )
                    )
                  }
                </div>
              </div>
            ))}
          </div>

          {webLeadType === 1 &&
            validatePanel && !isAddEditRoof && clearAllState !== 0 && (
              <div className="unfortunately-message">
                <InfoCircleIcon style={{ alignSelf: "baseline", paddingTop: "6px" }} /> {`Unfortunately, we can only provide quotes with a
            minimum of 6 panels, Please Add (or) Edit your roof and try again.`}
              </div>
            )}

          <div className=" w-100 d-flex justify-content-between align-items-center mt-2">
            <button
              type="button"
              className="Restart-button m-1"
              onClick={() => handleRestartQuote()}
            >
              Restart
            </button>
            <button
              type="button"
              className="Restart-button m-1"
              onClick={() => clearAllRoof()}
            >
              {webLeadType === 2 ? "Clear" : "Clear All"}
            </button>
            <button
              type="button"
              style={{ cursor: `${!validatePanel ? 'pointer' : 'not-allowed'}` }}
              disabled={validatePanel || loading}
              className="Restart-button m-1"
              onClick={() => handleClose()}
            >
              {closeText}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditRoofRestartModal;
