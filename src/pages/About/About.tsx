import { useIntl } from "react-intl";
import { isMobile } from "react-device-detect";

import { Glass } from "../../components/Glass/Glass";

import "./About.scss";
import { animated, useSpring } from "react-spring";
import { useCallback, useState } from "react";

interface Props {
    isVisible: boolean;
}

export const About = ({ isVisible }: Props) => {
    const { formatMessage } = useIntl();
    const [isStart, setIsStart] = useState(true);
    const [toucheStartY, setTouchStartY] = useState(0);

    const styles = useSpring({
        transform: `translateY(${isStart ? "0%" : "-100%"})`,
    });

    const onTouchStart = useCallback((event: React.TouchEvent) => {
        setTouchStartY(event.touches[0].pageY);
    }, [setTouchStartY]);

    const onTouchMove = useCallback((event: React.TouchEvent) => {
        if (isVisible) {
            const deltaY = toucheStartY - event.touches[0].pageY;
            if ((isStart && deltaY > 0) || (!isStart && deltaY < 0)) {
                event.stopPropagation();
            }
            setIsStart(deltaY < 0);
        }
    }, [toucheStartY]);

    return (
        <div className={`about${isMobile ? " mobile" : ""}`} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
            <Glass/>
            <div className="about-content-container">
                <animated.div style={isMobile ? styles : {}} className="about-content-item left">
                    <div className="about-title">{formatMessage({ id: "mission" })}</div>
                    <div className="about-text">{formatMessage({ id: "missionContent" })}</div>
                    <div className="about-text">{formatMessage({ id: "missionContentTwo" })}</div>
                </animated.div>
                <animated.div style={isMobile ? styles : {}} className="about-content-item right">
                    <div className="about-title">{formatMessage({ id: "whatDo" })}</div>
                    <div className="about-tags">
                        {formatMessage({ id: "whatDoTags" }).split(",").map((item, index) => (
                            <div key={`tag-${index}`} className="about-tag">
                                {`/ ${item}`}
                            </div>
                        ))}
                    </div>
                    <div className="about-text">{formatMessage({ id: "whatDoContent" })}</div>
                </animated.div>
            </div>
        </div>
    );
};