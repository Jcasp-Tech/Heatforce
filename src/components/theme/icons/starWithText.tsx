import React from 'react';

interface StarWithTextProps {
  text: any;
}

const StarWithText = (props: StarWithTextProps) => {
  const { text } = props;
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55 0L64.9486 8.19564L77.3705 4.755L83.1255 16.2885L95.873 18.1978L96.4393 31.075L107.308 38.0041L102.588 49.9983L109.699 60.7491L100.508 69.7865L102.631 82.5L90.5595 87.0179L87.3282 99.4959L74.4623 98.7132L66.4351 108.798L55 102.85L43.5649 108.798L35.5377 98.7132L22.6718 99.4959L19.4405 87.0179L7.3686 82.5L9.49195 69.7865L0.301296 60.7491L7.41213 49.9983L2.69189 38.0041L13.5607 31.075L14.127 18.1978L26.8745 16.2885L32.6295 4.755L45.0514 8.19564L55 0Z"
        fill="url(#paint0_linear_1403_2897)"
      />
      <g filter="url(#filter0_d_1403_2897)">
        <text
          fill="url(#paint1_linear_1403_2897)"
          x="15%"
          y="80"
          font-size="65"
        >
          {text.length === 1 ? `0${text}` : text}
        </text>
      </g>
      <defs>
        <filter
          id="filter0_d_1403_2897"
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.816522 0 0 0 0 0.502475 0 0 0 0 0 0 0 0 0.56 0"
          />
          <feBlend
            mode="multiply"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1403_2897"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1403_2897"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1403_2897"
          x1="55"
          y1="0"
          x2="55"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFDA88" />
          <stop offset="1" stop-color="#FF9B04" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1403_2897"
          x1="65.4284"
          y1="24.9962"
          x2="12.8314"
          y2="179.049"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#FF8A00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StarWithText;
