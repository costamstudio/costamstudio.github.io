import { useCallback, useEffect, useRef, useState } from "react";

import { getRandomNumberInRange } from "../../../utils/common";

import "./LogoArt.scss";
import { useIntl } from "react-intl";

interface Props {
    logoImages: HTMLImageElement[];
    logoArtBackground: HTMLVideoElement | null;
}

export const LogoArt = ({ logoArtBackground, logoImages }: Props) => {
    const brashRadius = 40;
    const canvasWidth = 870;
    const canvasHeight = 688;

    const { formatMessage } = useIntl();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const [fillStylePattern, setFillStylePattern] = useState<CanvasPattern | null>(null);
    const [brushImageIndex, setBrushImageIndex] = useState(0);

    const clearCircle = useCallback((x: number, y: number , radius: number, canvasContext: CanvasRenderingContext2D) => {
        for (let i = 0 ; i < Math.round(Math.PI * radius); i++) {
            const angle = (i / Math.round(Math.PI * radius)) * 360;
            canvasContext.clearRect(x , y , Math.sin(angle * (Math.PI / 180)) * radius , Math.cos(angle * (Math.PI / 180)) * radius);
        }
    }, []);

    const onMouseMove = useCallback((event: React.MouseEvent) => {
        if (canvas && canvasContext && fillStylePattern) {
            const canvasRect = canvas.getBoundingClientRect();
            const x = event.clientX - canvasRect.left;
            const y = event.clientY - canvasRect.top;
            clearCircle(x, y, brashRadius - 1, canvasContext);
            canvasContext.fillStyle = fillStylePattern;
            canvasContext.beginPath();
            canvasContext.moveTo(x + brashRadius, y);
            canvasContext.arc(x, y, brashRadius, 0, 2 * Math.PI);
            canvasContext.fill();
        }
    }, [canvas, canvasContext, fillStylePattern]);

    const updateFillStylePattern = useCallback((currentImageIndex: number) => {
        if (logoImages.length && canvasContext) {
            const imageIndex = getRandomNumberInRange(0, logoImages.length - 1, currentImageIndex);
            const pattern = document.createElement('canvas');
            pattern.width = canvasWidth;
            pattern.height = canvasHeight;
            pattern.getContext('2d')?.drawImage(logoImages[imageIndex], 0,0, canvasWidth, canvasHeight);
            setFillStylePattern(canvasContext.createPattern(pattern, "no-repeat"));
            setBrushImageIndex(imageIndex);
        }
    }, [logoImages.length, canvasContext, canvasWidth, canvasHeight]);

    const onMouseLeave = useCallback(() => {
        updateFillStylePattern(brushImageIndex);
    }, [brushImageIndex]);

    useEffect(() => {
        setCanvas(canvasRef.current);
        setCanvasContext(canvasRef.current?.getContext("2d") || null);
    }, [canvas, canvasContext]);

    useEffect(() => {
        if (canvasContext && logoImages.length) {
            const backgroundLogoIndex = getRandomNumberInRange(0, logoImages.length - 1);
            canvasContext.drawImage(logoImages[backgroundLogoIndex], 0, 0, canvasWidth, canvasHeight);
            updateFillStylePattern(backgroundLogoIndex);
        }
    }, [canvasContext, logoImages.length, canvasHeight, canvasWidth]);

  return (
      <div className="logo-art">
          <video
              className="background-video"
              src={logoArtBackground?.src ?? ""}
              loop={true}
              autoPlay={true}
              muted={true}
          />
          <div className="logo-canvas-container">
              <div className="logo-canvas">
                  <canvas
                      ref={canvasRef}
                      width={canvasWidth}
                      height={canvasHeight}
                      onMouseMove={onMouseMove}
                      onMouseLeave={onMouseLeave}
                  />
                  <div className="logo-postfix"/>
              </div>
          </div>
          <div className="logo-art-hint">{formatMessage({ id: "scrollToExplore" })}</div>
      </div>
  );
};