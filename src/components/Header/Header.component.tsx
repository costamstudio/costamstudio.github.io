import * as React from "react";
import { useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import { animated, useSpring } from "react-spring";

import { useScrollState } from "../../hooks/useScrollState";
import { SectionIds } from "../../types/section-ids.enum";
import { MAX_SCROLL_POSITION, SECTION_BREAKPOINTS } from "../../constants/common";

import "./Header.component.scss";

interface Props {
    scrollPosition: number;
    setScrollPosition: (scrollPosition: number) => void;
}

export const Header = ({ scrollPosition, setScrollPosition }: Props) => {
    const { formatMessage } = useIntl();
    const ref = useRef<HTMLDivElement>(null);

    const MENU_ITEMS = [
        {
            id: "works",
            titleId: "works",
            onClicked: () => null,
        },
        {
            id: "about",
            titleId: "about",
            onClicked: () => setScrollPosition(SECTION_BREAKPOINTS[SectionIds.MISSION_TEXT].endAppearance),
        },
        {
            id: "contacts",
            titleId: "contact",
            onClicked: () => setScrollPosition(MAX_SCROLL_POSITION),
        },
    ];

    const {
        isEnded, isDisappearanceActive,
        disappearancePercentage, getCurrentPropertyValue
    } = useScrollState(SectionIds.HEADER, scrollPosition);

    const endDisappearanceY = useMemo(() => {
        if (ref.current) {
            return -ref.current.getBoundingClientRect().top;
        }
        return 0;
    }, [ref.current]);

    const y = useMemo(() => {
        if (isDisappearanceActive) {
            return getCurrentPropertyValue(0, endDisappearanceY, disappearancePercentage);
        }
        if (isEnded) {
            return endDisappearanceY;
        }
        return 0;
    }, [isDisappearanceActive, isEnded, endDisappearanceY, disappearancePercentage]);

    const styles = useSpring({
        transform: `translateY(${y}px)`,
    });

    return (
        <animated.div ref={ref} className="header" style={styles}>
            <div className="logo" onClick={() => setScrollPosition(0)}/>
            <div className="menu-items">
                {MENU_ITEMS.map(item => (
                    <div
                        key={item.id}
                        className="menu-item"
                        onClick={item.onClicked}
                    >
                        {formatMessage({ id: item.titleId })}
                    </div>
                ))}
            </div>
        </animated.div>
    );
};