/* eslint-disable react/jsx-no-duplicate-props, no-console */
import { CloseOutlined } from '@ant-design/icons';
import {
  Drawer,
  IconButton,
  Slider
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

import { getParseFloat, getParseInt } from '@/components/NumberFunctions';

import modalStyle from './calculateModal.module.scss';
import Image from 'next/image';
import { addCommas } from '@/utils/helpers';
import { useLoanCalculator } from '@/customhook/useLoanCalculator';

interface CustomDrawerProps {
  open: boolean;
  onClose: any;
  componentComboData: any;
  changePopupData: any;
  setOpeningModalName: any;
  quoteData: any;
}

const CalculationsDrawer = ({
  open,
  onClose,
  quoteData,
  componentComboData
}: CustomDrawerProps) => {

  const {
    selectedVariantCalc,
    RangeFinance,
    handleRangeChange,
    selectedMonths,
    setSelectedMonths,
    webLeadType,
    isSmallScreen,
  } = useLoanCalculator(componentComboData?.selectedVariant ?? {}, quoteData);
  const [showErrors, setShowErrors] = useState(false);
  const { combo_main_id } = componentComboData
  return (
    <div>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={() => { onClose({ selected_battery_key: selectedVariantCalc.key, combo_main_id, updatedSelectedVariant: selectedVariantCalc }) }}
        ModalProps={{ keepMounted: false }}
        sx={{
          width: { xs: '100%', sm: 400, md: 800 },
          zIndex: 999,
          '& .MuiDrawer-paper': {
            width: '100%',
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            color: 'var(--bs-heading-color)',
            borderRight: 'none',
            fontFamily: 'Montserrat',
            fontSize: 'medium',
            '@media (max-width: 1062px)': {
              width: '100%',
            },
            '@media (max-width: 768px)': {
              width: '100%',
            },
            '@media (max-width: 600px)': {
              width: '100%',
              borderRadius: 0,
              border: 'none',
            },
          },
        }}
        className={`${modalStyle.calculator} data-aos="fade-left"`}
        onClick={() => { onClose({ selected_battery_key: selectedVariantCalc.key, combo_main_id, updatedSelectedVariant: selectedVariantCalc }) }}
      >
        <div className=' container  financeMainDiv' onClick={(e) => e.stopPropagation()}  >
          <div className='financeSubDiv'>
            <div className='calculationDiv overflow-auto'>
              <Box
                // @ts-ignore
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: isSmallScreen ? '11px' : '30px',
                  pb: 0,
                  paddingTop: '20px',
                }}
              >
                <p className="heading-top">Representative example</p>

              </Box>
              <div className="calculator-container">
                <h3 className="fw-bold">Finance £{getParseInt(selectedVariantCalc?.totalEstimatedPrice)}</h3>
                <div>
                  <div>
                    <p className="headingLabel">
                      {webLeadType === 2 ? `Deposit Amount (We Recommend no less than 25%)` : `Deposit Amount`}
                      {/* (We recommend no less than 25%) */}
                    </p>

                    <h4 className="fw-bold">
                      <span>
                        £
                        <input
                          style={{ borderBottom: '4px dotted black' }}
                          className="depositinput fw-bold"
                          type="numeric"
                          disabled={quoteData?.lead_status === "CONFIRM"}
                          value={selectedVariantCalc?.userDepositAmount}
                          onChange={(e: any) => {
                            // eslint-disable-next-line no-restricted-globals
                            if (isNaN(e.target.value)) {
                              setShowErrors(false);
                              handleRangeChange(0);
                              return;
                            }
                            if (Math.round(e.target.value) > Math.round(selectedVariantCalc?.totalEstimatedPrice / 4)) {
                              setShowErrors(true);
                            } else {
                              setShowErrors(false);
                              handleRangeChange(
                                (e.target.value * 100) / Math.round(selectedVariantCalc?.totalEstimatedPrice)
                              );
                            }
                          }}
                        />
                        &#42;
                      </span>
                      ({getParseInt(RangeFinance)}%)
                    </h4>
                    <p style={{ padding: 0, margin: 0 }}>&#42; content editable</p>
                    {showErrors && (
                      <p>
                        The value entered cannot exceed 25% of the Estimated Price ie. £
                        {Math.round(selectedVariantCalc?.totalEstimatedPrice / 4)}{' '}
                      </p>
                    )}
                  </div>
                  <div className="input-range mt-2">
                    <Slider
                      valueLabelDisplay="auto"
                      // slots={{
                      //     valueLabel: ValueLabelComponent,
                      // }}
                      onChange={(e: any) => handleRangeChange(e.target.value)}
                      min={0}
                      max={25}
                      aria-label="custom thumb label"
                      disabled={quoteData?.lead_status === "CONFIRM"}
                      defaultValue={RangeFinance}
                      value={RangeFinance}
                    />
                  </div>

                  <div className="month-price-container">
                    <div className="month-wise-sec">
                      <div className="d-flex gap-2  align-items-center">
                        {selectedMonths === 120 ? (
                          <Image
                            src="/otherpages/checkmark.svg"
                            alt=""
                            className="mrg-t"
                            height={24}
                            width={24}
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
                            style={{ cursor: quoteData?.lead_status === "CONFIRM" ? 'not-allowed' : 'pointer', pointerEvents: quoteData?.lead_status === "CONFIRM" ? 'none' : 'auto' }}
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
                        <h5 className="fw-bold">
                          £{getParseFloat(selectedVariantCalc?.twelveMonths, 2)} for 120 months
                        </h5>
                      </div>
                      <div className="interest-sec">
                        <h5 className="fw-bold">9.9%</h5>
                      </div>
                    </div>
                    <div className="month-wise-sec">
                      <div className="d-flex gap-2  align-items-center">
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
                            style={{ cursor: quoteData?.lead_status === "CONFIRM" ? 'not-allowed' : 'pointer', pointerEvents: quoteData?.lead_status === "CONFIRM" ? 'none' : 'auto' }}
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
                        <h5 className="fw-bold">
                          £{getParseFloat(selectedVariantCalc?.sixtyMonths, 2)} for 60 months
                        </h5>
                      </div>
                      <div className="interest-sec">
                        <h5 className="fw-bold">9.9%</h5>
                      </div>
                    </div>
                  </div>
                  {/* <Accordion  disableGutters sx={{background:'transparent',boxShadow:'none',border:'none',outline:'none'}} >
        <AccordionSummary
          expandIcon={<div><Image quality={100} alt='test' height={40} width={40} src={'/survey/downArrow.webp'} /></div>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{textDecoration:'underline'}}
        >
          Show More Details
        </AccordionSummary>
        <AccordionDetails>
        <div className="price-value-container">
              <div className="diff-price-sec">
                <p className="headingLabel">Cash price of product</p>
                <h5 className="fw-bold">£{addCommas(getParseInt(selectedVariantCalc?.totalEstimatedPrice))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="headingLabel">Deposit amount</p>
                <h5 className="fw-bold">£{addCommas(parseInt(selectedVariantCalc?.userDepositAmount))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="headingLabel">Amount to finance</p>
                <h5 className="fw-bold">£{addCommas(getParseInt(selectedVariantCalc?.loan))  }</h5>
              </div>

              <div className="diff-price-sec">
                <p className="headingLabel">Monthly Payment</p>
                <h5 className="fw-bold">£{addCommas(getParseFloat(selectedVariantCalc?.monthly, 2))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="headingLabel">Interest payable:</p>
                <h5 className="fw-bold">£{addCommas(getParseFloat(selectedVariantCalc?.interest, 2))}</h5>
              </div>

              <div className="diff-price-sec">
                <p className="headingLabel">Annual Rate</p>
                <h5 className="fw-bold">{getParseFloat(9.9, 2)}% APR</h5>
              </div>

              <div className="diff-price-sec">
                <p className="headingLabel">Total payable</p>
                <h5 className="fw-bold">£{addCommas(getParseFloat(selectedVariantCalc?.orderTotal, 2))}</h5>
              </div>
            </div>
        </AccordionDetails>
      </Accordion> */}
                  <div className="price-value-container">

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
                      <p className="headingLabel">Cash price of product</p>
                      <h5 className="fw-bold">£{addCommas(getParseInt(selectedVariantCalc?.totalEstimatedPrice))}</h5>
                    </div>

                    <div className="diff-price-sec">
                      <p className="headingLabel">Deposit amount</p>
                      <h5 className="fw-bold">£{addCommas(parseInt(selectedVariantCalc?.userDepositAmount))}</h5>
                    </div>

                    <div className="diff-price-sec">
                      <p className="headingLabel">Amount to finance</p>
                      <h5 className="fw-bold">£{addCommas(getParseInt(selectedVariantCalc?.loan))}</h5>
                    </div>

                    <div className="diff-price-sec">
                      <p className="headingLabel">Monthly Payment</p>
                      <h5 className="fw-bold">£{addCommas(getParseFloat(selectedVariantCalc?.monthly, 2))}</h5>
                    </div>

                    <div className="diff-price-sec">
                      <p className="headingLabel">Interest payable:</p>
                      <h5 className="fw-bold">£{addCommas(getParseFloat(selectedVariantCalc?.interest, 2))}</h5>
                    </div>

                    <div className="diff-price-sec">
                      <p className="headingLabel">Annual Rate</p>
                      <h5 className="fw-bold">{getParseFloat(9.9, 2)}% APR</h5>
                    </div>

                    <div className="diff-price-sec">
                      <p className="headingLabel">Total payable</p>
                      <h5 className="fw-bold">£{addCommas(getParseFloat(selectedVariantCalc?.orderTotal, 2))}</h5>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className='calculationDivInfoDiv'>
              {/* <p>
            *Savings and performance figures are based on MCS data and are provided as estimates for illustrative purposes only. If you proceed with your enquiry, one of our experts will conduct a detailed design, providing you with more accurate figures and comprehensive
            Information about your panels, including their placement and performance.
          </p> */}
              {/* <p>
            *Energy rate figures are based on Ofgem data (May-June 2024): Daily Standing Charge is 65.88 pence and Electricity Rate is 25.79 pence per kilowatt-hour (kWh). Export rate figures are 7.5 pence per kWh (No Battery, Octopus Outgoing Fixed Tariff) and 27 pence per kwh (With GIVEnergy Battery, Octopus Intelligent Flux System). Rates are subject to market conditions and tariff updates. Actual savings may vary based on individual usage and system performance. Initial savings and performance figures are estimated using MCS data. Source: Octopus Energy, Ofgem and MCS data.
          </p> */}
              <p className='mt-3' style={{ textAlign: "justify" }}>
                {webLeadType === 2 ? `*Savings and performance figures are based on MCS data and are provided as estimates for illustrative purposes only. If you proceed with your enquiry, one of our experts will conduct a detailed design, providing you with more accurate figures and comprehensive information about your panels, including their placement and performance.` : `
            Registered address: Ffynnon Menter, Phoenix Way, Swansea, West Glamorgan, Wales, SA7 9HZ. Company Registration Number is: 09959339. Registered in England and Wales.
          `}
              </p>
              <p style={{ textAlign: "justify" }}>
                {webLeadType === 2 ? `*Energy rate figures are based on Ofgem data(May-June 2024): Daily Standing Charge is 65.88 pence and Electricity Rate is 25.79 pence per kilowatt-hour(KWh). Export rate figures are 7.5 pence per KWh (No Battery, Octopus Outgoing fixed Tariff) and 27 pence per KWh (With GIVEnergy Battery, Octopus Intelligent Flux System). Rates are subject to market conditions and tariff updates. Actual savings may vary based on individual usage and system performance. Initial savings and performance figures are estimated using MCS data. Source: Octopus Energy, Ofgem and MCS data.` : `
            Consumer Energy Solutions Limited is authorised and regulated by the Financial Conduct Authority FRN 930823. We act as a credit broker not a lender and offer finance from JN Bank UK Ltd. Credit is subject to terms and conditions and affordability.
          `}
              </p>
            </div>
          </div>
          <IconButton
            size="large"
            sx={{ marginLeft: 'auto', position: 'absolute', right: "4px", top: '4px' }}
            onClick={() => { onClose({ selected_battery_key: selectedVariantCalc.key, combo_main_id, updatedSelectedVariant: selectedVariantCalc }) }}
            className="closeIcon"
          >
            <CloseOutlined />
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
};

export default CalculationsDrawer;
