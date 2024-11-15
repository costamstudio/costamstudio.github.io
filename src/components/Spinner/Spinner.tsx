import { useCallback, useEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import Lottie from "lottie-react";

import { useResponsiveVariable } from "../../hooks/useResponsiveVariable";
import { Point } from "../../types/Point";
import animation from "./animation.json";

import "./Spinner.scss";

interface Props {
    isVisible: boolean;
}

const ROUTE_POINTS_LENGTH = 3000;
const ROUTE_SMOOTHNESS = 0.2;

export const Spinner = ({ isVisible }: Props) => {
    const drawerCircleSize = useResponsiveVariable(30, 30, 60);
    const lineWidth = useResponsiveVariable(2, 2, 4);
    const animationWidth = useResponsiveVariable(300, 300, 600);
    const requestAnimationFrameIdRef = useRef<number | null>(null);

    const { width = 1, height = 1, ref } = useResizeDetector();


    const canvasCircleRef = useRef<HTMLCanvasElement>(null);
    const canvasLinesRef = useRef<HTMLCanvasElement>(null);

    const [requestAnimationFrameId, setRequestAnimationFrame] = useState<number | null>(null);

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
            const color = '#D9D9D9';
            context.fillStyle = color;
            context2.strokeStyle = color;
            context2.lineWidth = lineWidth;
            context.clearRect(0, 0, width, height);
            context.beginPath();
            context2.beginPath();
            context2.moveTo(route[prevIndex].x, route[prevIndex].y);
            context.arc(route[index].x, route[index].y, drawerCircleSize / 2, 0, 2 * Math.PI);
            context2.lineTo(route[index].x, route[index].y)
            context2.stroke();
            context.fill();

            if (route[index + 1]) {
                requestAnimationFrameIdRef.current = requestAnimationFrame(() => draw(route, index + 1));
            }
        }
    }, [canvasCircleRef.current, canvasLinesRef.current, width, height, drawerCircleSize]);

    const stopCircleDrawing = useCallback(() => {
        const canvasCircleContext = canvasCircleRef.current?.getContext("2d");
        const canvasLinesContext = canvasLinesRef.current?.getContext("2d");

        if (canvasCircleContext && canvasLinesContext && requestAnimationFrameIdRef.current) {
            canvasCircleContext.clearRect(0, 0, width, height);
            canvasLinesContext.clearRect(0, 0, width, height);
            cancelAnimationFrame(requestAnimationFrameIdRef.current);
            requestAnimationFrameIdRef.current = null;
        }
    }, []);

    const startCircleDrawing = useCallback(() => {
        if (width > 1 && height > 1) {
            const currentDrawerCoordinates = { x: width - drawerCircleSize / 2, y: height - drawerCircleSize / 2 };
            const drawerRoutePoints = [
                currentDrawerCoordinates,
                ...generateRandomCoordinates(0, 0, width, height),
            ];
            const route = generateIntermediatePoints(drawerRoutePoints, ROUTE_SMOOTHNESS);
            draw(route, 1);
        }
    }, [width, height, drawerCircleSize]);

    useEffect(() => {
        stopCircleDrawing();
        if (isVisible) {
            startCircleDrawing();
        }
    }, [isVisible, startCircleDrawing, stopCircleDrawing]);

    return (
        <div ref={ref} className={`spinner-container${isVisible ? "" : " closed"}`}>
            <canvas
                ref={canvasCircleRef}
                className="spinner-canvas"
                width={width}
                height={height}
            />
            <canvas
                ref={canvasLinesRef}
                className="spinner-canvas"
                width={width}
                height={height}
            />
            <div className="spinner-logo-container">
                <Lottie
                    animationData={animation}
                    loop={true}
                    style={{ width: animationWidth }}
                />
            </div>
        </div>
    );
};