import { useMemo } from "react";
import { isMobile } from "react-device-detect";
import { useResizeDetector } from "react-resize-detector";

import { GLASS_ITEM_LENGTH } from "./constants";

import "./Glass.scss";

export const Glass = () => {
    const { width, ref } = useResizeDetector();

    const itemWidth = useMemo(() => {
        return isMobile || !width ? "auto" : Math.ceil(width/GLASS_ITEM_LENGTH);
    }, [width]);

    return (
        <div ref={ref} className={`glass-container${isMobile ? " mobile" : ""}`}>
            {!isMobile && Array.from({ length: GLASS_ITEM_LENGTH }).map((item, index) => (
                <div key={`glass-${index}`} className="glass-item" style={{ width: `${itemWidth}px` }}/>
            ))}
        </div>
    );
};