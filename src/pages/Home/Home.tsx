import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";

import { LogoArt } from "../LogoArt/LogoArt";
import { About } from "../About/About";
import { Projects } from "../Projects/Projects";
import { MenuItem } from "../../enums/MenuItem";
import { Contact } from "../Contact/Contact";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Spinner } from "../../components/Spinner/Spinner";
import { useInitHomeAssets } from "../../hooks/useInitHomeAssets";
import { setHasHeaderBackground, setHasHeaderBigLogo, setIsHeaderVisible } from "../../store/header";
import { setIsBottomContainerOpened, setIsRightContainerOpened } from "../../store/home";

import "./Home.scss";
import { setOpenedSection } from "../../store/common";

export const Home = () => {
    const dispatch = useAppDispatch();
    const [isScrollAbsoluteContainersDisabled, setIsScrollAbsoluteContainersDisabled] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [toucheStartY, setTouchStartY] = useState(0);
    const homeRef = useRef<HTMLDivElement>(null);
    const bottomContainerRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const { isHomeAssetsLoaded, isCommonAssetsLoaded, isLogoArtImagesLoaded, isLogoArtVideoLoaded } = useAppSelector(({ assets }) => assets);
    const { isRightContainerOpened, isBottomContainerOpened } = useAppSelector(({ home }) => home);
    const { openedSection } = useAppSelector(({ common }) => common);
    const { initHomeAssets } = useInitHomeAssets();

    const mobileRightContainerClosedTranslate = useMemo(() => {
        return isPortrait ? 85 : 100;
    }, [isPortrait]);

    const rightContainerStyles = useSpring({
        transform: isMobile ? `translateY(${isRightContainerOpened ? "0" : mobileRightContainerClosedTranslate}%)` : `none`,
        left: isMobile ? "0%" : `${isRightContainerOpened ? "0%" : "85%"}`
    });

    const bottomContainerStyles = useSpring({
        marginTop: `${isBottomContainerOpened ? "0" : "100vh"}`,
    });

    const setScrollAbsoluteContainersDelay = useCallback(() => {
        setIsScrollAbsoluteContainersDisabled(true);
        setTimeout(() => setIsScrollAbsoluteContainersDisabled(false), 500);
    }, []);

    const onScrollAbsoluteContainers = useCallback((deltaY: number) => {
        if (!isScrollAbsoluteContainersDisabled && deltaY > 0 && !isRightContainerOpened) {
            setScrollAbsoluteContainersDelay();
            dispatch(setIsRightContainerOpened(true));
            dispatch(setHasHeaderBigLogo(false));
        }
        if (!isScrollAbsoluteContainersDisabled && deltaY > 0 && isRightContainerOpened && !isBottomContainerOpened) {
            setScrollAbsoluteContainersDelay();
            dispatch(setIsBottomContainerOpened(true));
        }
        if (!isScrollAbsoluteContainersDisabled && scrollTop === 0 && deltaY < 0 && isBottomContainerOpened) {
            setScrollAbsoluteContainersDelay();
            dispatch(setIsBottomContainerOpened(false));
        }
        if (!isScrollAbsoluteContainersDisabled && scrollTop === 0 && deltaY < 0 && !isBottomContainerOpened) {
            setScrollAbsoluteContainersDelay();
            dispatch(setIsRightContainerOpened(false));
            dispatch(setHasHeaderBigLogo(true));
        }
    }, [isRightContainerOpened, isBottomContainerOpened, scrollTop, isScrollAbsoluteContainersDisabled]);

    const onTouchStart = useCallback((event: React.TouchEvent) => {
        setTouchStartY(event.touches[0].pageY);
    }, [setTouchStartY]);

    const onTouchMove = useCallback((event: React.TouchEvent) => {
        dispatch(setOpenedSection(null));
        const deltaY = toucheStartY - event.touches[0].pageY;
        onScrollAbsoluteContainers(deltaY);
    }, [toucheStartY, onScrollAbsoluteContainers]);

    const onWheel = useCallback((event: React.WheelEvent) => {
        dispatch(setOpenedSection(null));
        onScrollAbsoluteContainers(event.deltaY);
    }, [onScrollAbsoluteContainers]);

    const onScroll = useCallback(() => {
        if (bottomContainerRef.current) {
            const { scrollTop: newScrollTop } = bottomContainerRef.current;
            setScrollTop(newScrollTop);
            dispatch(setIsHeaderVisible(newScrollTop === 0 || scrollTop - newScrollTop > 0));
            dispatch(setHasHeaderBackground(newScrollTop !== 0));
        }
    }, [onScrollAbsoluteContainers, scrollTop]);

    useEffect(() => {
        switch (openedSection) {
            case MenuItem.HOME:
                projectsRef.current?.scrollIntoView({ behavior: "auto" });
                dispatch(setIsBottomContainerOpened(false));
                dispatch(setIsRightContainerOpened(false));
                dispatch(setHasHeaderBackground(false));
                dispatch(setHasHeaderBigLogo(true));
                return;
            case MenuItem.ABOUT:
                projectsRef.current?.scrollIntoView({ behavior: "auto" });
                dispatch(setIsBottomContainerOpened(false));
                dispatch(setIsRightContainerOpened(true));
                dispatch(setHasHeaderBackground(false));
                dispatch(setHasHeaderBigLogo(false));
                return;
            case MenuItem.PROJECTS:
                projectsRef.current?.scrollIntoView({ behavior: `${isBottomContainerOpened ? "smooth" : "auto"}` });
                dispatch(setIsBottomContainerOpened(true));
                dispatch(setIsRightContainerOpened(true));
                dispatch(setHasHeaderBackground(false));
                dispatch(setHasHeaderBigLogo(false));
                return;
            case MenuItem.CONTACTS:
                contactRef.current?.scrollIntoView({ behavior: `${isBottomContainerOpened ? "smooth" : "auto"}` });
                dispatch(setIsBottomContainerOpened(true));
                dispatch(setIsRightContainerOpened(true));
                dispatch(setHasHeaderBackground(false));
                dispatch(setHasHeaderBigLogo(false));
                return;
            default:
                return;
        }
    }, [openedSection]);

    useEffect(() => {
        initHomeAssets();
    }, []);

    return (
        <>
            <animated.div ref={homeRef}
                          className={`home${isMobile ? " mobile" : ""}`}
                          onWheel={onWheel}
                          onTouchStart={onTouchStart}
                          onTouchMove={onTouchMove}
            >
                <LogoArt/>
                <animated.div className="right-container" style={rightContainerStyles}>
                    <About isVisible={isRightContainerOpened}/>
                </animated.div>
                <animated.div ref={bottomContainerRef} className="bottom-container" style={bottomContainerStyles} onScroll={onScroll}>
                    <div ref={projectsRef}>
                        <Projects/>
                    </div>
                    <div ref={contactRef}>
                        <Contact/>
                    </div>
                </animated.div>
            </animated.div>
            {(!isHomeAssetsLoaded || !isCommonAssetsLoaded || !isLogoArtImagesLoaded || !isLogoArtVideoLoaded) && <Spinner/>}
        </>
    )
};