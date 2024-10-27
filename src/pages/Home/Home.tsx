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
import { setOpenedSection } from "../../store/common";

import "./Home.scss";

export const Home = () => {
    const dispatch = useAppDispatch();
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
        left: isMobile ? "0%" : `${isRightContainerOpened ? "0%" : "85%"}`,
    });

    const bottomContainerStyles = useSpring({
        marginTop: `${isBottomContainerOpened ? "0" : "100vh"}`,
    });

    const onTouchStart = useCallback((event: React.TouchEvent) => {
        setTouchStartY(event.touches[0].pageY);
    }, [setTouchStartY]);

    const onLogoArtWheel = useCallback((deltaY: number) => {
        if (deltaY > 0) {
            dispatch(setIsRightContainerOpened(true));
            dispatch(setHasHeaderBigLogo(false));
        }
    }, []);

    const onAboutWheel = useCallback((deltaY: number) => {
        if (deltaY < 0) {
            dispatch(setIsRightContainerOpened(false));
            dispatch(setHasHeaderBigLogo(true));
        }
        if (deltaY > 0) {
            dispatch(setIsBottomContainerOpened(true));
        }
    }, []);

    const onBottomContainerWheel = useCallback((deltaY: number) => {
        if (deltaY < 0 && scrollTop === 0) {
            dispatch(setIsBottomContainerOpened(false));
        }
    }, [scrollTop]);

    const onBottomContainerScroll = useCallback(() => {
        if (bottomContainerRef.current) {
            const { scrollTop: newScrollTop } = bottomContainerRef.current;
            setScrollTop(newScrollTop);
            dispatch(setIsHeaderVisible(newScrollTop === 0 || scrollTop - newScrollTop > 0));
            dispatch(setHasHeaderBackground(newScrollTop !== 0));
        }
    }, [scrollTop]);

    useEffect(() => {
        dispatch(setOpenedSection(null));
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
                          onTouchStart={onTouchStart}
            >
                <div
                    className="center-container"
                    onWheel={event => onLogoArtWheel(event.deltaY)}
                    onTouchMove={event => onLogoArtWheel(toucheStartY - event.touches[0].pageY)}
                >
                    <LogoArt/>
                </div>
                <animated.div
                    className="right-container"
                    style={{...rightContainerStyles, pointerEvents: isRightContainerOpened ? "all" : "none"}}
                    onWheel={event => onAboutWheel(event.deltaY)}
                    onTouchMove={event => onAboutWheel(toucheStartY - event.touches[0].pageY)}
                >
                    <About isVisible={isRightContainerOpened}/>
                </animated.div>
                <animated.div
                    ref={bottomContainerRef}
                    className="bottom-container"
                    style={bottomContainerStyles}
                    onScroll={onBottomContainerScroll}
                    onWheel={event => onBottomContainerWheel(event.deltaY)}
                    onTouchMove={event => onBottomContainerWheel(toucheStartY - event.touches[0].pageY)}
                >
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