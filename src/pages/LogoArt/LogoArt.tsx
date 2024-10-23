import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useResizeDetector } from "react-resize-detector";
import { isMobile } from "react-device-detect";

import { getRandomNumberInRange, loadImages } from "../../utils/common";
import { useResponsiveVariable } from "../../hooks/useResponsiveVariable";

import "./LogoArt.scss";
import { setIsLogoArtImagesLoaded, setIsLogoArtVideoLoaded } from "../../store/assets";
import { useAppDispatch } from "../../store/hooks";

const LOGO_ART_IMAGE_NAMES = [
    "logo-blue.png",
    "logo-crystal.png",
    "logo-drinks.png",
    "logo-grass.png",
    "logo-salmon.png",
    "logo-yellow.png",
];

export const LogoArt = () => {
    const dispatch = useAppDispatch();
    const brashRadius = useResponsiveVariable(50, 60, 120);
    const { width: canvasWidth = 1, height: canvasHeight = 1, ref } = useResizeDetector();

    const { formatMessage } = useIntl();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const [fillStylePattern, setFillStylePattern] = useState<CanvasPattern | null>(null);
    const [brushImageIndex, setBrushImageIndex] = useState(0);

    const [drawInterval, setDrawInterval] = useState<ReturnType<typeof setInterval> | null>(null);
    const [logoImages, setLogoImages] = useState<HTMLImageElement[]>([]);

    const assets = require.context('../../assets', true);

    const loadLogoImages = useCallback(async () => {
        const images = await loadImages(LOGO_ART_IMAGE_NAMES.map(imageName => assets(`./images/${imageName}`)));
        setLogoImages(images);
    }, [logoImages, setLogoImages]);

    const clearCircle = useCallback((x: number, y: number , radius: number, canvasContext: CanvasRenderingContext2D) => {
        for (let i = 0 ; i < Math.round(Math.PI * radius); i++) {
            const angle = (i / Math.round(Math.PI * radius)) * 360;
            canvasContext.clearRect(x , y , Math.sin(angle * (Math.PI / 180)) * radius , Math.cos(angle * (Math.PI / 180)) * radius);
        }
    }, []);

    const draw = useCallback((event: React.TouchEvent, offset: number) => {
        if (canvas && canvasContext && fillStylePattern) {
            const canvasRect = canvas.getBoundingClientRect();

            const clientX = event.touches[0].clientX;
            const clientY = event.touches[0].clientY;
            const x = clientX - canvasRect.left;
            const y = clientY - canvasRect.top;
            clearCircle(x, y, brashRadius + offset, canvasContext);
            canvasContext.fillStyle = fillStylePattern;
            canvasContext.beginPath();
            canvasContext.moveTo(x + brashRadius, y);
            canvasContext.arc(x, y, brashRadius + offset, 0, 2 * Math.PI);
            canvasContext.fill();
        }
    }, [canvas, canvasContext, fillStylePattern]);

    const onTouchStart = useCallback((event: React.TouchEvent) => {
        let offset = 0
        draw(event, offset);
        setDrawInterval(setInterval(() => {
            offset = offset + 2;
            draw(event, offset);
        }, 10));
    }, [draw]);

    const onTouchEnd = useCallback(() => {
        if (drawInterval) {
            clearInterval(drawInterval);
        }
        updateFillStylePattern(brushImageIndex);
    }, [brushImageIndex, drawInterval]);

    const onMouseMove = useCallback((event: React.MouseEvent) => {
        if (!isMobile && canvas && canvasContext && fillStylePattern) {
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
        loadLogoImages();
        return () => {
            dispatch(setIsLogoArtImagesLoaded(false));
            dispatch(setIsLogoArtVideoLoaded(false));
        };
    }, []);

    useEffect(() => {
        setCanvas(canvasRef.current);
        setCanvasContext(canvasRef.current?.getContext("2d") || null);
    }, [canvas, canvasContext]);

    useEffect(() => {
        if (canvasContext && logoImages.length) {
            const backgroundLogoIndex = getRandomNumberInRange(0, logoImages.length - 1);
            canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
            canvasContext.drawImage(logoImages[backgroundLogoIndex], 0, 0, canvasWidth, canvasHeight);
            updateFillStylePattern(backgroundLogoIndex);
            dispatch(setIsLogoArtImagesLoaded(true));
        }
    }, [canvasContext, logoImages.length, canvasHeight, canvasWidth]);

  return (
      <div className={`logo-art${isMobile ? " mobile" : ""}`}>
          <video
              className="background-video"
              src={assets("./videos/logo-art-background.mp4")}
              loop={true}
              autoPlay={true}
              muted={true}
              onCanPlayThrough={() => dispatch(setIsLogoArtVideoLoaded(true))}
          />
          <div ref={ref} className="logo-canvas-container">
              <canvas
                  ref={canvasRef}
                  width={canvasWidth}
                  height={canvasHeight}
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
              />
              <div className="logo-postfix"/>
          </div>
          <div className="logo-art-hint">{formatMessage({ id: "scrollToExplore" })}</div>
      </div>
  );
};