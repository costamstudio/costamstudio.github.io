import { useMediaQuery } from 'react-responsive';
import { useMemo } from 'react';

export const useResponsiveVariable = (hd: number, fhd: number, uhd: number) => {
  const isFullHDScreen = useMediaQuery({ query: '(min-width: 1920px)' });
  const isUltraHDScreen = useMediaQuery({ query: '(min-width: 3840px)' });

  const responsiveVariable = useMemo(() => {
    if (isUltraHDScreen) {
      return uhd;
    }
    if (isFullHDScreen) {
      return fhd;
    }
    return hd;
  }, [hd, fhd, uhd, isFullHDScreen, isUltraHDScreen]);

  return responsiveVariable;
};