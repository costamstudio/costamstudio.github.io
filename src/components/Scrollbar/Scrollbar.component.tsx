import * as React from "react";
import { animated, useSpring } from "react-spring";
import { useEffect, useMemo, useState } from "react";

import { SCROLL_SIZE_FHD, SCROLL_SIZE_HD, SCROLL_SIZE_UHD } from "./constants";
import { MAX_SCROLL_POSITION } from "../../constants/common";
import { useResponsiveVariable } from "../../hooks/useResponsiveVariable";

import "./Scrollbar.component.scss";

interface Props {
    scrollPosition: number;
    appHeight: number;
    onScrollBarRendered: () => void;
}

export const Scrollbar = ({ scrollPosition, appHeight, onScrollBarRendered }: Props) => {
    const scrollSize = useResponsiveVariable(SCROLL_SIZE_HD, SCROLL_SIZE_FHD, SCROLL_SIZE_UHD);

    const [opacity, setOpacity] = useState(1);

    const top = useMemo(() => {
        return ((appHeight - scrollSize) / 100) * (scrollPosition / MAX_SCROLL_POSITION * 100);
    }, [appHeight, scrollPosition]);

    const styles = useSpring({
        opacity,
        top,
    });

    useEffect(() => {
        if (scrollPosition === MAX_SCROLL_POSITION) {
            setTimeout(() => {
                setOpacity(0);
            }, 1000);
        } else {
            setOpacity(1);
        }
    }, [scrollPosition]);

    return (
        <div className="scrollbar-container" onAnimationEnd={onScrollBarRendered}>
            <animated.div className="scrollbar" style={styles}/>
        </div>
    );
};