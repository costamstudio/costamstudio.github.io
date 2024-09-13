import { PowerGlitchOptions, RecursivePartial } from "powerglitch";

export const GLITCH_CONFIG: RecursivePartial<PowerGlitchOptions> = {
  playMode: "hover",
  timing: {
    duration: 600,
    iterations: 1,
  },
  slice: {
    count: 10,
    velocity: 5,
    maxHeight: 0.01,
    minHeight: 0.1,
    hueRotate: true
  },
};