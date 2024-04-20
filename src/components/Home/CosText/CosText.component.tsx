import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../../hooks/useScrollState";
import { LINE_ANIMATION_OFFSET } from "./constants";
import { SectionIds } from "../../../types/section-ids.enum";
import { nullifyTransforms } from "../../../utils/common";

import "./CosText.component.scss";

interface Props {
    scrollPosition: number;
    appHeight: number;
    appWidth: number;
}

export const CosText = ({ scrollPosition, appHeight, appWidth }: Props) => {
    const { formatMessage } = useIntl();

    const firstLineRef = useRef<HTMLDivElement>(null);
    const secondLineRef = useRef<HTMLDivElement>(null);
    const thirdLineRef = useRef<HTMLDivElement>(null);

    const {
        isStarted, isEnded,
        isAppearanceActive, isDisappearanceActive,
        appearancePercentage, disappearancePercentage, getCurrentPropertyValue,
        visibility
    } = useScrollState(SectionIds.COS_TEXT, scrollPosition);

    const firstLineStartY = useMemo(() => {
        if (firstLineRef.current) {
            return nullifyTransforms(firstLineRef.current).height;
        }
        return 0;
    }, [firstLineRef.current, appHeight, appWidth]);

    const firstLineEndY = useMemo(() => {
        return -firstLineStartY;
    }, [firstLineStartY]);

    const getY = useCallback((startY: number, endY: number) => {
        if (!isStarted) {
            return startY;
        }
        if (isAppearanceActive) {
            return getCurrentPropertyValue(startY, 0, appearancePercentage);
        }
        if (isDisappearanceActive) {
            return getCurrentPropertyValue(0, endY, disappearancePercentage);
        }
        if (isEnded) {
            return endY;
        }
        return 0;
    }, [isStarted, isAppearanceActive, isDisappearanceActive, isEnded, appearancePercentage, disappearancePercentage]);

    const firstLineY = useMemo(() => {
        return getY(firstLineStartY, firstLineEndY - LINE_ANIMATION_OFFSET * 4);
    }, [getY, firstLineStartY, firstLineEndY]);

    const secondLineY = useMemo(() => {
        return getY(firstLineStartY + LINE_ANIMATION_OFFSET, firstLineEndY - LINE_ANIMATION_OFFSET * 3);
    }, [getY, firstLineStartY, firstLineEndY]);

    const thirdLineY = useMemo(() => {
        return getY(firstLineStartY + LINE_ANIMATION_OFFSET * 2, firstLineEndY - LINE_ANIMATION_OFFSET * 2);
    }, [getY, firstLineStartY, firstLineEndY]);

    const fourthLineY = useMemo(() => {
        return getY(firstLineStartY + LINE_ANIMATION_OFFSET * 3, firstLineEndY - LINE_ANIMATION_OFFSET);
    }, [getY, firstLineStartY, firstLineEndY]);

    const fifthLineY = useMemo(() => {
        return getY(firstLineStartY + LINE_ANIMATION_OFFSET * 4, firstLineEndY);
    }, [getY, firstLineStartY, firstLineEndY]);

    const firstLineStyles = useSpring({
        transform: `translateY(${firstLineY}px)`,
    });

    const secondLineStyles = useSpring({
        transform: `translateY(${secondLineY}px)`,
    });

    const thirdLineStyles = useSpring({
        transform: `translateY(${thirdLineY}px)`,
    });

    const fourthLineStyles = useSpring({
        transform: `translateY(${fourthLineY}px)`,
    });

    const fifthLineStyles = useSpring({
        transform: `translateY(${fifthLineY}px)`,
    });

    return (
        <div className="cos-text" style={{ visibility }}>
            <div className="line-container">
                <animated.div ref={firstLineRef} className="line-text" style={firstLineStyles}>
                    <FormattedMessage
                        id="cosDescriptionOne"
                        values={{ cos: <span className="highlighted">{formatMessage({ id: "cos" })}</span> }}
                    />
                </animated.div>
            </div>
            <div className="line-container">
                <animated.div ref={secondLineRef} className="line-text" style={secondLineStyles}>
                    <FormattedMessage id="cosDescriptionTwo"/>
                </animated.div>
            </div>
            <div className="line-container">
                <animated.div ref={thirdLineRef} className="line-text" style={thirdLineStyles}>
                    <FormattedMessage id="cosDescriptionThree"/>
                </animated.div>
            </div>
            <div className="line-container">
                <animated.div ref={thirdLineRef} className="line-text" style={fourthLineStyles}>
                    <FormattedMessage id="cosDescriptionFour"/>
                </animated.div>
            </div>
            <div className="line-container">
                <animated.div ref={thirdLineRef} className="line-text" style={fifthLineStyles}>
                    <FormattedMessage id="cosDescriptionFive"/>
                </animated.div>
            </div>
        </div>
    );
};