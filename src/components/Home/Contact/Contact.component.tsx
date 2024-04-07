import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { FormattedMessage, useIntl } from "react-intl";

import { useScrollState } from "../../../hooks/useScrollState";
import { SectionIds } from "../../../types/section-ids.enum";
import { MAX_SCROLL_POSITION } from "../../../constants/common";
import { Point } from "../../../types/point.interface";
import { HEADER_SIZE, ROUTE_POINTS_LENGTH, SCROLL_ROUTE_SMOOTHNESS } from "./constants";
import { useResponsiveVariable } from "../../../hooks/useResponsiveVariable";
import { SCROLL_SIZE_FHD, SCROLL_SIZE_HD, SCROLL_SIZE_UHD } from "../../Scrollbar/constants";

import "./Contact.component.scss";

interface Props {
    scrollPosition: number;
    appHeight: number;
    appWidth: number;
}

export const Contact = ({ scrollPosition, appHeight, appWidth }: Props) => {
    const scrollSize = useResponsiveVariable(SCROLL_SIZE_HD, SCROLL_SIZE_FHD, SCROLL_SIZE_UHD);
    const canvasCircleRef = useRef<HTMLCanvasElement>(null);
    const canvasLinesRef = useRef<HTMLCanvasElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { formatMessage } = useIntl();

    const [requestAnimationFrameId, setRequestAnimationFrame] = useState<number | null>(null);

    const {
        isStarted, isAppearanceActive,
        appearancePercentage, getCurrentPropertyValue,
        visibility
    } = useScrollState(SectionIds.CONTACT, scrollPosition);

    const startY = useMemo(() => {
        return appHeight ?? 0;
    }, [appHeight]);

    const y = useMemo(() => {
        if (!isStarted) {
            return startY;
        }
        if (isAppearanceActive) {
            return getCurrentPropertyValue(startY, 0, appearancePercentage);
        }
        return 0;
    }, [isStarted, isAppearanceActive, appearancePercentage, startY, getCurrentPropertyValue]);

    const generateRandomCoordinates = useCallback((minX: number, minY: number, maxX: number, maxY: number) => {
        const coordinates = [];

        for (let i = 0; i < ROUTE_POINTS_LENGTH; i++) {
            const x = Math.random() * (maxX - minX) + minX;
            const y = Math.random() * (maxY - minY) + minY;
            coordinates.push({ x, y });
        }

        return coordinates;
    }, []);

    const generateIntermediatePoints = useCallback((coordinates: Point[], smoothness: number) => {
        const intermediatePoints = [];

        for (let i = 0; i < coordinates.length - 2; i += 2) {
            const startPoint = coordinates[i];
            const controlPoint = coordinates[i + 1];
            const endPoint = coordinates[i + 2];

            for (let t = 0; t <= 1; t += 0.1 * smoothness) {
                const x = Math.pow(1 - t, 2) * startPoint.x + 2 * (1 - t) * t * controlPoint.x + Math.pow(t, 2) * endPoint.x;
                const y = Math.pow(1 - t, 2) * startPoint.y + 2 * (1 - t) * t * controlPoint.y + Math.pow(t, 2) * endPoint.y;

                intermediatePoints.push({ x, y });
            }
        }

        intermediatePoints.push(coordinates[coordinates.length - 1]);

        return intermediatePoints;
    }, []);

    const draw = useCallback((route: { x: number, y: number }[], index: number) => {
        const context = canvasCircleRef.current?.getContext("2d");
        const context2 = canvasLinesRef.current?.getContext("2d");
        if (context && context2) {
            const prevIndex = index === 0 ? 0 : index - 1;
            context.fillStyle = '#D9D9D9';
            context2.strokeStyle = '#D9D9D9';
            context2.lineWidth = 4
            context.clearRect(0, 0, appWidth, appHeight);
            context.beginPath();
            context2.beginPath();
            context2.moveTo(route[prevIndex].x, route[prevIndex].y);
            context.arc(route[index].x, route[index].y, 11, 0, 2 * Math.PI);
            context2.lineTo(route[index].x, route[index].y)
            context2.stroke();
            context.fill();

            if (route[index + 1]) {
                setRequestAnimationFrame(requestAnimationFrame(() => draw(route, index + 1)));
            }
        }
    }, [canvasCircleRef.current, canvasLinesRef.current, appWidth, appHeight])

    useEffect(() => {
        const canvasCircleContext = canvasCircleRef.current?.getContext("2d");
        const canvasLinesContext = canvasLinesRef.current?.getContext("2d");
        if (appWidth && appHeight && contentRef.current && scrollPosition === MAX_SCROLL_POSITION) {
            setTimeout(() => {
                const { right } = contentRef.current!.getBoundingClientRect();
                const currentScrollCoordinates = { x: appWidth - scrollSize / 2, y: appHeight - scrollSize / 2 };
                const scrollRoutePoints = [
                    currentScrollCoordinates,
                    ...generateRandomCoordinates(right, HEADER_SIZE, appWidth, appHeight - HEADER_SIZE),
                ];
                const route = generateIntermediatePoints(scrollRoutePoints, SCROLL_ROUTE_SMOOTHNESS);
                draw(route, 1);
            }, 1000);
        }
        if (scrollPosition !== MAX_SCROLL_POSITION && canvasCircleContext && canvasLinesContext && requestAnimationFrameId) {
            canvasCircleContext.clearRect(0, 0, appWidth, appHeight);
            canvasLinesContext.clearRect(0, 0, appWidth, appHeight);
            cancelAnimationFrame(requestAnimationFrameId);
        }
    }, [scrollPosition, contentRef.current]);

    const styles = useSpring({
        visibility,
        transform: `translateY(${y}px)`,
    });

    return (
        <animated.div className="contact" style={styles}>
            <canvas
                ref={canvasCircleRef}
                className="scroll-canvas"
                width={appWidth}
                height={appHeight}
            />
            <canvas
                ref={canvasLinesRef}
                className="scroll-canvas"
                width={appWidth}
                height={appHeight}
            />
            <div ref={contentRef} className="contact-content">
                <div>
                    <div className="title">
                        <FormattedMessage id="address"/>
                    </div>
                    <div className="street-building">
                        <FormattedMessage id="street"/>
                        <div className="highlighted">
                            <FormattedMessage id="building"/>
                        </div>
                    </div>
                    <div className="zip-city">
                        <div className="highlighted">
                            <FormattedMessage id="zip"/>
                        </div>
                        <FormattedMessage id="city"/>
                    </div>
                </div>
                <div>
                    <div className="title">
                        <FormattedMessage id="email"/>
                    </div>
                    <FormattedMessage tagName="div" id="contactEmail"/>
                </div>
                <div>
                    <div className="title">
                        <FormattedMessage id="instagram"/>
                    </div>
                    <FormattedMessage tagName="div" id="insta"/>
                </div>
            </div>
            <div className="contact-title">
                {Array.from(formatMessage({ id: "contact" })).map((letter, index) => (
                    <div key={`letter-${index}`} className="contact-letter">{letter}</div>
                ))}
            </div>
            <div className="footer">
                <div className="logo"/>
                <FormattedMessage tagName="div" id="footerContent"/>
                <FormattedMessage tagName="div" id="policy"/>
            </div>
        </animated.div>
    );
};