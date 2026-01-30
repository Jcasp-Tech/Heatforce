import React, { useEffect, useState } from 'react'
import styles from './MiniFinanceCalculator.module.scss'
import { Accordion, AccordionDetails, AccordionSummary, Slider } from '@mui/material';
import { getParseFloat } from '@/components/NumberFunctions';
import Image from 'next/image';
import { addCommas } from '@/utils/helpers';
const MiniFinanceCalculator = ({userDepositAmount,RangeFinance,getParseInt, handleRangeChange,totalEstimatedPrice,setSelectedMonths,twelveMonths,sixtyMonths,monthly,loan,interest,selectedMonths,orderTotal,leadStatus}) => {
  const [showErrors, setShowErrors] = useState(false);
  const [webLeadType, setWebLeadType] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      // Safe to use localStorage here since we're in the browser
      setWebLeadType(Number(window.localStorage.getItem("WebLeadType")))
    }
  }, [])

  return (
   <div className={styles.containerDiv}>
    <div className={styles.gridcontainer}>
      <div className={styles.financeCalculationDiv}>
        <p className={styles.textAboveHeading} >Should finance be the right option for you, use our example calculator</p>
        <p className={styles.financeTotalText}>Finance £{ addCommas(getParseInt(totalEstimatedPrice))}</p>
        <p className={styles.depositText} >{webLeadType === 2 ? `Deposit Amount (We Recommend no less than 25%)` : `Deposit Amount`}</p>
        <div className={`fw-bold ${styles.depositInputDiv} `}>
                <span>
                  £
                  <input
                    style={{ borderBottom: '4px dotted black' }}
                    className={`${styles.depositInput} fw-bold `}
                    disabled={leadStatus==="CONFIRM"}
                    type="numeric"
                    min={0}
                    value={userDepositAmount}
                    onChange={(e: any) => {
                      // eslint-disable-next-line no-restricted-globals
                      if (isNaN(e.target.value)) {
                        setShowErrors(false);
                        handleRangeChange(0);
                        return;
                      }
                      if (Math.round(e.target.value) > Math.round(totalEstimatedPrice / 4)) {
                        setShowErrors(true);
                      } else {
                        setShowErrors(false);
                        handleRangeChange(
                          (e.target.value * 100) / Math.round(totalEstimatedPrice)
                        );
                      }
                    }}
                  />
                  &#42;
                </span>
                ({getParseInt(RangeFinance)}%)
              </div>
              <p style={{ padding: 0, margin: 0,fontSize:"8px" }}>&#42; content editable</p>
              {showErrors && (
                <p>
                  The value entered cannot exceed 25% of the Estimated Price ie. £
                  {Math.round(totalEstimatedPrice / 4)}{' '}
                </p>
              )}
                <div className={`${styles.inputRange} mt-2`}>
              <Slider
                valueLabelDisplay="auto"
                // slots={{
                //     valueLabel: ValueLabelComponent,
                // }}
                disabled={leadStatus==="CONFIRM"}

                onChange={(e: any) => handleRangeChange(e.target.value)}
                min={0}
                max={25}
                aria-label="custom thumb label"
                defaultValue={RangeFinance}
                value={RangeFinance}
              />
            </div>
            <div className={`${styles.monthPriceContainer} monthemiContainer`}>
              <div className={styles.monthWiseSec}>
                <div className={styles.monthDiv}>
                  {selectedMonths === 120 ? (
                    <Image
                    height={24}
                    width={24}
                      src="/otherpages/checkmark.svg"
                      alt=""
                      className="mrg-t"
                    />
                  ) : (
                    <Image
                    height={24}
                    width={24}
                    quality={100}
                      src="/otherpages/unselect-image.svg"
                      alt="Select 120 months"
                      aria-label="Select 120 months"
                      className="mrg-t"
                      style={{pointerEvents: leadStatus === "CONFIRM" ? "none" : "auto",cursor: leadStatus === "CONFIRM" ? "not-allowed" : "pointer"}}

                      onClick={() => {
                        setSelectedMonths(120);
                      }}
                      onKeyUp={() => {
                        setSelectedMonths(120);
                      }}
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                      role="tab"
                      tabIndex={0}
                    />
                  )}
                  <p className="text2">
                    £{getParseFloat(twelveMonths, 2)} for 120 months
                  </p>
                </div>
                <div className={styles.interestSec}>
                  9.9%
                </div>
              </div>
              <div className={styles.monthWiseSec}>

                <div  className={styles.monthDiv} >
                  {selectedMonths === 60 ? (
                    <Image
                    height={24}
                    width={24}
                      src="/otherpages/checkmark.svg"
                      alt=""
                      className="mrg-t"
                    />
                  ) : (
                    <Image
                    height={24}
                    width={24}
                    quality={100}
                      src="/otherpages/unselect-image.svg"
                      alt="Select 60 months"
                      aria-label="Select 60 months"
                      className="mrg-t"
                      style={{pointerEvents: leadStatus === "CONFIRM" ? "none" : "auto",cursor: leadStatus === "CONFIRM" ? "not-allowed" : "pointer"}}
                      onClick={() => {
                        setSelectedMonths(60);
                      }}
                      onKeyUp={() => {
                        setSelectedMonths(60);
                      }}
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                      role="tab"
                      tabIndex={0}
                    />
                  )}
                  <h5 className="text2">
                    £{getParseFloat(sixtyMonths, 2)} for 60 months
                  </h5>
                </div>
                <div className={styles.interestSec}>
                 9.9%
                </div>
              </div>
            </div>
            <div style={{zIndex:"10",bottom:'0',background:'rgba(15, 59, 89, 0.03)',width:'100%'}}>
            <Accordion  disableGutters sx={{background:'rgba(15, 59, 89, 0.03)',boxShadow:'none',height:"90%",border:'1px solid rgba(15, 59, 89, 0.03)',outline:'none',borderRadius:"40px","& .MuiAccordionSummary-root":{minHeight:"32px"}}} >
        <AccordionSummary
          expandIcon={<div style={{height:"100%",width:"100%",display:"flex",alignItems:"center"}} ><Image quality={100} alt='test' height={30} width={30}  src={'/survey/downArrow.webp'} /></div>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{textDecoration:'underline',fontSize:"14px","& .MuiAccordionSummary-content":{margin:"0"} }}
          className='mt-1'
        >
          Show More Details
        </AccordionSummary>
        <AccordionDetails sx={{padding:0,background:'rgba(15, 59, 89, 0.03)',zIndex:'10'}} >
        <div className="price-value-container miniCalcDataText">

              {/* <div className="diff-price-sec">
                <p className="headingLabel">Cash price of product: </p>
                <h5 className="fw-bold">{getParseFloat(monthly, 2)}</h5>
              </div>  <div className="diff-price-sec">
                <p className="headingLabel">Deposit amount</p>
                <h5 className="fw-bold">{getParseFloat(monthly, 2)}</h5>
              </div>  <div className="diff-price-sec">
                <p className="headingLabel">Amount to finance</p>
                <h5 className="fw-bold">{getParseFloat(monthly, 2)}</h5>
              </div> */}
              <div className="diff-price-sec">
                <p className="text1">Cash price of product</p>
                <h5 className="text2">£{addCommas(getParseInt(totalEstimatedPrice))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="text1">Deposit amount</p>
                <h5 className="text2">£{addCommas(parseInt(userDepositAmount))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="text1">Amount to finance</p>
                <h5 className="text2">£{addCommas(getParseInt(loan))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="text1">Monthly Payment</p>
                <h5 className="text2">£{addCommas(getParseFloat(monthly, 2))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="text1">Interest payable:</p>
                <h5 className="text2">£{addCommas(getParseFloat(interest, 2))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="text1">Annual Rate</p>
                <h5 className="text2">{getParseFloat(9.9, 2)}% APR</h5>
              </div>

              <div className="diff-price-sec">
                <p className="text1">Total payable</p>
                <h5 className="text2">£{addCommas(getParseFloat(orderTotal, 2))}</h5>
              </div>
            </div>
        </AccordionDetails>
      </Accordion>
      </div>
      </div>
      <div className={styles.financeCalculationInfoDiv}>
        {/* <p>
      {`*Savings and performance figures are based on MCS data and are provided as estimates for illustrative purposes only. If you proceed with your enquiry, one of our experts will conduct a detailed design, providing you with more accurate figures and comprehensive information about your panels, including their placement and performance.`}
        </p> */}
        {/* <p>
{`*Energy rate figures are based on Ofgem data (May-June 2024): Daily Standing Charge is 65.88 pence and Electricity Rate is 25.79 pence per kilowatt-hour (kWh). Export rate figures are 7.5 pence per kWh (No Battery, Octopus Outgoing Fixed Tariff) and 27 pence per kWh (With GIVEnergy Battery, Octopus Intelligent Flux System). Rates are subject to market conditions and tariff updates. Actual savings may vary based on individual usage and system performance. Initial savings and performance figures are estimated using MCS data. Source: Octopus Energy, Ofgem and MCS data.`}
        </p> */}
        <p className='mt-3'>
          {webLeadType === 2 ? `*Savings and performance figures are based on MCS data and are provided as estimates for illustrative purposes only. If you proceed with your enquiry, one of our experts will conduct a detailed design, providing you with more accurate figures and comprehensive information about your panels, including their placement and performance.`:`
            Registered address: Ffynnon Menter, Phoenix Way, Swansea, West Glamorgan, Wales, SA7 9HZ. Company Registration Number is: 09959339. Registered in England and Wales.
          `}
        </p>
        <p>
          {webLeadType === 2 ? `*Energy rate figures are based on Ofgem data(May-June 2024): Daily Standing Charge is 65.88 pence and Electricity Rate is 25.79 pence per kilowatt-hour(KWh). Export rate figures are 7.5 pence per KWh (No Battery, Octopus Outgoing fixed Tariff) and 27 pence per KWh (With GIVEnergy Battery, Octopus Intelligent Flux System). Rates are subject to market conditions and tariff updates. Actual savings may vary based on individual usage and system performance. Initial savings and performance figures are estimated using MCS data. Source: Octopus Energy, Ofgem and MCS data.` :`
            Consumer Energy Solutions Limited is authorised and regulated by the Financial Conduct Authority FRN 930823. We act as a credit broker not a lender and offer finance from JN Bank UK Ltd. Credit is subject to terms and conditions and affordability.
          `}
        </p>
      </div>
    </div>
   </div>
  )
}

export default MiniFinanceCalculator