import { Divider, Modal } from 'antd';
import { useRouter } from 'next/router';

import { InfoCircleIcon } from '@/components/theme/icons/infoCircleIcon';

import modalStyle from './restartModal.module.scss';

export interface RestartModalProps {
  visible: boolean;
  setIsRestartModalOpen: (data: any) => void;
}
const RestartModal = (props: RestartModalProps) => {
  const { setIsRestartModalOpen, visible } = props;
  const router = useRouter();

  const handleRestartQuote = () => {
    localStorage.removeItem('saveQuotes');
    setIsRestartModalOpen(false);
    router.push('/survey');
  };

  return (
    <Modal
      className={`${modalStyle.infoContainer}`}
      title=""
      centered
      open={visible}
      onOk={() => setIsRestartModalOpen(false)}
      onCancel={() => setIsRestartModalOpen(false)}
      width={500}
      footer={[]}
      keyboard={false}

    >
      <div
        id="info-installations"
        className="mt-2 d-flex flex-column justify-content-center align-items-center "
      >
        <h1 className="yp fw-bold">
          {' '}
          <InfoCircleIcon /> Restart Journey
        </h1>
        <p className="qyp mb-3">
          This will clear all of your data and you&apos;ll go back to the start.
          Are you sure you want to do this?
        </p>
        <Divider />
        <div className=" w-100 d-flex justify-content-between align-items-center mt-2">
          <button
            type="button"
            className="Restart-button"
            onClick={() => handleRestartQuote()}
          >
            Yes, Restart
          </button>
          <button
            type="button"
            className="button-format"
            onClick={() => setIsRestartModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RestartModal;
