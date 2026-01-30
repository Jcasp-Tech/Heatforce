import React from 'react';

interface MinusIconProps {
  onClick?: () => void;
}

const MinusIcon: React.FC<MinusIconProps> = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      onClick={onClick}
    >
      <circle cx="14" cy="14" r="14" fill="#C91010" />
      <g clipPath="url(#clip0_765_55923)">
        <path
          opacity="0.989"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3523 13.7413C20.3523 13.907 20.3523 14.0727 20.3523 14.2385C20.2111 14.7814 19.8631 15.1087 19.3082 15.2204C15.7618 15.2369 12.2154 15.2369 8.66903 15.2204C8.11415 15.1087 7.76614 14.7814 7.625 14.2385C7.625 14.0727 7.625 13.907 7.625 13.7413C7.76614 13.1984 8.11415 12.8711 8.66903 12.7594C12.2154 12.7428 15.7618 12.7428 19.3082 12.7594C19.8631 12.8711 20.2111 13.1984 20.3523 13.7413Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_765_55923">
          <rect
            width="12.7273"
            height="12.7273"
            fill="white"
            transform="translate(7.63672 7.63867)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MinusIcon;
