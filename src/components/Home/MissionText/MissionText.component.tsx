import * as React from "react";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../../hooks/useScrollState";
import { SectionIds } from "../../../types/section-ids.enum";

import "./MissionText.component.scss";

interface Props {
    scrollPosition: number;
    appHeight: number;
    appWidth: number;
}

export const MissionText = ({ scrollPosition }: Props) => {
    const {
        isStarted, isEnded,
        isAppearanceActive, isDisappearanceActive,
        appearancePercentage, disappearancePercentage, getCurrentPropertyValue,
        visibility
    } = useScrollState(SectionIds.MISSION_TEXT, scrollPosition);

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
        visibility,
        opacity,
    });

    return (
        <animated.div className="mission-text" style={styles}>
            <div className="mission-title">
                <FormattedMessage id="missionTitle"/>
            </div>
            <div className="mission-value">
                <FormattedMessage id="missionValue"/>
            </div>
        </animated.div>
    );
};