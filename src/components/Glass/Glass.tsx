import { useMemo } from "react";

import { GLASS_ITEM_WIDTH } from "./constants";

import "./Glass.scss";

interface Props {
    width: number;
}

export const Glass = ({width}: Props) => {
    const glassItemsCount = useMemo(() => {
        return width ? Math.ceil(width / GLASS_ITEM_WIDTH) : 0;
    }, [width]);

    return (
        <div className="glass-container">
            {Array.from({length: glassItemsCount}).map((item, index) => (
                <div key={`glass-${index}`} className="glass-item"/>
            ))}
        </div>
    );
};