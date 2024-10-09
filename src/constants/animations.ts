import { keyframes } from '@emotion/react';

export const BOTTOM_OPACITY_ANIMATION_PROPS = {
  keyframes: keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, 60px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  `,
  duration: 700,
  damping: 0.2,
  triggerOnce: true,
  cascade: true,
};

export const LEFT_RIGHT_ANIMATION_PROPS = {
  keyframes: keyframes`
    from {
      mask-image: linear-gradient(90deg, #fff 33.33%, transparent 66.66%);
      mask-position: 100% 0;
      mask-size: 300% 100%;
    }

    to {
      mask-position: 0 0;
    }
  `,
  duration: 1300,
  triggerOnce: true,
};