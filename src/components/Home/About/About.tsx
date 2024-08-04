import { useIntl } from "react-intl";
import { useResizeDetector } from "react-resize-detector";
import { useMemo } from "react";

import { GLASS_ITEM_WIDTH } from "./constants";

import "./About.scss";

interface Props {
    isVisible: boolean;
}

export const About = ({ isVisible }: Props) => {
    const { width, ref } = useResizeDetector();
    const { formatMessage } = useIntl();

    const glassItemsCount = useMemo(() => {
        width && console.log(width / GLASS_ITEM_WIDTH);
        return width ? Math.ceil(width / GLASS_ITEM_WIDTH) : 0;
    }, [width]);

    return (
        <div ref={ref} className="about">
            {Array.from({length: glassItemsCount}).map((item, index) => (
                <div key={`glass-${index}`} className="about-item"/>
            ))}
            <div className="about-content-container">
                <div className="about-content-item">
                    <div className="about-title">{formatMessage({ id: "mission" })}</div>
                    <div className="about-text">{formatMessage({ id: "missionContent" })}</div>
                    <div className="about-text">{formatMessage({ id: "missionContentTwo" })}</div>
                </div>
                <div className="about-content-item">
                    <div className="about-title">{formatMessage({ id: "whatDo" })}</div>
                    <div className="about-tags">
                        {formatMessage({ id: "whatDoTags" }).split(",").map(item => (
                            <div className="about-tag">
                                {`/ ${item}`}
                            </div>
                        ))}
                    </div>
                    <div className="about-text">{formatMessage({ id: "whatDoContent" })}</div>
                </div>
            </div>
        </div>
    );
};