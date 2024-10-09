import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import { v4 as uuid } from 'uuid';

import { LogoArt } from "../LogoArt/LogoArt";
import { About } from "../About/About";
import { Projects } from "../Projects/Projects";
import { MenuItem } from "../../enums/MenuItem";
import { Contact } from "../Contact/Contact";
import { Language } from "../../enums/Language";

import "./Home.scss";


interface Props {
    locale: Language;
    clickedMenuItem: MenuItem | null;
    setClickedMenuItem: (item: MenuItem | null) => void;
    setIsHeaderVisible: (isHeaderVisible: boolean) => void;
    setHasHeaderBackground: (hasHeaderBackground: boolean) => void;
    setHasHeaderBigLogo: (hasHeaderBigLogo: boolean) => void;
    logoImages: HTMLImageElement[];
    logoArtBackground: HTMLVideoElement | null;
    contactBackground: HTMLVideoElement | null;
}

export const Home = ({
                         locale,
                         clickedMenuItem,
                         setClickedMenuItem,
                         logoImages,
                         logoArtBackground,
                         contactBackground,
                         setIsHeaderVisible,
                         setHasHeaderBackground,
                         setHasHeaderBigLogo
                     }: Props) => {
    const [isRightContainerOpened, setIsRightContainerOpened] = useState(false);
    const [isBottomContainerOpened, setIsBottomContainerOpened] = useState(false);
    const [isScrollAbsoluteContainersDisabled, setIsScrollAbsoluteContainersDisabled] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [toucheStartY, setTouchStartY] = useState(0);
    const homeRef = useRef<HTMLDivElement>(null);
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

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
            setHasHeaderBigLogo(false);
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
            setHasHeaderBigLogo(true);
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
        if (homeRef.current) {
            const { scrollTop: newScrollTop } = homeRef.current;
            const isHeaderVisible = newScrollTop === 0 || scrollTop - newScrollTop > 0;
            setScrollTop(newScrollTop);
            setIsHeaderVisible(isHeaderVisible);
            setHasHeaderBackground(newScrollTop !== 0);
        }
    }, [homeRef, scrollTop]);

    useEffect(() => {
        if (clickedMenuItem && homeRef.current) {
            switch (clickedMenuItem) {
                case MenuItem.HOME:
                    homeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsBottomContainerOpened(false);
                    setIsRightContainerOpened(false);
                    setClickedMenuItem(null);
                    setHasHeaderBackground(false);
                    setHasHeaderBigLogo(true);
                    return;
                case MenuItem.ABOUT:
                    homeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsBottomContainerOpened(false);
                    setIsRightContainerOpened(true);
                    setClickedMenuItem(null);
                    setHasHeaderBigLogo(false);
                    return;
                case MenuItem.PROJECTS:
                    homeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsBottomContainerOpened(true);
                    setIsRightContainerOpened(true);
                    setClickedMenuItem(null);
                    setHasHeaderBigLogo(false);
                    return;
                case MenuItem.CONTACTS:
                    homeRef.current.scrollTo({ top: homeRef.current.scrollHeight, behavior: 'smooth' });
                    setIsBottomContainerOpened(true);
                    setIsRightContainerOpened(true);
                    setClickedMenuItem(null);
                    setHasHeaderBigLogo(false);
                    return;
                default:
                    return;
            }
        }
    }, [clickedMenuItem, homeRef.current?.scrollHeight]);

    const [bottomContainerKey, setBottomContainerKey] = useState(uuid());

    useEffect(() => {
        if (isBottomContainerOpened) {
            setBottomContainerKey(uuid());
        }
    }, [isBottomContainerOpened]);

    return (
        <animated.div ref={homeRef} className={`home${isMobile ? " mobile" : ""}`} style={styles} onWheel={onWheel} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onScroll={onScroll}>
            <LogoArt logoImages={logoImages} logoArtBackground={logoArtBackground}/>
            <animated.div className="right-container" style={rightContainerStyles}>
                <About isVisible={isRightContainerOpened} clickedMenuItem={clickedMenuItem}/>
            </animated.div>
            <animated.div key={bottomContainerKey} className="bottom-container" style={bottomContainerStyles}>
                <Projects/>
                <Contact locale={locale} contactBackground={contactBackground}/>
            </animated.div>
        </animated.div>
    );
};