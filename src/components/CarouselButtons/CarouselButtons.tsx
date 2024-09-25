import { useCallback, useMemo } from "react";

import "./CarouselButtons.scss";

interface Props {
    next?: () => void;
    previous?: () => void;
    carouselState?: {
        currentSlide: number;
        totalItems: number;
        slidesToShow: number;
    }
}

export const CarouselButtons = ({ next, previous, carouselState }: Props) => {
    const lastSlide = useMemo(() => {
        if (carouselState) {
            return carouselState.totalItems - carouselState?.slidesToShow;
        }
        return 0;
    }, [carouselState]);

    const isBarItemActive = useCallback((index: number) => {
        if (carouselState) {
            return carouselState.slidesToShow + carouselState?.currentSlide > index && carouselState?.currentSlide <= index;
        }
        return false;
    }, [carouselState]);

    return (
        <div className="carousel-buttons-container">
            <div
                className={`carousel-button prev ${carouselState?.currentSlide === 0 ? "disabled" : ""}`}
                onClick={() => previous && previous()}
            />
            <div className="carousel-progress-bar">
                {Array.from({ length: carouselState?.totalItems ?? 0 }).map((_, index) => (
                    <div key={`bar-item-${index}`} className={`carousel-progress-bar-item${isBarItemActive(index) ? " active" : ""}`}/>
                ))}
            </div>
            <div
                className={`carousel-button next ${carouselState?.currentSlide === lastSlide ? "disabled" : ""}`}
                onClick={() => next && next()}
            />
        </div>
    );
};