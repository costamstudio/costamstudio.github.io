import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { TwistFilter } from "@pixi/filter-twist";
import * as PIXI from 'pixi.js';
import { Container, Sprite, Stage, withFilters } from "@pixi/react";

import { useResponsiveVariable } from "../../hooks/useResponsiveVariable";
import { setType } from "../../store/cursor";
import { CursorType } from "../../enums/CursorType";

import "./ImageDistortionContainer.scss";

interface Props {
    src: string;
    isCover?: boolean;
}

const Filters = withFilters(Container, { twist: TwistFilter });

export const ImageDistortionContainer = memo(({ src, isCover = false }: Props) => {
    const dispatch = useDispatch();
    const radius = useResponsiveVariable(100, 120, 240);
    const { width = 1, ref } = useResizeDetector();
    const [aspectRatio, setAspectRatio] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [angle, setAngle] = useState(0);

    const imageElement = useMemo(() => {
        const image = new Image();
        image.onload = () => {
            setAspectRatio(imageElement.naturalWidth / imageElement.naturalHeight);
        };
        image.src = src;
        return image;
    }, [src]);

    const offset = useMemo(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const x = position.x - rect.left;
            const y = position.y - rect.top;
            return new PIXI.Point(x, y);
        }
    }, [position, ref.current]);
    
    const height = useMemo(() => {
        const calculatedHeight = width / aspectRatio;
        if (isCover && ref.current) {
            const containerHeight = ref.current.offsetHeight;
            return calculatedHeight < containerHeight
                ? containerHeight
                : width / aspectRatio;
        }
        return calculatedHeight;
    }, [width, aspectRatio, isCover, ref]);

    const spriteDimensions = useMemo(() => {
        if (isCover && ref.current) {
            const containerWidth = ref.current.offsetWidth;
            const containerHeight = ref.current.offsetHeight;

            const containerAspectRatio = containerWidth / containerHeight;
            if (containerAspectRatio > aspectRatio) {
                return {
                    width: containerWidth,
                    height: containerWidth / aspectRatio,
                };
            } else {
                return {
                    width: containerHeight * aspectRatio,
                    height: containerHeight,
                };
            }
        }
        return { width, height };
    }, [isCover, width, height, aspectRatio, ref]);

    const onMouseMove = useCallback((event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    }, []);

    const onMouseEnter = useCallback(() => {
        dispatch(setType(CursorType.MORE));
        setAngle(1);
    }, []);

    const onMouseLeave = useCallback(() => {
        dispatch(setType(CursorType.DEFAULT));
        setAngle(0);
    }, []);

    return (
        <div
            ref={ref}
            className="image-distortion-container"
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Stage width={width} height={height}>
                <Filters twist={{ angle, radius, offset }}>
                    <Sprite
                        image={src}
                        anchor={0.5}
                        x={width / 2}
                        y={height / 2}
                        width={spriteDimensions.width}
                        height={spriteDimensions.height}
                    />
                </Filters>
            </Stage>
        </div>
    );
});