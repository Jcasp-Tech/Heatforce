import styles from "./financeCalculatorPopup.module.scss";
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from "react";

export interface FinanceCalculatorPopupProps {
    setOpenFinanceCalculatorPopup: (value: boolean) => void;
    setDisableScroll: (value: boolean) => void;
    isPopupInPopup: boolean;
    quoteData: any;
    userDepositAmount: number;
    RangeFinance: number;
    totalEstimatedPrice: number;
    setUserDepositAmount: (value: any) => void
    setRangeFinance: (value: any) => void
    handleRangeChange: (value: any) => void
}

const FinanceCalculatorPopup = (props: FinanceCalculatorPopupProps) => {
    const { setOpenFinanceCalculatorPopup,
        setDisableScroll,
        // isPopupInPopup,
        userDepositAmount,
        totalEstimatedPrice,
        handleRangeChange,
    } = props
    const userValue = 123
    // const [userDepositAmount, setUserDepositAmount] = useState<any>(25)
    const [ ,setShowErrors] = useState(false);
    const min = 0;
    const max = 50;
    let percentage;

    useEffect(() => {
        const slider: any = document.getElementById('financeCalculatorSliderID');
        percentage = ((userDepositAmount - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #0A1E34 0%, #0A1E34 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
    }, [userDepositAmount]);

    const TheUncheckedIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 28,
        height: 28,
        backgroundColor: '#eee',

        borderWidth: 2,
        borderStyle: 'solid',
        '.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'rgba(15, 59, 89, 0.05)',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background:
                theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
    }));

    const TheCheckedIcon = styled(TheUncheckedIcon)({
        backgroundColor: '#0A1E34',
        borderWidth: 0,
        '&::before': {
            display: 'block',
            width: 16,
            height: 16,
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#0A1E34',
        },
    });

    const TheRadioButton = (props: RadioProps) => {
        return (
            <Radio
                disableRipple
                color="default"
                checkedIcon={<TheCheckedIcon />}
                icon={<TheUncheckedIcon />}
                {...props}
            />
        );
    }

    useEffect(() => {
        console.log('userDepositAmount', userDepositAmount)

    }, [userDepositAmount]);

    return (
        <>
            <div className={`${styles.financeCalculatorPopup}`}>
                <div className={`${styles.transparentContainer}`}
                    data-aos="fade-left " onClick={() => {
                        setDisableScroll(false);
                        setOpenFinanceCalculatorPopup(false);
                        // setDisableScroll(false)
                    }}  >
                    <div className={`${styles.dialogBox}`} onClick={(e)=>{e.stopPropagation()}} >
                        <div className={`${styles.closeButton}`}
                            onClick={() => {
                                setDisableScroll(false);
                                setOpenFinanceCalculatorPopup(false);
                                // setDisableScroll(false)
                            }} >

                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgba(15, 59, 89, 0.05)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </div>

                        <div className={`${styles.contentSection}`}   >

                            <div className={`${styles.representativeText}`}>
                                Representative example
                            </div>

                            <div className={`${styles.finance}`}>
                                Finance
                            </div>

                            <div className={`${styles.depositAmountText}`}>
                                Deposit Amount
                                {/* (We recommend no less than 25%) */}
                            </div>
                            <div className="d-flex gap-2">
                                <input type="text" value={`${userValue}`} defaultValue={userValue} className={`${styles.userValue} ${styles.depositAmountNumber}`} />

                                <div className={`${styles.depositAmountNumber}`}>
                                    ({percentage})
                                </div>
                            </div>


                            <div className="financeCalculatorSlider">
                                <input
                                    id="financeCalculatorSliderID"
                                    type="range"
                                    min={min}
                                    max={max}
                                    value={percentage}
                                    
                                    // onInput={handleRangeChange}
                                    onChange={(e: any) => {
                                        // eslint-disable-next-line no-restricted-globals
                                        if (isNaN(e.target.value)) {
                                            setShowErrors(false);
                                            handleRangeChange(0);
                                            return;
                                        }
                                        if (e.target.value > totalEstimatedPrice / 2) {
                                            setShowErrors(true);
                                        } else {
                                            setShowErrors(false);
                                            handleRangeChange(
                                                (e.target.value * 100) / totalEstimatedPrice
                                            );
                                        }
                                    }}
                                />
                            </div>

                            <FormControl>
                                <RadioGroup
                                    defaultValue="120"
                                    className={`${styles.radioInputContainer}`}
                                >
                                    <div className={`${styles.radioInputCard}`}>
                                        <FormControlLabel value="120" control={<TheRadioButton />} label={<div className={`${styles.perMonthsInfo}`}>£110 for 120 months</div>} className='m-0' />
                                        <div className={`${styles.percentageInfo}`}>
                                            9.9%
                                        </div>
                                    </div>
                                    <div className={`${styles.radioInputCard}`}>
                                        <FormControlLabel value="60" control={<TheRadioButton />} label={<div className={`${styles.perMonthsInfo}`}>£171 for 60 months</div>} className='m-0' />
                                        <div className={`${styles.percentageInfo}`}>
                                            9.9%
                                        </div>
                                    </div>
                                </RadioGroup>
                            </FormControl>

                            <div />

                            <div>
                                <div className={`${styles.financialTermsAndValues}`}>
                                    <div className={`${styles.financialTerms}`}>Cash price of product:</div>
                                    <div className={`${styles.values}`}>7,690.00</div>
                                </div>
                                <div className={`${styles.financialTermsAndValues}`}>
                                    <div className={`${styles.financialTerms}`}>Deposit amount:</div>
                                    <div className={`${styles.values}`}>1,923.00</div>
                                </div>
                                <div className={`${styles.financialTermsAndValues}`}>
                                    <div className={`${styles.financialTerms}`}>Amount to finance:</div>
                                    <div className={`${styles.values}`}>5,767.00</div>
                                </div>
                                <div className={`${styles.financialTermsAndValues}`}>
                                    <div className={`${styles.financialTerms}`}>Monthly Payment:</div>
                                    <div className={`${styles.values}`}>82</div>
                                </div>
                                <div className={`${styles.financialTermsAndValues}`}>
                                    <div className={`${styles.financialTerms}`}>Interest payable:</div>
                                    <div className={`${styles.values}`}>4,122</div>
                                </div>
                                <div className={`${styles.financialTermsAndValues}`}>
                                    <div className={`${styles.financialTerms}`}>Annual rate:</div>
                                    <div className={`${styles.values}`}>9.9% APR</div>
                                </div>
                                <div className={`${styles.financialTermsAndValues}`}>
                                    <div className={`${styles.financialTerms}`}>Total payable:</div>
                                    <div className={`${styles.values}`}>11,812</div>
                                </div>
                            </div>

                            <div className={`${styles.disclaimerText}`}>
                                *Savings and performance figures are based on MCS data and are provided as estimates for illustrative purposes only. If you proceed with your enquiry, one of our experts will conduct a detailed design, providing you with more accurate figures and comprehensive information about your panels, including their placement and performance.
                            </div>

                            <div className={`${styles.disclaimerText}`}>
                                *Energy rate figures are based on Ofgem data (May - June 2024): Daily Standing Charge is 65.88 pence and Electricity Rate is 25.79 pence per kilowatt-hour (kWh). Export rate figures are 7.5 pence per kWh (No Battery, Octopus Outgoing Fixed Tariff) and 27 pence per kWh (With GIVEnergy Battery, Octopus Intelligent Flux System). Rates are subject to market conditions and tariff updates. Actual savings may vary based on individual usage and system performance. Initial savings and performance figures are estimated using MCS data. Source: Octopus Energy, Ofgem and MCS data
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FinanceCalculatorPopup;
