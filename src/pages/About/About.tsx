import { useIntl } from "react-intl";
import { isMobile, isMobileOnly } from "react-device-detect";

import { Glass } from "../../components/Glass/Glass";

import "./About.scss";
import { animated, useSpring } from "react-spring";
import { useCallback, useEffect, useState } from "react";
import { MenuItem } from "../../enums/MenuItem";

interface Props {
    isVisible: boolean;
    clickedMenuItem: MenuItem | null;
}

export const About = ({ isVisible, clickedMenuItem }: Props) => {
    const { formatMessage } = useIntl();
    const [isStart, setIsStart] = useState(true);
    const [toucheStartY, setTouchStartY] = useState(0);

    const styles = useSpring({
        transform: isMobileOnly ? `translateY(${isStart ? "0%" : "-100%"})` : "none",
    });

    const onTouchStart = useCallback((event: React.TouchEvent) => {
        setTouchStartY(event.touches[0].pageY);
    }, [setTouchStartY]);

    const onTouchMove = useCallback((event: React.TouchEvent) => {
        if (isVisible && isMobileOnly) {
            const deltaY = toucheStartY - event.touches[0].pageY;
            if ((isStart && deltaY > 0) || (!isStart && deltaY < 0)) {
                event.stopPropagation();
            }
            setIsStart(deltaY < 0);
        }
    }, [toucheStartY]);

    useEffect(() => {
        setIsStart(true);
    }, [clickedMenuItem]);

    return (
        <div className={`about${isMobile ? " mobile" : ""}`} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
            <Glass/>
            <div className={`about-content-container${isVisible || isMobile ? " visible" : ""}`}>
                <animated.div style={isMobile ? styles : {}} className="about-content-item left">
                    <div className={`about-title${isVisible || isMobile ? " visible" : ""}`}>{formatMessage({ id: "mission" })}</div>
                    <div className={`about-text${isVisible || isMobile ? " visible" : ""}`}>{formatMessage({ id: "missionContent" })}</div>
                    <div className={`about-text${isVisible || isMobile ? " visible" : ""}`}>{formatMessage({ id: "missionContentTwo" })}</div>
                </animated.div>
                <animated.div style={isMobile ? styles : {}} className="about-content-item right">
                    <div className={`about-title${isVisible || isMobile ? " visible" : ""}`}>{formatMessage({ id: "whatDo" })}</div>
                    <div className={`about-tags${isVisible || isMobile ? " visible" : ""}`}>
                        {formatMessage({ id: "whatDoTags" }).split(",").map((item, index) => (
                            <div key={`tag-${index}`} className="about-tag">
                                {`/ ${item}`}
                            </div>
                        ))}
                    </div>
                    <div className={`about-text${isVisible || isMobile ? " visible" : ""}`}>{formatMessage({ id: "whatDoContent" })}</div>
                </animated.div>
            </div>
        </div>
    );
};