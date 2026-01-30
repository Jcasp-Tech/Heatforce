import { Input } from 'antd';
import React from 'react';

interface SearchProps {
  onChange: (d: any) => void;
  placeholder: string;
  value?: string;
}

const SearchComponent = (props: SearchProps) => {
  const { onChange, placeholder, value } = props;

  return (
    <div className="flex custom-search">
      <Input
        placeholder={placeholder}
        allowClear
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchComponent;
