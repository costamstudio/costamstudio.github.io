import { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

import { LogoArt } from "../LogoArt/LogoArt";
import { About } from "../About/About";
import { Projects } from "../Projects/Projects";
import { MenuItem } from "../../enums/MenuItem";

import "./Home.scss";
import { Contact } from "../Contact/Contact";


interface Props {
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
    const [isOnWheelDisabled, setIsOnWheelDisabled] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const homeRef = useRef<HTMLDivElement>(null);

    const styles = useSpring({
        overflow: isBottomContainerOpened ? "auto" : "hidden",
    });

    const rightContainerStyles = useSpring({
        transform: `translateX(${isRightContainerOpened ? "0" : "80"}%)`,
    });

    const bottomContainerStyles = useSpring({
        marginTop: `${isBottomContainerOpened ? "0" : "100"}%`,
    });

    const setOnWheelDelay = useCallback(() => {
        setIsOnWheelDisabled(true);
        setTimeout(() => setIsOnWheelDisabled(false), 500);
    }, []);

    const onWheel = useCallback((event: React.WheelEvent) => {
        if (!isOnWheelDisabled && event.deltaY > 0 && !isRightContainerOpened) {
            setOnWheelDelay();
            setIsRightContainerOpened(true);
            setHasHeaderBigLogo(false);
        }
        if (!isOnWheelDisabled && event.deltaY > 0 && isRightContainerOpened && !isBottomContainerOpened) {
            setOnWheelDelay();
            setIsBottomContainerOpened(true);
        }
        if (!isOnWheelDisabled && scrollTop === 0 && event.deltaY < 0 && isBottomContainerOpened) {
            setOnWheelDelay();
            setIsBottomContainerOpened(false);
        }
        if (!isOnWheelDisabled && scrollTop === 0 && event.deltaY < 0 && !isBottomContainerOpened) {
            setOnWheelDelay();
            setIsRightContainerOpened(false);
            setHasHeaderBigLogo(true);
        }
    }, [isRightContainerOpened, isBottomContainerOpened, scrollTop, isOnWheelDisabled]);

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
                    homeRef.current.scrollTo({top: 0, behavior: 'smooth'});
                    setIsBottomContainerOpened(false);
                    setIsRightContainerOpened(false);
                    setClickedMenuItem(null);
                    return;
                case MenuItem.ABOUT:
                    homeRef.current.scrollTo({top: 0, behavior: 'smooth'});
                    setIsBottomContainerOpened(false);
                    setIsRightContainerOpened(true);
                    setClickedMenuItem(null);
                    return;
                case MenuItem.PROJECTS:
                    homeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsBottomContainerOpened(true);
                    setIsRightContainerOpened(true);
                    setClickedMenuItem(null);
                    return;
                case MenuItem.CONTACTS:
                    homeRef.current.scrollTo({ top: homeRef.current.scrollHeight, behavior: 'smooth' });
                    setIsBottomContainerOpened(true);
                    setIsRightContainerOpened(true);
                    setClickedMenuItem(null);
                    return;
                default:
                    return;
            }
        }
    }, [clickedMenuItem, homeRef.current?.scrollHeight]);

    return (
        <animated.div ref={homeRef} className="home" style={styles} onWheel={onWheel} onScroll={onScroll}>
            <LogoArt logoImages={logoImages} logoArtBackground={logoArtBackground}/>
            <animated.div className="right-container" style={rightContainerStyles}>
                <About isVisible={isRightContainerOpened}/>
            </animated.div>
            <animated.div className="bottom-container" style={bottomContainerStyles}>
                <Projects/>
                <Contact contactBackground={contactBackground}/>
            </animated.div>
        </animated.div>
    );
};