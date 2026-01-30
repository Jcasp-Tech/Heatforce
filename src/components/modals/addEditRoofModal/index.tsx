import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import GMapAddEdit from '@/components/gooleMap/gMapAddEdit';
import type { roofDetails } from '@/redux/services/types';
import { deepClone } from '@/utils/helpers';

import DirectionValidationModal from '../directionsValidationModal';
import modalStyle from './addEditRoof.module.scss';
import FifteenRoofPitch from '@/components/Survey/fifteenRoofPitch';
import SixteenRoofShading from '@/components/Survey/sixteenRoofShading';
import SeventeenRoofDirection from '@/components/Survey/seventeenRoofDirection';

export interface AddEditRoofModalProps {
  roof: roofDetails;
  allRoofs: roofDetails[];
  currentPinLocation: any;
  handleSaveRoof: (data: roofDetails) => void;
  handleCancel: (data: any) => void;
  isEdit: boolean;
  zoomed: number;
  setGenericPopupOpen: (data: any) => void;
  setGenericPopupText: (data: any) => void;
  setCloseText?: (d: string) => void;
  setIsHelpPopup: (d: boolean) => void;
  onProcessingComplete?: (data: any) => void;
  setDisableScroll: (d: boolean) => void;
  // setIsEdit: (data: any) => void;
}

const AddEditRoofModal = (props: AddEditRoofModalProps) => {
  const {
    handleSaveRoof,
    allRoofs,
    roof,
    currentPinLocation,
    handleCancel,
    isEdit,
    zoomed,
    setCloseText,
    setDisableScroll,
    setGenericPopupOpen,
    setGenericPopupText,
    onProcessingComplete,
    setIsHelpPopup
  } = props;

  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [specificSelectedRoof, setSpecificSelectedRoof] = useState<roofDetails>(
    deepClone(roof)
  );

  const [directionValidationOpen, setDirectionValidationOpen] = useState(false);
  const [isValideRedraw, setIsValidateRedraw] = useState(false);
  const [isValidConfirmed, setValidConfirmed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [newDraw, setNewDraw] = useState<any>(null);
  const [isModalPopup] = useState(true);

  const setMySelectedRoof = (data: roofDetails) => {

    setSpecificSelectedRoof(data);
    data.roof_direction = null;
    handleSaveRoof(data);
  };

  const handleChange = (_ans: any, data: any, _nextC: any) => {
    if (data?.gMap) {
      // specificSelectedRoof.draw_points = data.gMap
      setQuestionNumber((prevKey) => prevKey + 1);
    }

    if (data?.roof_pitch) {
      specificSelectedRoof.roof_pitch = data.roof_pitch;
      setQuestionNumber((prevKey) => prevKey + 1);
    }

    if ((data?.roofShading === 1 || data?.roofShading === 0)) {
      specificSelectedRoof.roofShading = data.roofShading;
      setQuestionNumber((prevKey) => prevKey + 1);
      setTimeout(() => {
        const element = document.getElementById('roof-directionss');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }

    if (data?.roof_direction && data?.roof_direction !== 'direction') {
      specificSelectedRoof.roof_direction = data.roof_direction;
      handleSaveRoof(specificSelectedRoof);
    }
    setSpecificSelectedRoof(specificSelectedRoof)
  };

  const handleRoofDetails = () => {};

  const handleClearRoof = () => {
    specificSelectedRoof.draw_points = null;
    setSpecificSelectedRoof(specificSelectedRoof);
  };

  useEffect(() => {
    if (isValideRedraw) {
      setQuestionNumber(0);
      handleClearRoof();
    }
  }, [isValideRedraw]);

  useEffect(() => {
    if (isValidConfirmed) {
      handleSaveRoof(specificSelectedRoof);
      setValidConfirmed(false);
    }
  }, [isValidConfirmed]);

  useEffect(() => {
    // if (window.innerWidth <= 768) {
    if (window.innerWidth <= 992) {
      setIsMobile(true);
    }
    const body: any = document.querySelector('body');
    body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Modal
      className={`${modalStyle.saveQuoteContainer}`}
      title=""
      centered
      open
      onOk={handleCancel}
      onCancel={() => handleCancel(true)}
      width="80%"
      footer={[]}
      maskClosable={false}
      closeIcon={null}
      keyboard={false}
    >
      <div className="position-relative dvh01">
        <div className=" col-lg-12 py-3 px-3 mobile_padding_none">
          <div className="mrg-dec">
            <h2 className="modal-title pe-4 me-1 fw-bold text-center">
              {isEdit ? 'Edit' : 'Add'} roof space
            </h2>
          </div>
          <div className="d-flex flex-column formcontent">
            {questionNumber === 0 && (
              <GMapAddEdit {...{
                zoomed,
                setIsHelpPopup,
                setDisableScroll,
                roof: specificSelectedRoof,
                allRoofs,
                isLoaded: true,
                handleChange,
                currentPinLocation,
                setSelectedRoof: setMySelectedRoof,
                handleCancel,
                isEdit,
                handleClearRoof,
                isValideRedraw,
                setIsValidateRedraw,
                setNewDraw,
                isModalPopup,
                setGenericPopupOpen,
                setGenericPopupText,
                setCloseText,
              }}              />
            )}

            {questionNumber === 1 && (
              <FifteenRoofPitch
              setBack={function (_d: boolean): void {
                throw new Error('Function not implemented.');
              } } back={false} {...{
                newDraw,
                handleChange,
                isMobile,
              }}              />
            )}
            {questionNumber === 2 && (
              <SixteenRoofShading
              setBack={function (_d: boolean): void {
                throw new Error('Function not implemented.');
              } } back={false} {...{
                roofPitch: specificSelectedRoof.roof_pitch,
                handleChange,
                isMobile,
              }}              />
            )}
            {questionNumber === 3 && (
              <div id="roof-directionss">
                <SeventeenRoofDirection
                setBack={function (_d: boolean): void {
                  throw new Error('Function not implemented.');
                } } back={false} setIsHelpPopup={function (_d: boolean): void {
                  throw new Error('Function not implemented.');
                } } setDisableScroll={function (_d: any): boolean {
                  throw new Error('Function not implemented.');
                } } {...{
                  zoomed,
                  isLoaded: true,
                  roof: specificSelectedRoof,
                  handleChange,
                  currentPinLocation,
                  handleRoofDetails,
                  setDirectionValidationOpen,
                  isMobile,
                  allRoofs,
                  setGenericPopupOpen,
                  setGenericPopupText,
                  onProcessingComplete,
                }}                />
              </div>
            )}
          </div>
        </div>
      </div>

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
    </Modal>
  );
};

export default AddEditRoofModal;
