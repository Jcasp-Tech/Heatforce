// hooks/useLoanCalculator.ts
import { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { getParseInt } from "@/components/NumberFunctions";

interface LoanCalculatorOptions {
    defaultInterestRate?: number;
    upfrontFee?: number;
    defaultSelectedMonths?: number;
}

export const useLoanCalculator = (
    selectedVariantObject: any,
    quoteData: any,
    options: LoanCalculatorOptions = {}
) => {
    const {
        defaultInterestRate = 9.9,
        upfrontFee = 0,
        defaultSelectedMonths = 120,
    } = options;

    const [selectedVariant, setSelectedVariant] = useState(selectedVariantObject ?? {});
    const [RangeFinance, setRangeFinance] = useState(() => {
        if (quoteData?.lead_status === "CONFIRM") {
            return JSON.parse(quoteData?.log)?.RangeFinance ?? 0;
        }
        return selectedVariantObject?.RangeFinance ?? 0;
    });
    const [selectedMonths, setSelectedMonths] = useState(() => {
        if (quoteData?.lead_status === "CONFIRM") {
            return JSON.parse(quoteData?.log)?.selectedMonths ?? defaultSelectedMonths;
        }
        return selectedVariantObject?.selectedMonths ?? defaultSelectedMonths;
    });
    const [SixtyMonths, setSixtyMonths] = useState(selectedVariantObject?.sixtyMonths ?? 0);
    const [TwelveMonths, setTwelveMonths] = useState(selectedVariantObject?.twelveMonths ?? 0);
    const [Monthly, setMonthly] = useState(selectedVariantObject?.monthly ?? 0);
    const [Loan, setLoan] = useState(selectedVariantObject?.loan ?? 0);
    const [Interest, setInterest] = useState(selectedVariantObject?.interest ?? 0);
    const [OrderTotal, setOrderTotal] = useState(selectedVariantObject?.orderTotal ?? 0);
    const [UserDepositAmount, setUserDepositAmount] = useState(selectedVariantObject?.userDepositAmount ?? 0);
    const [webLeadType, setWebLeadType] = useState<any>();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleRangeChange = (val: any) => {
        setRangeFinance(Number(val));
    };

    const calLoan = (result: any) => {
        if (result) {
            setMonthly(result.monthlyPayment);
            setLoan(result.loanAmount);
            setOrderTotal(result.totalRepayment);
            setInterest(result.costOfFinance);
        }
    };

    const calculateLoan = (totalPrice: number, depositAmount: number, months: number) => {
        if (typeof window !== 'undefined' && window.VendigoCalculatorWidget) {
            const calculator = new window.VendigoCalculatorWidget();
            return calculator.calculate(totalPrice, depositAmount, defaultInterestRate, months, upfrontFee);
        } else {
            console.error('VendigoCalculatorWidget is not available.');
            return null;
        }
    };

    const setAllVars = (newvariant?: any) => {
        if (newvariant?.totalEstimatedPrice &&
            newvariant?.before_solar &&
            newvariant?.new_after_solar &&
            newvariant?.EstimatedExportEarnings
        ) {
            const variant = newvariant;
            setMonthly(variant.monthly ?? 0);
            setSelectedMonths(variant.selectedMonths ?? defaultSelectedMonths);
            setRangeFinance(variant.RangeFinance ?? 0);
            setSelectedVariant(variant);
            // setSixtyMonths(variant.sixtyMonths ?? 0);
            // setTwelveMonths(variant.twelveMonths ?? 0);
            // setLoan(variant.loan ?? 0);
            // setInterest(variant.interest ?? 0);
            // setOrderTotal(variant.orderTotal ?? 0);
        }
    }
    useEffect(() => {
        setAllVars(selectedVariantObject);
    }, [selectedVariantObject?.totalEstimatedPrice,
    selectedVariantObject?.before_solar,
    selectedVariantObject?.new_after_solar,
    selectedVariantObject?.EstimatedExportEarnings]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            setWebLeadType(Number(window.localStorage.getItem("WebLeadType")));
        }
    }, []);

    useEffect(() => {
        if (!selectedVariant?.totalEstimatedPrice) return;
        try {
            const totalPrice = Math.round(selectedVariant.totalEstimatedPrice);
            const depositAmount = Math.round((RangeFinance / 100) * totalPrice);
            setUserDepositAmount(depositAmount);

            const sixtyLoanResult = calculateLoan(totalPrice, depositAmount, 60);
            const oneTwentyLoanResult = calculateLoan(totalPrice, depositAmount, 120);

            setSixtyMonths(sixtyLoanResult?.monthlyPayment ?? 0);
            setTwelveMonths(oneTwentyLoanResult?.monthlyPayment ?? 0);

            if (selectedMonths === 60) {
                calLoan(sixtyLoanResult);
            } else if (selectedMonths === 120) {
                calLoan(oneTwentyLoanResult);
            } else {
                console.warn('Unexpected selectedMonths:', selectedMonths);
            }

        } catch (error) {
            console.error('Error calculating loan:', error);
        }
    }, [RangeFinance, selectedMonths, selectedVariant?.totalEstimatedPrice, defaultInterestRate, upfrontFee]);

    useEffect(() => {
        if (
            selectedVariant?.totalEstimatedPrice &&
            selectedVariant?.before_solar &&
            selectedVariant?.new_after_solar &&
            selectedVariant?.EstimatedExportEarnings &&
            (RangeFinance || RangeFinance === 0) &&
            (UserDepositAmount || UserDepositAmount === 0)
        ) {
            const totalPrice = Math.round(selectedVariant.totalEstimatedPrice);
            const beforeSolar = getParseInt(selectedVariant.before_solar);
            const afterSolar = getParseInt(selectedVariant.new_after_solar);
            const estimatedEarnings = getParseInt(selectedVariant.EstimatedExportEarnings);
            const annual_saving = Number(beforeSolar - afterSolar + estimatedEarnings);
            const financePaybackTime = (Number(OrderTotal) + Number(UserDepositAmount)) / (annual_saving);
            const cashPaybackTime = totalPrice / (annual_saving);

            setSelectedVariant((prev: any) => ({
                ...prev,
                loan: Loan,
                monthly: Monthly,
                monthly_apr_from: Monthly,
                interest: Interest,
                orderTotal: OrderTotal,
                annual_saving: annual_saving,
                userDepositAmount: UserDepositAmount,
                sixtyMonths: SixtyMonths,
                twelveMonths: TwelveMonths,
                RangeFinance: RangeFinance,
                selectedMonths,
                financePaybackTime,
                cashPaybackTime,
            }));
        }
    }, [
        Loan, Monthly, Interest, OrderTotal, UserDepositAmount,
        SixtyMonths, TwelveMonths, RangeFinance, selectedMonths,
        selectedVariant?.before_solar, selectedVariant?.new_after_solar,
        selectedVariant?.EstimatedExportEarnings, selectedVariant?.totalEstimatedPrice
    ]);



    const recalculateLoanValues = (newVariant?: any) => {
        if (!newVariant?.totalEstimatedPrice ||
            !newVariant?.before_solar ||
            !newVariant?.new_after_solar ||
            !newVariant?.EstimatedExportEarnings) {
            console.warn("Missing fields in newVariant for recalculation");
            return newVariant;
        }

        try {
            setAllVars(newVariant);

            const totalPrice = Math.round(newVariant.totalEstimatedPrice);
            const RangeFinanceVal = newVariant.RangeFinance ?? RangeFinance;
            setRangeFinance(RangeFinanceVal);
            const depositAmount = Math.round(((RangeFinanceVal) / 100) * totalPrice);
            const selectedMonthsVal = newVariant.selectedMonths ?? selectedMonths;

            setSelectedMonths(selectedMonthsVal);

            const sixtyLoanResult = calculateLoan(totalPrice, depositAmount, 60);
            const oneTwentyLoanResult = calculateLoan(totalPrice, depositAmount, 120);

            let updatedFields: any = {
                sixtyMonths: sixtyLoanResult?.monthlyPayment ?? 0,
                twelveMonths: oneTwentyLoanResult?.monthlyPayment ?? 0,
                monthly_apr_from: 0,
                monthly: 0,
                loan: 0,
                interest: 0,
                orderTotal: 0,
                userDepositAmount: depositAmount,
                RangeFinance: RangeFinanceVal,
                selectedMonths: selectedMonthsVal,
                financePaybackTime: 0,
                cashPaybackTime: 0,
            };

            if (selectedMonthsVal === 60 && sixtyLoanResult) {
                updatedFields = {
                    ...updatedFields,
                    monthly: sixtyLoanResult.monthlyPayment,
                    monthly_apr_from: sixtyLoanResult.monthlyPayment,
                    loan: sixtyLoanResult.loanAmount,
                    interest: sixtyLoanResult.costOfFinance,
                    orderTotal: sixtyLoanResult.totalRepayment,
                };
            } else if (selectedMonthsVal === 120 && oneTwentyLoanResult) {
                updatedFields = {
                    ...updatedFields,
                    monthly: oneTwentyLoanResult.monthlyPayment,
                    monthly_apr_from: oneTwentyLoanResult.monthlyPayment,
                    loan: oneTwentyLoanResult.loanAmount,
                    interest: oneTwentyLoanResult.costOfFinance,
                    orderTotal: oneTwentyLoanResult.totalRepayment,
                };
            } else {
                console.warn('Unexpected selectedMonths:', selectedMonthsVal);
            }

            const beforeSolar = getParseInt(newVariant.before_solar);
            const afterSolar = getParseInt(newVariant.new_after_solar);
            const estimatedEarnings = getParseInt(newVariant.EstimatedExportEarnings);

            const annual_saving = Number(beforeSolar - afterSolar + estimatedEarnings);
            const financePaybackTime = (Number(updatedFields.orderTotal) + Number(depositAmount)) / (annual_saving);
            const cashPaybackTime = totalPrice / (annual_saving);


            updatedFields = {
                ...updatedFields,
                RangeFinance: RangeFinanceVal,
                selectedMonths: selectedMonthsVal,
                financePaybackTime: financePaybackTime,
                cashPaybackTime: cashPaybackTime,
                annual_saving: annual_saving,
            };

            const updatedVariant = {
                ...newVariant,
                ...updatedFields,
                updatedFields: { ...updatedFields }
            };

            // Update all the states
            setSelectedVariant(updatedVariant);
            setRangeFinance(RangeFinanceVal);
            setLoan(updatedVariant.loan);
            setSelectedMonths(selectedMonthsVal);
            setMonthly(updatedVariant.monthly);
            setInterest(updatedVariant.interest);
            setOrderTotal(updatedVariant.orderTotal);
            setUserDepositAmount(updatedVariant.userDepositAmount);
            setSixtyMonths(updatedVariant.sixtyMonths);
            setTwelveMonths(updatedVariant.twelveMonths);

            return updatedVariant;

        } catch (error) {
            console.error('Error recalculating loan:', error);
            return newVariant;
        }
    };


    return {
        setAllVars: setAllVars,
        selectedVariantCalc: selectedVariant,
        setSelectedVariantCalc: setSelectedVariant,
        RangeFinance,
        handleRangeChange,
        selectedMonths,
        setSelectedMonths,
        SixtyMonths,
        TwelveMonths,
        Monthly,
        Loan,
        Interest,
        OrderTotal,
        UserDepositAmount,
        webLeadType,
        isSmallScreen,
        recalculateLoanValues,
    };
};
