import { GLASS_ITEM_LENGTH } from "./constants";

import "./Glass.scss";

export const Glass = () => {
    return (
        <div className="glass-container">
            {Array.from({ length: GLASS_ITEM_LENGTH }).map((item, index) => (
                <div key={`glass-${index}`} className="glass-item"/>
            ))}
        </div>
    );
};