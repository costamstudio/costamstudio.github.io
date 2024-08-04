import { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

import { LogoArt } from "./LogoArt/LogoArt";
import { About } from "./About/About";
import { Projects } from "./Projects/Projects";
import { MenuItemsEnum } from "../../types/menu-items.enum";

import "./Home.scss";


interface Props {
    clickedMenuItem: MenuItemsEnum | null;
    setClickedMenuItem: (item: MenuItemsEnum | null) => void;
    logoImages: HTMLImageElement[];
    logoArtBackground: HTMLVideoElement | null;
}

export const Home = ({ clickedMenuItem, setClickedMenuItem, logoImages, logoArtBackground }: Props) => {
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
        transform: `translateY(${isBottomContainerOpened ? "0" : "100"}%)`,
    });

    const setOnWheelDelay = useCallback(() => {
        setIsOnWheelDisabled(true);
        setTimeout(() => setIsOnWheelDisabled(false), 500);
    }, []);

    const onWheel = useCallback((event: React.WheelEvent) => {
        if (!isOnWheelDisabled && event.deltaY > 0 && !isRightContainerOpened) {
            setOnWheelDelay();
            setIsRightContainerOpened(true);
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
        }
    }, [isRightContainerOpened, isBottomContainerOpened, scrollTop, isOnWheelDisabled]);

    const onScroll = useCallback(() => {
        if (homeRef.current) {
            const { scrollTop } = homeRef.current;
            setScrollTop(scrollTop);
        }
    }, [homeRef]);

    useEffect(() => {
        if (clickedMenuItem && homeRef.current) {
            switch (clickedMenuItem) {
                case MenuItemsEnum.HOME:
                    homeRef.current.scrollTo({top: 0, behavior: 'smooth'});
                    setIsBottomContainerOpened(false);
                    setIsRightContainerOpened(false);
                    setClickedMenuItem(null);
                    return;
                case MenuItemsEnum.ABOUT:
                    homeRef.current.scrollTo({top: 0, behavior: 'smooth'});
                    setIsBottomContainerOpened(false);
                    setIsRightContainerOpened(true);
                    setClickedMenuItem(null);
                    return;
                case MenuItemsEnum.PROJECTS:
                    homeRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsBottomContainerOpened(true);
                    setIsRightContainerOpened(true);
                    setClickedMenuItem(null);
                    return;
                case MenuItemsEnum.CONTACTS:
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
            </animated.div>
        </animated.div>
    );
};