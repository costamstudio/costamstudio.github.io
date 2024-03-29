import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { animated, useSpring } from "react-spring";

import { BRUSH_RADIUS, CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { getRandomNumberInRange } from "../../utils/common";
import { useScrollState } from "../../hooks/useScrollState";
import { SectionIds } from "../../types/section-ids.enum";

import "./MainBrandArt.component.scss";

interface Props {
    logoImages: HTMLImageElement[];
    scrollPosition: number;
}

export const MainBrandArt = ({ logoImages, scrollPosition }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const [fillStylePattern, setFillStylePattern] = useState<CanvasPattern | null>(null);
    const [brushImageIndex, setBrushImageIndex] = useState(0);
    const { formatMessage } = useIntl();

    const {
        isEnded, isDisappearanceActive,
        disappearancePercentage, getCurrentPropertyValue
    } = useScrollState(SectionIds.MAIN_BRAND_ART, scrollPosition);

    const endDisappearanceY = useMemo(() => {
        if (containerRef.current) {
            return -containerRef.current.getBoundingClientRect().bottom;
        }
        return 0;
    }, [containerRef.current]);

    const y = useMemo(() => {
        if (isDisappearanceActive) {
            return getCurrentPropertyValue(0, endDisappearanceY, disappearancePercentage);
        }
        if (isEnded) {
            return endDisappearanceY;
        }
        return 0;
    }, [isDisappearanceActive, isEnded, endDisappearanceY, disappearancePercentage]);

    const onMouseMove = useCallback((event: React.MouseEvent) => {
        if (canvas && canvasContext && fillStylePattern) {
            const canvasRect = canvas.getBoundingClientRect();
            const x = event.clientX - canvasRect.left;
            const y = event.clientY - canvasRect.top;
            canvasContext.fillStyle = fillStylePattern;
            canvasContext.beginPath();
            canvasContext.moveTo(x + BRUSH_RADIUS, y);
            canvasContext.arc(x, y, BRUSH_RADIUS, 0, 2 * Math.PI);
            canvasContext.fill();
        }
    }, [canvas, canvasContext, fillStylePattern]);

    const updateFillStylePattern = useCallback((currentImageIndex: number) => {
        if (logoImages.length && canvasContext) {
            const imageIndex = getRandomNumberInRange(0, logoImages.length - 1, currentImageIndex);
            const pattern = document.createElement('canvas');
            pattern.width = CANVAS_WIDTH;
            pattern.height = CANVAS_HEIGHT;
            pattern.getContext('2d')?.drawImage(logoImages[imageIndex], 0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
            setFillStylePattern(canvasContext.createPattern(pattern, "no-repeat"));
            setBrushImageIndex(imageIndex);
        }
    }, [logoImages.length, canvasContext])

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
            canvasContext.drawImage(logoImages[backgroundLogoIndex], 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            updateFillStylePattern(backgroundLogoIndex);
        }
    }, [canvasContext, logoImages.length]);

    const styles = useSpring({
        transform: `translateY(${y}px)`,
    });

    return (
        <animated.div ref={containerRef} className="main-brand-art" style={styles}>
            <div className="logo-canvas-container">
                <canvas
                    ref={canvasRef}
                    className="logo-canvas"
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                />
                <div className="logo-canvas-postfix">{formatMessage({ id: "studio" })}</div>
            </div>
        </animated.div>
    );
};