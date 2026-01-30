export interface ButtonFillProps {
  // color?: 'light' | 'dark';
  text?: string;
  // fillButton?: string;
  // className?: string;
}
export const ButtonFill = (props: ButtonFillProps) => {
  const { text } = props;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100% 100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="98%"
        height="96%"
        rx="13"
        fill="url(#paint0_linear_765_60140)"
      />
      <rect
        x="1"
        y="1"
        width="98%"
        height="96%"
        rx="13"
        stroke="url(#paint1_linear_765_60140)"
        strokeWidth="2"
      />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Roboto"
        font-size="16"
        fill="black"
      >
        {text || 'button'}
      </text>

      <defs>
        <linearGradient
          id="paint0_linear_765_60140"
          x1="72"
          y1="0"
          x2="72"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0A1E34" />
          <stop offset="1" stop-color="#0F3B59" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_765_60140"
          x1="72"
          y1="0"
          x2="72"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0F3B59" />
          <stop offset="1" stop-color="#0A1E34" />
        </linearGradient>
      </defs>
    </svg>
  );
};
