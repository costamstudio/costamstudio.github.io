import * as React from "react";
import { useMemo, useRef } from "react";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../../hooks/useScrollState";
import { START_SCALE } from "./constants";
import { SectionIds } from "../../../types/section-ids.enum";

import "./TamArt.component.scss";

interface Props {
    scrollPosition: number;
    appHeight: number;
}

export const TamArt = ({ scrollPosition, appHeight }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const {
        isStarted, isEnded, isAppearanceActive, isDisappearanceActive, isActive,
        appearancePercentage, disappearancePercentage, getCurrentPropertyValue,
    } = useScrollState(SectionIds.TAM_ART, scrollPosition);

    const scale = useMemo(() => {
        if (!isStarted) {
            return START_SCALE;
        }
        if (isAppearanceActive) {
            return getCurrentPropertyValue(START_SCALE, 1, appearancePercentage);
        }
        return 1;
    }, [isStarted, isAppearanceActive, isDisappearanceActive, isEnded, appearancePercentage, disappearancePercentage]);

    const endY = useMemo(() => {
        return -appHeight ?? 0;
    }, [appHeight]);

    const y = useMemo(() => {
        if (isDisappearanceActive) {
            return getCurrentPropertyValue(0, endY, disappearancePercentage);
        }
        if (isEnded) {
            return endY;
        }
        return 0;
    }, [isDisappearanceActive, isEnded, endY, disappearancePercentage]);


    const styles = useSpring({
        visibility: isActive ? "visible" : "hidden" as "visible" | "hidden",
        transform: `scale(${scale}) translateY(${y}px)`,
    });

    return (
        <animated.div ref={ref} className="tam-art" style={styles}/>
    );
};