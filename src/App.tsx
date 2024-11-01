import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IntlProvider } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Header } from "./pages/Header/Header";
import { flattenMessages } from "./utils/common";
import { Language } from "./enums/Language";
import { pl } from "./translations/pl";
import { en } from "./translations/en";
import { Project } from "./pages/Project/Project";
import { useInitCommonAssets } from "./hooks/useInitCommonAssets";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Cursor } from "./components/Cursor/Cursor";
import { isMobile } from "react-device-detect";
import { setPosition, setType } from "./store/cursor";
import { CursorType } from "./enums/CursorType";

import './App.scss';

export const App = () => {
    const dispatch = useAppDispatch();
    const { locale } = useAppSelector(({ common }) => common);
    const { initCommonAssets } = useInitCommonAssets();
    const messages = useMemo(() => locale === Language.PL ? pl : en, [locale]);

    const cursorPosition = useRef({ x: 0, y: 0 });
    const followerPosition = useRef({ x: 0, y: 0 });

    const onMouseMove = useCallback((event: any) => {
        cursorPosition.current = { x: event.clientX, y: event.clientY };
    }, []);

    useEffect(() => {
        const animateFollower = () => {
            const distanceX = cursorPosition.current.x - followerPosition.current.x;
            const distanceY = cursorPosition.current.y - followerPosition.current.y;
            const inertiaFactor = 0.2;

            followerPosition.current.x += distanceX * inertiaFactor;
            followerPosition.current.y += distanceY * inertiaFactor;

            dispatch(setPosition({ x: followerPosition.current.x, y: followerPosition.current.y }));

            requestAnimationFrame(animateFollower);
        };

        animateFollower();
    }, [dispatch, onMouseMove]);

    useEffect(() => {
        document.title = "COŚ TAM";
        initCommonAssets();
    }, []);

    const onMouseEnter = useCallback(() => {
        dispatch(setType(CursorType.DEFAULT));
    }, []);

    const onMouseLeave = useCallback(() => {
        dispatch(setType(CursorType.NONE));
    }, []);

    return (
        <div className="app" onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <IntlProvider messages={flattenMessages(messages)} locale={locale} defaultLocale={Language.PL}>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/project/:id" element={<Project/>}/>
                    <Route path='*' element={<Navigate to="/"/>}/>
                </Routes>
                {!isMobile && <Cursor/>}
            </IntlProvider>
        </div>
    );
}
