import { Input } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';

const RadioInput = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleRadioChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="">
      <Input
        type="radio"
        className="custom-radio"
        // name={name}
        // id={value} // htlmlFor targets this id.
        checked={isChecked}
        onChange={handleRadioChange}
      />

      <div className={` ${isChecked ? 'checked' : 'unchecked'}`}>
        <div className={`${isChecked ? 'checked' : 'unchecked'}`}>
          <Image
                      height={80}
                      width={80}
            src={
              isChecked
                ? '/assets/images/Unlock-switch.svg'
                : '/assets/images/lock-switch.svg'
            }
            alt={isChecked ? 'Checked' : 'Unchecked'}
          />
        </div>
      </div>
    </div>
  );
};

export default RadioInput;
