/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
// ** React Imports
import { styled, useTheme } from '@mui/material/styles';
// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery';
import type { ReactNode } from 'react';

interface FooterIllustrationsProp {
  image?: ReactNode;
}

// Styled Components
const MaskImg = styled('img')(() => ({
  bottom: 0,
  zIndex: -1,
  height: 260,
  width: '100%',
  position: 'absolute',
}));

const FooterIllustrations = (props: FooterIllustrationsProp) => {
  // ** Props
  const { image } = props;

  // ** Hook
  const theme = useTheme();

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  if (!hidden) {
    return (
      <>
        {!image ? (
          <MaskImg
            alt="mask"
            src={`/images/pages/misc-mask-${theme.palette.mode}.png`}
          />
        ) : typeof image === 'string' ? (
          <MaskImg alt="mask" src={image} />
        ) : (
          image
        )}
      </>
    );
  }
  return null;
};

export default FooterIllustrations;
