export const getParseFloat = (value: any, _decimal = 0) => {
  if (!value || value === '' || value === null) {
    value = 0;
  }
  value = parseFloat(value);
  if (Number.isNaN(value)) {
    value = 0;
  }
  if (_decimal) {
    value = value.toFixed(_decimal);
  }

  return value;
};

export const getParseInt = (value: any) => {
  if (!value || value === '' || value === null) {
    value = 0;
  }
  value = parseInt(value, 10);
  if (Number.isNaN(value)) {
    value = 0;
  }
  return value;
};
