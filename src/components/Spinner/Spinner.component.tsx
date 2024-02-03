import * as React from "react";
import { useCallback, useRef } from "react";

import "./Spinner.component.scss";

interface Props {
    isLoading: boolean;
    hideSpinner: () => void;
}

export const Spinner = ({ isLoading, hideSpinner }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const onAnimationIteration = useCallback(() => {
        if (ref.current && !isLoading) {
            ref.current.style.animation = "scalein 1s forwards";
        }
    }, [ref, isLoading]);

    const onAnimationEnd = useCallback(() => {
        hideSpinner();
    }, [hideSpinner]);

    return (
        <div className="spinner-container">
            <div
                ref={ref}
                className="spinner"
                onAnimationIteration={onAnimationIteration}
                onAnimationEnd={onAnimationEnd}
            />
        </div>
    );
};