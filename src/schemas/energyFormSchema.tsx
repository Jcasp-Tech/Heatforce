import * as Yup from 'yup';

export interface EnergyFormInputs {
  energy: string;
}
export const EnergyFormValidateSchema = Yup.object({
  energy: Yup.string()
    .required('Please enter energy consumption(kWh).')
    .matches(/^[0-9]+$/, 'Must be Natural Number')
    .test(
      'len',
      'Maximum value we allow is 25000kWh',
      (val) => Number(val) <= 25000
    )
    .test(
      'len',
      'Minimum value we allow is 1500kWh',
      (val) => Number(val) >= 1500
    ),
  // .typeError("That doesn't look like a number")
  // .min(4, 'Value should not be less then 1000')
  // .max(5, 'Maximum value we allow is 25000kWh'),
}).required();
