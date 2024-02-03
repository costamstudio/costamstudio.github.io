import { useCallback, useMemo } from 'react';

import { SectionIds } from '../types/section-ids.enum';
import { SECTION_BREAKPOINTS } from '../constants/common';

interface ScrollState {
  isStarted: boolean;
  isEnded: boolean;
  isActive: boolean;
  isAppearanceStarted: boolean;
  isAppearanceEnded: boolean;
  isAppearanceActive: boolean;
  isDisappearanceStarted: boolean;
  isDisappearanceEnded: boolean;
  isDisappearanceActive: boolean;
  visibility: "visible" | "hidden";
  appearancePercentage: number;
  disappearancePercentage: number;
  getCurrentPropertyValue: (start: number, end: number, percentage: number) => number;
}

const VISIBILITY_OFFSET = 5;

export const useScrollState = (sectionId: SectionIds, scrollPosition: number): ScrollState => {
  const { startAppearance, endAppearance, startDisappearance, endDisappearance } = SECTION_BREAKPOINTS[sectionId];

  const isStarted = useMemo(() => {
    return scrollPosition >= startAppearance;
  }, [scrollPosition, startAppearance]);

  const isEnded = useMemo(() => {
    return scrollPosition > endDisappearance;
  }, [scrollPosition, endDisappearance]);

  const isActive = useMemo(() => {
    return isStarted && !isEnded;
  }, [isStarted, isEnded]);

  const isAppearanceStarted = useMemo(() => {
    return scrollPosition >= startAppearance;
  }, [scrollPosition, startAppearance]);

  const isAppearanceEnded = useMemo(() => {
    return scrollPosition > endAppearance;
  }, [scrollPosition, endAppearance]);

  const isAppearanceActive = useMemo(() => {
    return isAppearanceStarted && !isAppearanceEnded;
  }, [isAppearanceStarted, isAppearanceEnded]);

  const isDisappearanceStarted = useMemo(() => {
    return scrollPosition >= startDisappearance;
  }, [scrollPosition, startDisappearance]);

  const isDisappearanceEnded = useMemo(() => {
    return scrollPosition > endDisappearance;
  }, [scrollPosition, endDisappearance]);

  const isDisappearanceActive = useMemo(() => {
    return isDisappearanceStarted && !isDisappearanceEnded;
  }, [isDisappearanceStarted, isDisappearanceEnded]);

  const visibility = useMemo(() => {
    return scrollPosition >= startAppearance - VISIBILITY_OFFSET
    && (!endDisappearance || scrollPosition <= endDisappearance + VISIBILITY_OFFSET) ? "visible" : "hidden";
  }, [scrollPosition]);

  const appearancePercentage = useMemo(() => {
    return (endAppearance - scrollPosition) / (endAppearance - startAppearance) * 100;
  }, [scrollPosition, startAppearance, endAppearance]);

  const disappearancePercentage = useMemo(() => {
    return (endDisappearance - scrollPosition) / (endDisappearance - startDisappearance) * 100;
  }, [scrollPosition, startDisappearance, endDisappearance]);

  const getCurrentPropertyValue = useCallback((start: number, end: number, percentage: number) => {
    return start + (end - start) - ((end - start) / 100 * percentage);
  }, []);

  return {
    isStarted,
    isEnded,
    isActive,
    isAppearanceStarted,
    isAppearanceEnded,
    isAppearanceActive,
    isDisappearanceStarted,
    isDisappearanceEnded,
    isDisappearanceActive,
    visibility,
    appearancePercentage,
    disappearancePercentage,
    getCurrentPropertyValue,
  };
}