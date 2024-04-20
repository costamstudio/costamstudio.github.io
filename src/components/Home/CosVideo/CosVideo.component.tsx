import * as React from "react";
import { useMemo } from "react";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../../hooks/useScrollState";
import { SectionIds } from "../../../types/section-ids.enum";

import "./CosVideo.component.scss";

interface Props {
    scrollPosition: number;
    appWidth: number;
    appHeight: number;
    cosVideo: HTMLVideoElement | null;
}

export const CosVideo = ({ scrollPosition, appHeight, appWidth, cosVideo }: Props) => {
    const {
        isStarted, isEnded, isAppearanceActive, isDisappearanceActive,
        appearancePercentage, disappearancePercentage, getCurrentPropertyValue,
    } = useScrollState(SectionIds.COS_VIDEO, scrollPosition);

    const opacity = useMemo(() => {
        if (!isStarted || isEnded) {
            return 0;
        }
        if (isAppearanceActive) {
            return getCurrentPropertyValue(0, 1, appearancePercentage);
        }
        if (isDisappearanceActive) {
            return getCurrentPropertyValue(1, 0, disappearancePercentage);
        }
        return 1;
    }, [isStarted, isAppearanceActive, appearancePercentage, isDisappearanceActive, isEnded, disappearancePercentage]);


    const styles = useSpring({
        opacity,
    });

    return (
        <animated.div className="cos-video" style={styles}>
            <video
                className="video"
                style={{width: appWidth, height: appHeight}}
                src={cosVideo?.src ?? ""}
                loop={true}
                autoPlay={true}
                muted={true}
            />
        </animated.div>
    );
};