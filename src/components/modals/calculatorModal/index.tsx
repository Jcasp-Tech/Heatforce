/* eslint-disable jsx-a11y/label-has-associated-control, no-console */
import { Modal } from 'antd';
import { useState } from 'react';

import modalStyle from './calculateModal.module.scss';

interface InverterProps {
  visible: boolean;
  setIsCalculatorModal: (d: any) => void;
}

const CalculatorModal = (props: InverterProps) => {
  const { visible, setIsCalculatorModal } = props;
  const [RangeFinance, setRangeFinance] = useState(0);

  // added for finance loan calculation
  const [monthly, setMonthly] = useState(87.65);
  const [loan, setLoan] = useState();
  const [orderTotal, setOrderTotal] = useState();
  const [interest, setInterest] = useState();

  const calLoan = (result: any) => {
    setMonthly(result.monthlyPayment);
    setLoan(result.loanAmount);
    setOrderTotal(result.totalRepayment);
    setInterest(result.costOfFinance);
  };

  const handleRangeChange = (
    val: React.ChangeEvent<HTMLInputElement>,
    totalGrant: number
  ) => {
    setRangeFinance(val.target.valueAsNumber);
    const perAmount = val.target.valueAsNumber;

    console.log(perAmount);
    const depositAmount = Math.floor((perAmount / 100) * 10095);

    if (typeof window !== 'undefined' && window.VendigoCalculatorWidget) {
      const result = new window.VendigoCalculatorWidget().calculate(
        totalGrant,
        depositAmount,
        9.9,
        12,
        0
      );

      calLoan(result);
      console.log('Loan calculation result:', result);
    } else {
      console.error('VendigoCalculatorWidget is not available.');
    }
  };

  return (
    <Modal
      className={`${modalStyle.calculator}`}
      title=""
      centered
      open={visible}
      onOk={() => setIsCalculatorModal(false)}
      onCancel={() => setIsCalculatorModal(false)}
      width={500}
      footer={[]}
      keyboard={false}
    >
      <div className="">
        <p className="mb-0 fw-bold">Representative example</p>
        <h3 className="fw-bold">Finance £10,095</h3>
        <div className="finance d-flex align-items-center gap-2">
          <form className="pt-3 pyment-form">
            <div className="row">
              <div className="col-md-6 installation-date-col">
                <div className="form-group">
                  <label htmlFor="plan" className="control-label color-skyblue">
                    Finance Plan
                  </label>
                  <select id="plan" name="plan" className="dropdown">
                    <option>9.9% APR</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 installation-date-col">
                <div className="form-group">
                  <label
                    htmlFor="plan2"
                    className="control-label color-skyblue"
                  >
                    Choose Payment Term
                  </label>
                  <select id="plan2" className="dropdown">
                    <option>1 Years (12 Months)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group pt-3">
              <label htmlFor="plan3" className="control-label color-skyblue">
                Choose Deposit{' '}
                {`£${Math.floor((RangeFinance / 100) * 10095)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}{' '}
              </label>
              <input
                className="range-slider"
                id="plan3"
                type="range"
                min="0"
                max="50"
                step="1"
                value={RangeFinance}
                onChange={(e) => handleRangeChange(e, 10095)}
              />
              <span> ({RangeFinance}%)</span>
            </div>
            <div className="form-group info">
          
              <p>
                <b>Monthly payment: </b>{' '}
                <span className="text-right">{monthly}</span>
              </p>
              <p>
                <b>Interest: </b> <span className="text-right">{interest}</span>
              </p>
              <p>
                <b>Order Total:</b>{' '}
                <span className="text-right">{orderTotal}</span>
              </p>
              <p>
                <b>Loan Amount:</b> <span className="text-right">{loan}</span>
              </p>
            </div>
          </form>
          <div />
          <div />
        </div>
      </div>
    </Modal>
  );
};

export default CalculatorModal;
