import * as React from "react";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../../hooks/useScrollState";
import { SectionIds } from "../../../types/section-ids.enum";

import "./AboutText.component.scss";

interface Props {
    scrollPosition: number;
    appHeight: number;
    appWidth: number;
}

export const AboutText = ({ scrollPosition }: Props) => {
    const {
        isStarted, isEnded,
        isAppearanceActive, isDisappearanceActive,
        appearancePercentage, disappearancePercentage, getCurrentPropertyValue,
        visibility
    } = useScrollState(SectionIds.ABOUT_TEXT, scrollPosition);

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
        <animated.div className="about-text" style={styles}>
            <div className="about-title">
                <FormattedMessage id="aboutTitle"/>
            </div>
            <div className="about-value">
                <FormattedMessage id="aboutValue"/>
            </div>
        </animated.div>
    );
};