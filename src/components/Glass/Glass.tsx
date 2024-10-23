import { useMemo } from "react";
import { isMobile } from "react-device-detect";
import { useResizeDetector } from "react-resize-detector";

import { GLASS_ITEM_LENGTH, MOBILE_GLASS_ITEM_LENGTH } from "./constants";

import "./Glass.scss";

export const Glass = () => {
    const { width, height, ref } = useResizeDetector();

    const itemWidth = useMemo(() => {
        return isMobile || !width ? "auto" : Math.ceil(width/GLASS_ITEM_LENGTH);
    }, [width]);

    const itemHeight = useMemo(() => {
        return isMobile && height ? Math.ceil(height/MOBILE_GLASS_ITEM_LENGTH) : "auto";
    }, [height]);

    return (
        <div ref={ref} className={`glass-container${isMobile ? " mobile" : ""}`}>
            {Array.from({ length: isMobile ? MOBILE_GLASS_ITEM_LENGTH : GLASS_ITEM_LENGTH }).map((item, index) => (
                <div key={`glass-${index}`} className="glass-item" style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}/>
            ))}
        </div>
    );
};