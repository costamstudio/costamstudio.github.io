import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../../hooks/useScrollState";
import { SectionIds } from "../../../types/section-ids.enum";

import "./CosArt.component.scss";

interface Props {
    scrollPosition: number;
    appHeight: number;
    appWidth: number;
}

export const CosArt = ({ scrollPosition, appHeight, appWidth }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftItemRef = useRef<HTMLDivElement>(null);
    const rightItemRef = useRef<HTMLDivElement>(null);

    const {
        isStarted, isEnded, isAppearanceActive, isDisappearanceActive,
        appearancePercentage, disappearancePercentage, getCurrentPropertyValue,
        visibility
    } = useScrollState(SectionIds.COS_ART, scrollPosition);

    const centerStartAppearanceY = useMemo(() => {
        if (appHeight && containerRef.current) {
            const { top } = containerRef.current.getBoundingClientRect();
            return appHeight - top;
        }
        return 0;
    }, [appHeight, containerRef.current]);

    const sideStartAppearanceY = useMemo(() => {
        if (appHeight && containerRef.current && leftItemRef.current) {
            const { top } = containerRef.current.getBoundingClientRect();
            const { height } = leftItemRef.current.getBoundingClientRect();
            return appHeight - top - (height / 2);
        }
        return 0;
    }, [appHeight, containerRef.current, leftItemRef.current]);

    const endDisappearanceY = useMemo(() => {
        if (containerRef.current) {
            return -containerRef.current.getBoundingClientRect().bottom;
        }
        return 0;
    }, [containerRef.current]);

    const leftStartAppearanceX = useMemo(() => {
        if (leftItemRef.current) {
            const { left, width } = leftItemRef.current.getBoundingClientRect();
            return -(left + width);
        }
        return 0;
    }, [leftItemRef.current]);

    const rightStartAppearanceX = useMemo(() => {
        if (appWidth && rightItemRef.current) {
            const { left } = rightItemRef.current.getBoundingClientRect();
            return appWidth - left;
        }
        return 0;
    }, [appWidth, rightItemRef.current]);

    const getY = useCallback((startY: number) => {
        if (!isStarted) {
            return startY;
        }
        if (isAppearanceActive) {
            return getCurrentPropertyValue(startY, 0, appearancePercentage);
        }
        if (isDisappearanceActive) {
            return getCurrentPropertyValue(0, endDisappearanceY, disappearancePercentage);
        }
        if (isEnded) {
            return endDisappearanceY;
        }
        return 0;
    }, [isStarted, isAppearanceActive, isDisappearanceActive, isEnded, appearancePercentage, endDisappearanceY, disappearancePercentage]);

    const getX = useCallback((startX: number) => {
        if (!isStarted) {
            return startX;
        }
        if (isAppearanceActive) {
            return getCurrentPropertyValue(startX, 0, appearancePercentage);
        }
        return 0;
    }, [isStarted, isAppearanceActive, appearancePercentage]);

    const centerY = useMemo(() => {
        return getY(centerStartAppearanceY);
    }, [centerStartAppearanceY, getY]);

    const sideY = useMemo(() => {
        return getY(sideStartAppearanceY);
    }, [sideStartAppearanceY, getY]);

    const leftX = useMemo(() => {
        return getX(leftStartAppearanceX);
    }, [leftStartAppearanceX, getX]);

    const rightX = useMemo(() => {
        return getX(rightStartAppearanceX);
    }, [rightStartAppearanceX, getX]);

    const leftStyles = useSpring({
        transform: `translate(${leftX}px, ${sideY}px)`,
    });

    const centerStyles = useSpring({
        transform: `translateY(${centerY}px)`,
    });

    const rightStyles = useSpring({
        transform: `translate(${rightX}px, ${sideY}px)`,
    });

    return (
        <div ref={containerRef} className="cos-art" style={{ visibility }}>
            <animated.div
                ref={leftItemRef}
                className="cos-one"
                style={leftStyles}
            />
            <animated.div
                className="cos-two"
                style={centerStyles}
            />
            <animated.div
                ref={rightItemRef}
                className="cos-three"
                style={rightStyles}
            />
        </div>
    );
};