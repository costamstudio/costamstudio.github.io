import { useCallback, useMemo } from "react";

import { setType } from "../../store/cursor";
import { CursorType } from "../../enums/CursorType";
import { useAppDispatch } from "../../store/hooks";

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
    const dispatch = useAppDispatch();

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

    const onMouseEnter = useCallback(() => {
        dispatch(setType(CursorType.POINTER));
    }, []);

    const onMouseLeave = useCallback(() => {
        dispatch(setType(CursorType.DEFAULT));
    }, []);

    return (
        <div className="carousel-buttons-container">
            <div
                className={`carousel-button prev ${carouselState?.currentSlide === 0 ? "disabled" : ""}`}
                onMouseEnter={() => carouselState?.currentSlide !== 0 && onMouseEnter()}
                onMouseLeave={onMouseLeave}
                onClick={() => previous && previous()}
            />
            <div className="carousel-progress-bar">
                {Array.from({ length: carouselState?.totalItems ?? 0 }).map((_, index) => (
                    <div key={`bar-item-${index}`} className={`carousel-progress-bar-item${isBarItemActive(index) ? " active" : ""}`}/>
                ))}
            </div>
            <div
                className={`carousel-button next ${carouselState?.currentSlide === lastSlide ? "disabled" : ""}`}
                onMouseEnter={() => carouselState?.currentSlide !== lastSlide && onMouseEnter()}
                onMouseLeave={onMouseLeave}
                onClick={() => next && next()}
            />
        </div>
    );
};