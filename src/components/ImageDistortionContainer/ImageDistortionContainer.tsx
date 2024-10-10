import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import fx from "glfx";
import { useResizeDetector } from "react-resize-detector";

import "./ImageDistortionContainer.scss";

interface Props {
    src: string;
    isCarouselImage: boolean;
}

const canvas = fx.canvas();

export const ImageDistortionContainer = ({ src, isCarouselImage }: Props) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const { width: canvasWidth = 1, height: canvasHeight = 1, ref: containerRef } = useResizeDetector();

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<number | undefined>();

    const imageElement = useMemo(() => {
        const image = new Image();
        image.onload = () => {
            setIsImageLoaded(true);
            setAspectRatio(imageElement.naturalWidth / imageElement.naturalHeight);
        };
        image.src = src;
        return image;
    }, [src]);

    const texture = useMemo(() => {
        if (isImageLoaded && aspectRatio) {
            imageElement.width = canvasWidth;
            imageElement.height = canvasWidth / aspectRatio;
            return canvas.texture(imageElement);
        }
    }, [isImageLoaded, canvasWidth, aspectRatio]);

    const drawDefaultImage = useCallback(() => {
        const displayCanvas = ref.current;
        if (displayCanvas && isImageLoaded) {
            const ctx = displayCanvas.getContext("2d");
            canvas.draw(texture).update();
            ctx && drawImageProp(ctx);
        }
    }, [texture, isImageLoaded, canvasWidth, canvasHeight]);

    useEffect(() => {
        if (isImageLoaded) {
            drawDefaultImage();
        }
    }, [isImageLoaded, drawDefaultImage]);
    
    const drawImageProp = useCallback((ctx: CanvasRenderingContext2D) => {
        const offsetX = 0.5;
        const offsetY = 0.5;

        var iw = canvas.width,
            ih = canvas.height,
            r = Math.min(canvasWidth / iw, canvasHeight / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        if (nw < canvasWidth) ar = canvasWidth / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < canvasHeight) ar = canvasHeight / nh;  // updated
        nw *= ar;
        nh *= ar;

        cw = iw / (nw / canvasWidth);
        ch = ih / (nh / canvasHeight);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        ctx.drawImage(canvas, cx, cy, cw, ch,  0, 0, canvasWidth, canvasHeight);
    }, [canvasWidth, canvasHeight]);

    const onMouseMove = useCallback((event: React.MouseEvent) => {
        const displayCanvas = ref.current;
        if (displayCanvas && texture) {
            const canvasRect = displayCanvas.getBoundingClientRect();
            const x = event.clientX - canvasRect.left;
            const y = event.clientY - canvasRect.top;
            canvas.draw(texture).swirl(x, y, 200, 0.5).update();
            const ctx = displayCanvas.getContext("2d");
            ctx && ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx && drawImageProp(ctx);
        }
    }, [texture, canvasWidth, canvasHeight]);

    const onMouseLeave = useCallback(() => {
        if (isImageLoaded) {
            drawDefaultImage();
        }
    }, [isImageLoaded, drawDefaultImage]);

    return (
        <div ref={containerRef} className="image-distortion-container" style={{ aspectRatio }}>
            <canvas
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                width={canvasWidth}
                height={canvasHeight}
            />
        </div>
    )
};