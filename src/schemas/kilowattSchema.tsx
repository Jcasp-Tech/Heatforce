import * as Yup from 'yup';

export interface KiloWattInputs {
  solar_system_size: string;
}
export const KiloWattValidateSchema = Yup.object({
  solar_system_size: Yup.string()
  .required('Please enter solar system size(kW).')
  // .matches(/^\d+(\.\d+)?$/, 'Must be a valid number') // This regex allows for decimal numbers
  .matches(
    /^[0-9]+(\.[0-9]{1,2})?$/, 
    'Must be a valid number with up to two decimal places'
  ) // This regex allows for decimal numbers with up to two digits after the dot
  .test(
    'maxValue',
    'The allowed range is 2.7KW to 11KW',
    (val) => Number(val) <= 11
  )
  .test(
    'minValue',
    'The allowed range is 2.7KW to 11KW',
    (val) => Number(val) >= 2.7
  ),
}).required();
