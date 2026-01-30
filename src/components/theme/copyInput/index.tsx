import { useState } from 'react';

import CopyIcon from '../icons/copyIcon';
import EditIcon from '../icons/editIcon';
import CopyInputStyles from './index.module.scss';

interface CopyInputProps {
  value: string;
}

export const CopyInput = (props: CopyInputProps) => {
  const { value } = props;

  const [isCustomQrModal, setIsCustomQrModal] = useState(false);

  const handleChangeQrCode = () => {
    setIsCustomQrModal(!isCustomQrModal);
  };

  return (
    <div className={CopyInputStyles.CopyInput}>
      <button
        type="button"
        className="editb"
        onClick={handleChangeQrCode}
        onKeyDown={handleChangeQrCode}
      >
        {' '}
        <EditIcon />{' '}
      </button>

      <div>
        {' '}
        <p>{value}</p>{' '}
      </div>

      <button type="button" className="shareb">
        <CopyIcon />
      </button>
    </div>
  );
};
