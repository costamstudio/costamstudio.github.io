import { ReactNode } from "react";
import { useGlitch } from 'react-powerglitch'

import { GLITCH_CONFIG } from "./constants";

import "./GlitchContainer.scss";

interface Props {
  children: ReactNode;
}

export const GlitchContainer = ({ children }: Props) => {
    const glitch = useGlitch(GLITCH_CONFIG);

  return (
      <div className="glitch-container">
          <div ref={glitch.ref}>
              {children}
          </div>
      </div>
  );
};