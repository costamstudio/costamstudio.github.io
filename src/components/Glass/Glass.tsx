import { isMobile } from "react-device-detect";

import { GLASS_ITEM_LENGTH, MOBILE_GLASS_ITEM_LENGTH } from "./constants";

import "./Glass.scss";

export const Glass = () => {
    return (
        <div className={`glass-container${isMobile ? " mobile" : ""}`}>
            {Array.from({ length: isMobile ? MOBILE_GLASS_ITEM_LENGTH : GLASS_ITEM_LENGTH }).map((item, index) => (
                <div key={`glass-${index}`} className="glass-item"/>
            ))}
        </div>
    );
};