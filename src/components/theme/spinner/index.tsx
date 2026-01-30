import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Spinner = ({ className }: any) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return <Spin indicator={antIcon} className={className} />;
};

export default Spinner;
