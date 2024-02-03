import * as React from "react";
import { useMemo } from "react";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../../hooks/useScrollState";
import { SectionIds } from "../../../types/section-ids.enum";

import "./CosTamVideo.component.scss";

interface Props {
    scrollPosition: number;
    appWidth: number;
    appHeight: number;
    cosTamVideo: HTMLVideoElement | null;
}

export const CosTamVideo = ({ scrollPosition, appHeight, appWidth, cosTamVideo }: Props) => {
    const {
        isStarted, isEnded, isAppearanceActive, isDisappearanceActive,
        appearancePercentage, disappearancePercentage, getCurrentPropertyValue,
        visibility
    } = useScrollState(SectionIds.COS_TAM_VIDEO, scrollPosition);

    const startTop = useMemo(() => {
        return appHeight ?? 0;
    }, [appHeight]);

    const endBottom = useMemo(() => {
        return appHeight ?? 0;
    }, [appHeight]);

    const top = useMemo(() => {
        if (!isStarted) {
            return startTop;
        }
        if (isAppearanceActive) {
            return getCurrentPropertyValue(startTop, 0, appearancePercentage);
        }
        return 0;
    }, [isStarted, isAppearanceActive, startTop,appearancePercentage]);

    const bottom = useMemo(() => {
        if (isDisappearanceActive) {
            return getCurrentPropertyValue(0, endBottom, disappearancePercentage);
        }
        if (isEnded) {
            return endBottom;
        }
        return 0;
    }, [isDisappearanceActive, isEnded, endBottom, disappearancePercentage]);

    const containerStyles = useSpring({
        visibility,
        top,
        bottom,
    });

    const videoStyles = useSpring({
        visibility,
        top: -top,
    });

    return (
        <animated.div className="cos-tam-video" style={containerStyles}>
            <animated.div className="cos-tam-video" style={videoStyles}>
                <video
                    className="video"
                    style={{width: appWidth, height: appHeight}}
                    src={cosTamVideo?.src ?? ""}
                    loop={true}
                    autoPlay={true}
                    muted={true}
                />
            </animated.div>
        </animated.div>
    );
};