import { Modal } from 'antd';

import { RedrawIcon } from '@/components/theme/icons/reDrawIcon';

import modalStyle from './directionValidation.module.scss';
import { QUESTION } from '@/utils/constants';
import { scroller } from 'react-scroll';
import { ifProcessingComplete } from '@/utils/helpers';

export interface DirectionValidationProps {
  visible: boolean;
  setDirectionValidationOpen: (data: boolean) => void;
  handleChange: (ans: any, data: any, nextC: any) => void;
  setIsValidateRedraw: (d: boolean) => void;
  setValidConfirmed: (d: boolean) => void;
}
const DirectionValidationModal = (props: DirectionValidationProps) => {
  const {
    setDirectionValidationOpen,
    visible,
    handleChange,
    setIsValidateRedraw,
    setValidConfirmed,
  } = props;

  const questionConst = QUESTION
  const questionIndex = 20

  const handleContinue = () => {
    handleChange(questionIndex, { roof_direction: 'direction' }, questionConst[questionIndex].id);
    setDirectionValidationOpen(false);
    setValidConfirmed(true);
    ifProcessingComplete();
  };

  const handleRedraw = () => {
    setIsValidateRedraw(true);
    setDirectionValidationOpen(false);
    if(!visible){
      scroller.scrollTo(questionConst[14].id,{
        duration: 100,
        delay: 100,
        smooth: true,
        offset: 0
      })
    }
  };

  // useEffect(() => {
  //   const body: any = document.querySelector('body');
  //   body.style.overflow = visible ? 'hidden' : 'auto';
  // }, [visible])

  return (
    <Modal
      className={`${modalStyle.infoContainer}`}
      title=""
      centered
      open={visible}
      onOk={() => setDirectionValidationOpen(false)}
      onCancel={() => setDirectionValidationOpen(false)}
      width={500}
      footer={[]}
      keyboard={false}
    >
      <div
        id="info-installations"
        className="your-property mt-2 d-flex flex-column "
      >
        <h1 className="yp fw-bold mb-4">Tip</h1>
        <p className="qyp">
          Solar panels generate more power if they&apos;re pointing due south.
          You can either continue, or, if possible, re-draw on to a different
          part of your roof that&apos;s pointing in a southerly direction.
        </p>
        <div className="w-100 d-flex justify-content-between align-items-center mt-5">
          <button
            type="button"
            className="button-format cancelButton mobile14pxFontClass"
            onClick={handleRedraw}
          >
            {/* <span style={{ marginBottom: '5px' }}>&#8592;</span>  */}
            <RedrawIcon /> Re-draw
          </button>
          <button
            type="button"
            className="button-format saveButton"
            onClick={handleContinue}
          >
            {/* <span style={{ marginBottom: '5px' }}>&#8592;</span>  */}
            Continue
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DirectionValidationModal;
