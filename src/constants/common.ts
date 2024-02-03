import { SectionIds } from '../types/section-ids.enum';
import { Breakpoint } from '../types/breakpoint.interface';

export const MAX_SCROLL_POSITION = 160;

export const SECTION_BREAKPOINTS: Record<SectionIds, Breakpoint> = {
  [SectionIds.MAIN_BRAND_ART]: {
    startAppearance: 0,
    endAppearance: 0,
    startDisappearance: 0,
    endDisappearance: 10,
  },
  [SectionIds.HEADER]: {
    startAppearance: 0,
    endAppearance: 0,
    startDisappearance: 0,
    endDisappearance: 10,
  },
  [SectionIds.COS_ART]: {
    startAppearance: 10,
    endAppearance: 20,
    startDisappearance: 30,
    endDisappearance: 40,
  },
  [SectionIds.COS_TEXT]: {
    startAppearance: 10,
    endAppearance: 20,
    startDisappearance: 30,
    endDisappearance: 40,
  },
  [SectionIds.TAM_ART]: {
    startAppearance: 40,
    endAppearance: 50,
    startDisappearance: 80,
    endDisappearance: 90,
  },
  [SectionIds.TAM_TEXT]: {
    startAppearance: 60,
    endAppearance: 70,
    startDisappearance: 80,
    endDisappearance: 90,
  },
  [SectionIds.COS_TAM_VIDEO]: {
    startAppearance: 80,
    endAppearance: 90,
    startDisappearance: 150,
    endDisappearance: 160,
  },
  [SectionIds.MISSION_TEXT]: {
    startAppearance: 90,
    endAppearance: 100,
    startDisappearance: 110,
    endDisappearance: 120,
  },
  [SectionIds.ABOUT_TEXT]: {
    startAppearance: 120,
    endAppearance: 130,
    startDisappearance: 140,
    endDisappearance: 150,
  },
  [SectionIds.CONTACT]: {
    startAppearance: 150,
    endAppearance: 160,
    startDisappearance: 0,
    endDisappearance: 0,
  },
}