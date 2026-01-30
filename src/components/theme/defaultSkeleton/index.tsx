import { Spin } from 'antd';
import React from 'react';

import defaultSkeletonStyles from './defaultSkeleton.module.scss';

interface DefaultSkeletonProps {
  isContent?: boolean;
}
export const DefaultSkeleton = (props: DefaultSkeletonProps) => {
  const { isContent = false } = props;
  return (
    <div
      className={`${defaultSkeletonStyles.wrapper} ${
        isContent ? defaultSkeletonStyles.layoutLoader : ''
      } `}
    >
      <div className={defaultSkeletonStyles.backdrop} />
      <div className={defaultSkeletonStyles.preLoader}>
        <Spin tip="Loading..." className="font-medium" />
        {/* <span>loading...</span> */}
      </div>
    </div>
  );
};
