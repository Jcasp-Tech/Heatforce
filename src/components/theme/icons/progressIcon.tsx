import React from 'react';

export interface ProgressIconProps {
  sqSize: number;
  strokeWidth: number;
  percentage: number;
  children: any;
}

export const ProgressIcon = (props: ProgressIconProps) => {
  const { sqSize, strokeWidth, percentage, children } = props;

  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="circle-background"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="circle-progress"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
        stroke="url(#gradient1)"
      />

      <circle
        className="circle-dashes"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        style={{
          strokeDasharray: '0 1',
        }}
      />

      <text x="32%" y="60%" fill="url(#gradient)" className="circle-text">
        {children >= 10 ? children : `0${children}`}
      </text>

      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#FFDA88" />
          <stop offset="100%" stopColor="#FF9B04" />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF9B04" />
          <stop offset="70%" stopColor="#FF9B04" />
          <stop offset="100%" stopColor="#FFDA88" />
        </linearGradient>
      </defs>
    </svg>
  );
};

<svg
  width="107"
  height="107"
  viewBox="0 0 107 107"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M107 53.5C107 83.0472 83.0472 107 53.5 107C23.9528 107 0 83.0472 0 53.5C0 23.9528 23.9528 0 53.5 0C83.0472 0 107 23.9528 107 53.5ZM9.095 53.5C9.095 78.0242 28.9758 97.905 53.5 97.905C78.0242 97.905 97.905 78.0242 97.905 53.5C97.905 28.9758 78.0242 9.095 53.5 9.095C28.9758 9.095 9.095 28.9758 9.095 53.5Z"
    fill="#FFF4DE"
  />
  <path
    d="M53.5 4.54751C53.5 2.03599 55.5396 -0.0200676 58.0421 0.193151C64.4779 0.741522 70.7743 2.45205 76.6216 5.25438C83.8388 8.7132 90.1881 13.7472 95.2016 19.9854C100.215 26.2237 103.765 33.5072 105.59 41.2996C107.069 47.6129 107.385 54.1298 106.536 60.5329C106.206 63.0226 103.759 64.5721 101.306 64.0318C98.8535 63.4915 97.3279 61.0652 97.6146 58.5701C98.197 53.503 97.9032 48.3617 96.7349 43.3736C95.2201 36.906 92.2735 30.8606 88.1123 25.6829C83.9511 20.5051 78.6812 16.327 72.691 13.4561C68.071 11.242 63.1134 9.84909 58.0396 9.32766C55.5413 9.0709 53.5 7.05902 53.5 4.54751Z"
    fill="url(#paint0_linear_965_4714)"
  />
  <path
    d="M39.386 38.938C47.804 38.938 51.576 45.516 51.576 55.13C51.576 63.364 48.08 71.414 39.386 71.414C31.152 71.414 27.196 64.468 27.196 55.544C27.196 45.286 30.738 38.938 39.386 38.938ZM39.386 65.342C43.112 65.342 45.458 61.8 45.458 54.118C45.458 47.172 42.882 44.642 39.386 44.642C36.028 44.642 33.36 47.816 33.36 54.164C33.36 61.984 35.66 65.342 39.386 65.342ZM67.7673 49.978C74.6673 49.978 78.7613 54.486 78.7153 61.202C78.7153 66.4 74.9433 71.368 66.5713 71.414C56.1293 71.506 54.4733 63.272 54.4733 63.272L60.6373 61.708C60.6373 61.708 61.6953 66.124 66.7093 66.032C70.6653 65.986 72.8273 63.364 72.6893 60.42C72.5513 57.798 70.0673 55.268 67.0313 55.268C62.1553 55.222 60.7753 58.994 60.7753 58.994L55.0253 56.372L57.6473 39.26H75.4493L75.4953 44.872H62.8913L61.6493 52.232C61.6493 52.232 63.9033 49.932 67.7673 49.978Z"
    fill="url(#paint1_linear_965_4714)"
  />
  <defs>
    <linearGradient
      id="paint0_linear_965_4714"
      x1="55.5"
      y1="-1.5"
      x2="104"
      y2="68.5"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor="#FFDA88" />
      <stop offset="1" stopColor="#FF9B04" />
    </linearGradient>
    <linearGradient
      id="paint1_linear_965_4714"
      x1="53.5"
      y1="36"
      x2="53.5"
      y2="71"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor="#FFDA88" />
      <stop offset="1" stopColor="#FF9B04" />
    </linearGradient>
  </defs>
</svg>;
