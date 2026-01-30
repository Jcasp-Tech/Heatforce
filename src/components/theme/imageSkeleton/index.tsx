import { Spin } from 'antd';
import React from 'react';

import imageSkeletonStyles from './imageSkeleton.module.scss';

interface DefaultSkeletonProps {
  isContent?: boolean;
}
export const ImageSkeleton = (props: DefaultSkeletonProps) => {
  const { isContent = false } = props;
  return (
    <div
      className={`${imageSkeletonStyles.wrapper} ${
        isContent ? imageSkeletonStyles.layoutLoader : ''
      } `}
    >
      <div className={imageSkeletonStyles.backdrop} />
      <div className={imageSkeletonStyles.preLoader}>
        <Spin tip="Loading..." className="font-medium" />
        {/* <span>loading...</span> */}
      </div>
    </div>
  );
};
