import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { DatePicker, Input, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import BlackCalendarIcon from '../icons/BlackCalendarIcon';

export const FormGroup: any = ({ children, className = '' }: any) => {
  return <div className={`ant-form-item ${className}`}>{children}</div>;
};

interface InputRadioFieldProps {
  register: any;
  formState: any;
  id: string;
  name: string;
  label: string;
  value: string;
  className?: string;
  showError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (d: any) => void;
}

interface InputFieldProps {
  register: any;
  formState: any;
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  autoCapitalize?: string;
  autoComplete?: string | boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  showError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  onChange?: (d: any) => void;
  autoFocus?: boolean;
}

interface InputAfterFieldProps {
  register: any;
  formState: any;
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  showError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  addonAfter: string;
  control: any;
}

interface TextAreaFieldProps {
  register: any;
  formState: any;
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  autoCapitalize?: string;
  autoComplete?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  showError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (d: any) => void;
}

interface TextAreaFieldProps {
  register: any;
  formState: any;
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  autoCapitalize?: string;
  autoComplete?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  showError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  onChange?: (d: any) => void;
}

interface SelectFieldProps {
  register: any;
  formState: any;
  control: any;
  id: string;
  name?: string;
  label?: string;
  defaultValue?: any;
  placeholder?: string;
  className?: string;
  onSelect?: (relationship: any) => void;
  autoCapitalize?: string;
  showError?: boolean;
  options?: any;
  isClearable?: boolean;
  isMulti?: boolean;
  autoComplete?: boolean;
  setValue?: any;
  disabled?: boolean;
  value?: any;
  onSelectChange?: (d: any) => void;
  onInputChange?: (d: any) => void;
}

interface InputDateFieldProps {
  register: any;
  formState: any;
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  showError?: boolean;
  dateFormat?: string;
  name?: string;
  disabled?: boolean;
  isDisabledDate?: boolean;
  setValue?: any;
  disabledPast?: boolean;
  onChange?: (d: any) => void;
  allowClear?: boolean;
  isDefaultOpen?: boolean;
  timezone?: string;
  disabledDate?: (d: any) => void;
}

interface ContactFieldProps {
  register: any;
  formState: any;
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  showError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
}

export const ContactField = (props: ContactFieldProps) => {
  const {
    register,
    formState,
    id,
    label,
    placeholder,
    defaultValue,
    className = 'ant-input',
    showError = true,
    disabled,
    readOnly,
    autoFocus = false,
  } = props;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message);
    }
    
    return () => {
      setError(null);
    };
  }, [formState]);

  return (
    <>
      {label && (
        <div className="block pb-2">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="">
        <input
          {...register(id)}
          {...{
            id,
            type: 'tel',
            className: `${className} ${error ? 'ant-input-status-error' : ''}`,
            defaultValue,
            placeholder,
            disabled,
            readOnly,
            autoFocus,
          }}
        />
        {showError && error && (
          <span className="ant-typography ant-typography-danger block error-message">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export const InputRadioField = (props: InputRadioFieldProps) => {
  const {
    register,
    formState,
    id,
    name,
    label,
    value,
    className = '',
    showError = true,
    disabled,
    readOnly,
    onChange,
  } = props;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[name] &&
      formState?.errors[name].message
    ) {
      setError(formState?.errors[name].message);
    }
    
    return () => {
      setError(null);
    };
  }, [formState]);

  return (
    <>
      <div className="flex items-center mr-2">
        <input
          type="radio"
          {...register(name)}
          {...{
            id,
            className: `${className} ${error ? 'ant-input-status-error' : ''}`,
            value,
            disabled,
            readOnly,
            onChange,
          }}
        />

        <label htmlFor={id} className="cursor-pointer">
          <span className="ms-1">{label}</span>
        </label>
      </div>
      {showError && error && (
        <span className="ant-typography ant-typography-danger block">
          {error}
        </span>
      )}
    </>
  );
};

export const InputField = (props: InputFieldProps) => {
  const {
    register,
    formState,
    id,
    type = 'text',
    label,
    placeholder,
    defaultValue,
    className = 'ant-input input-border',
    autoCapitalize,
    autoComplete,
    minLength,
    maxLength,
    min,
    max,
    showError = true,
    disabled,
    readOnly,
    value,
    onChange,
    autoFocus = false,
  } = props;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message);
    }
    
    return () => {
      setError(null);
    };
  }, [formState]);

  return (
    <>
      {label && (
        <div className="block col-10 pb-2">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className=" d-flex flex-column ">
        <input
          {...register(id)}
          {...{
            id,
            type,
            className: `${className} ${error ? 'error-border' : ''}`,
            defaultValue,
            autoCapitalize,
            autoComplete,
            placeholder,
            minLength,
            maxLength,
            min,
            max,
            disabled,
            readOnly,
            autoFocus,
          }}
          value={value}
          onChange={onChange}
        />
        {showError && error && (
          <span className="ant-typography ant-typography-danger block error-message">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export const InputPasswordField = (props: InputFieldProps) => {
  const {
    register,
    formState,
    id,
    label,
    placeholder,
    defaultValue,
    className = 'ant-input',
    autoCapitalize,
    autoComplete,
    minLength,
    maxLength,
    min,
    max,
    showError = true,
    disabled,
    readOnly,
  } = props;
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message);
    }
    
    return () => {
      setError(null);
    };
  }, [formState]);

  return (
    <>
      {label && (
        <div className="block pb-2">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="ant-input-affix-wrapper ant-input-password input-border">
        <input
          {...register(id)}
          {...{
            id,
            type: visible ? 'text' : 'password',
            className: `${className} ${
              error ? 'ant-input-status-error ant-input' : 'ant-input'
            }`,
            defaultValue,
            autoCapitalize,
            autoComplete,
            placeholder,
            minLength,
            maxLength,
            min,
            max,
            disabled,
            readOnly,
          }}
        />
        <span className="ant-input-suffix">
          <span
            role="button"
            aria-label="eye-invisible"
            tabIndex={-1}
            className="anticon anticon-eye-invisible ant-input-password-icon"
            onClick={() => setVisible(!visible)}
            onKeyDown={() => setVisible(!visible)}
          >
            {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
          </span>
        </span>
      </div>
      {showError && error && (
        <span className="ant-typography ant-typography-danger block error-message">
          {error}
        </span>
      )}
    </>
  );
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const {
    register,
    formState,
    id,
    label,
    placeholder,
    defaultValue,
    className = 'ant-input',
    autoCapitalize,
    autoComplete,
    minLength,
    maxLength,
    min,
    max,
    showError = true,
    disabled,
    readOnly,
    onChange,
    autoFocus = false,
  } = props;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message);
    }
    
    return () => {
      setError(null);
    };
  }, [formState]);

  return (
    <>
      {label && (
        <div className="block col-10 pb-2">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="">
        <textarea
          {...register(id)}
          {...{
            id,
            className: `${className} ${error ? 'ant-input-status-error' : ''}`,
            defaultValue,
            autoCapitalize,
            autoComplete,
            placeholder,
            minLength,
            maxLength,
            min,
            max,
            disabled,
            readOnly,
            autoFocus,
          }}
          onKeyUp={(e: any) => {
            if (onChange) {
              onChange(e);
            }
          }}
        />
        {showError && error && (
          <span className="ant-typography ant-typography-danger block error-message">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    formState,
    id,
    control,
    name,
    register,
    label,
    placeholder,
    defaultValue,
    showError = true,
    options,
    disabled,
    isClearable = true,
    className = 'react-select',
    isMulti = false,
    onSelectChange,
    onInputChange,
  } = props;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id]?.message
    ) {
      setError(formState?.errors[id]?.message);
    } else {
      setError(null);
    }
    
    return () => {
      setError(null);
    };
  }, [formState]);

  return (
    <>
      {label && (
        <div className="block col-10 pb-2">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="">
        <Controller
          control={control}
          name={name}
          {...register(id)}
          render={({ field }) => (
            <Select
              className={`${className}`}
              defaultValue={defaultValue}
              placeholder={placeholder}
              allowClear={isClearable}
              mode={isMulti ? 'multiple' : undefined}
              options={options}
              disabled={disabled}
              onChange={(value) => {
                field.onChange(value);
                if (onSelectChange) {
                  onSelectChange(value);
                }
              }}
              // value={field.value}
              ref={field.ref}
              // classNamePrefix="ant-react-select"
              onSearch={onInputChange}
            />
          )}
        />
        {showError && error && (
          <span className="ant-typography ant-typography-danger block">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export const InputAfterField = (props: InputAfterFieldProps) => {
  const {
    register,
    formState,
    id,
    label,
    placeholder,
    defaultValue,
    className = 'ant-input input-border',
    showError = true,
    disabled,
    readOnly = false,
    value,
    addonAfter,
    control,
  } = props;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message);
    }
    
    return () => {
      setError(null);
    };
  }, [formState]);

  return (
    <>
      {label && (
        <div className="block pb-2">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="">
        <Controller
          control={control}
          name={id}
          render={() => (
            <Input
              {...register(id)}
              {...{
                id,
                className: `${className} ${
                  error ? 'ant-input-status-error' : ''
                }`,
                defaultValue,
                placeholder,
                disabled,
                readOnly,
                value,
                addonAfter,
              }}
            />
          )}
        />
        {showError && error && (
          <span className="ant-typography ant-typography-danger block">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export const InputDateField = (props: InputDateFieldProps) => {
  const {
    register,
    formState,
    id,
    label,
    showError = true,
    dateFormat,
    className,
    disabled,
    setValue,
    defaultValue = null,
    allowClear = false,
    onChange,
    isDefaultOpen = false,
    disabledDate,
  } = props;

  const [error, setError] = useState(null);
  const [date, setDate] = useState<Dayjs>();
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  useEffect(() => {
    if (defaultValue) {
      setDate(dayjs(defaultValue, 'YYYY-MM-DD'));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message);
    } else {
      setError(null);
    }
    
    return () => {
      setError(null);
    };
  }, [formState]);

  return (
    <>
      {label && (
        <div className="block col-10 pb-2">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="">
        <DatePicker
          {...register(id)}
          onChange={(value, stringValue) => {
            if (value) {
              setDate(value);
            }
            if (setValue) {
              setValue(`${id}`, stringValue);
            }
            if (onChange) {
              onChange(stringValue);
            }
          }}
          value={date}
          format={dateFormat}
          allowClear={allowClear}
          disabled={disabled}
          className={`${className} ant-input input-border `}
          inputReadOnly
          open={isOpen}
          onOpenChange={(open: boolean) => {
            setIsOpen(open);
          }}
          disabledDate={disabledDate}
          suffixIcon={<BlackCalendarIcon />}
        />
        {showError && error && (
          <span className="ant-typography ant-typography-danger block">
            {error}
          </span>
        )}
      </div>
    </>
  );
};
