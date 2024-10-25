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
import { setOpenedHomeSection } from "../../store/home";

import "./Home.scss";

export const Home = () => {
    const dispatch = useAppDispatch();
    const [isRightContainerOpened, setIsRightContainerOpened] = useState(false);
    const [isBottomContainerOpened, setIsBottomContainerOpened] = useState(false);
    const [isScrollAbsoluteContainersDisabled, setIsScrollAbsoluteContainersDisabled] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [toucheStartY, setTouchStartY] = useState(0);
    const homeRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const { isHomeAssetsLoaded, isCommonAssetsLoaded, isLogoArtImagesLoaded, isLogoArtVideoLoaded } = useAppSelector(({ assets }) => assets);
    const { openedHomeSection } = useAppSelector(({ home }) => home);
    const { initHomeAssets } = useInitHomeAssets();

    const styles = useSpring({
        overflow: isBottomContainerOpened ? "auto" : "hidden",
    });

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
            setIsRightContainerOpened(true);
            dispatch(setHasHeaderBigLogo(false));
        }
        if (!isScrollAbsoluteContainersDisabled && deltaY > 0 && isRightContainerOpened && !isBottomContainerOpened) {
            setScrollAbsoluteContainersDelay();
            setIsBottomContainerOpened(true);
        }
        if (!isScrollAbsoluteContainersDisabled && scrollTop === 0 && deltaY < 0 && isBottomContainerOpened) {
            setScrollAbsoluteContainersDelay();
            setIsBottomContainerOpened(false);
        }
        if (!isScrollAbsoluteContainersDisabled && scrollTop === 0 && deltaY < 0 && !isBottomContainerOpened) {
            setScrollAbsoluteContainersDelay();
            setIsRightContainerOpened(false);
            dispatch(setHasHeaderBigLogo(true));
        }
    }, [isRightContainerOpened, isBottomContainerOpened, scrollTop, isScrollAbsoluteContainersDisabled]);

    const onTouchStart = useCallback((event: React.TouchEvent) => {
        setTouchStartY(event.touches[0].pageY);
    }, [setTouchStartY]);

    const onTouchMove = useCallback((event: React.TouchEvent) => {
        const deltaY = toucheStartY - event.touches[0].pageY;
        onScrollAbsoluteContainers(deltaY);
    }, [toucheStartY, onScrollAbsoluteContainers]);

    const onWheel = useCallback((event: React.WheelEvent) => {
        onScrollAbsoluteContainers(event.deltaY);
    }, [onScrollAbsoluteContainers]);

    const onScroll = useCallback(() => {
        dispatch(setOpenedHomeSection(null));
        if (homeRef.current && contactRef.current) {
            const { scrollTop: newScrollTop } = homeRef.current;
            setScrollTop(newScrollTop);
            dispatch(setIsHeaderVisible(newScrollTop === 0 || scrollTop - newScrollTop > 0));
            dispatch(setHasHeaderBackground(newScrollTop !== 0));
        }
    }, [homeRef, contactRef, scrollTop]);

    useEffect(() => {
        if (openedHomeSection && homeRef.current && contactRef.current) {
            switch (openedHomeSection) {
                case MenuItem.HOME:
                    homeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsBottomContainerOpened(false);
                    setIsRightContainerOpened(false);
                    dispatch(setHasHeaderBackground(false));
                    dispatch(setHasHeaderBigLogo(true));
                    return;
                case MenuItem.ABOUT:
                    homeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsBottomContainerOpened(false);
                    setIsRightContainerOpened(true);
                    dispatch(setHasHeaderBigLogo(false));
                    return;
                case MenuItem.PROJECTS:
                    homeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsBottomContainerOpened(true);
                    setIsRightContainerOpened(true);
                    dispatch(setHasHeaderBigLogo(false));
                    return;
                case MenuItem.CONTACTS:
                    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                    setIsBottomContainerOpened(true);
                    setIsRightContainerOpened(true);
                    dispatch(setHasHeaderBigLogo(false));
                    return;
                default:
                    return;
            }
        }
    }, [openedHomeSection, homeRef.current?.scrollHeight]);

    useEffect(() => {
        initHomeAssets();
    }, []);

    return (
        <>
            <animated.div ref={homeRef} className={`home${isMobile ? " mobile" : ""}`} style={styles} onWheel={onWheel}
                          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onScroll={onScroll}>
                <LogoArt/>
                <animated.div className="right-container" style={rightContainerStyles}>
                    <About isVisible={isRightContainerOpened}/>
                </animated.div>
                <animated.div className="bottom-container" style={bottomContainerStyles}>
                    <Projects/>
                    <div ref={contactRef}>
                        <Contact/>
                    </div>
                </animated.div>
            </animated.div>
            {(!isHomeAssetsLoaded || !isCommonAssetsLoaded || !isLogoArtImagesLoaded || !isLogoArtVideoLoaded) && <Spinner/>}
        </>
    )
};