import * as React from "react";
import { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../../hooks/useScrollState";
import { START_SCALE } from "./constants";
import { SectionIds } from "../../../types/section-ids.enum";

import "./TamText.component.scss";

interface Props {
    scrollPosition: number;
    appHeight: number;
}

export const TamText = ({ scrollPosition, appHeight }: Props) => {
    const { formatMessage } = useIntl();

    const {
        isStarted, isEnded,
        isAppearanceActive, isDisappearanceActive,
        appearancePercentage, disappearancePercentage, getCurrentPropertyValue,
        visibility
    } = useScrollState(SectionIds.TAM_TEXT, scrollPosition);

    const scale = useMemo(() => {
        if (!isStarted) {
            return START_SCALE;
        }
        if (isAppearanceActive) {
            return getCurrentPropertyValue(START_SCALE, 1, appearancePercentage);
        }
        return 1;
    }, [isStarted, isAppearanceActive, appearancePercentage]);

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
        visibility,
        transform: `scale(${scale}) translateY(${y}px) translateZ(0)`,
    });

    return (
        <animated.div className="tam-text" style={styles}>
            <FormattedMessage
                id="tamDescription"
                values={{
                    tam: <span className="highlighted">{formatMessage({ id: "tam" })}</span>,
                    cosTam: <span className="highlighted">{formatMessage({ id: "cosTam" })}</span>,
                }}
            />
        </animated.div>
    );
};