import { animated, useSpring } from "react-spring";
import { ReactNode, useCallback } from "react";
import { useIntl } from "react-intl";

import { MenuItemsEnum } from "../../types/menu-items.enum";
import { LocaleToggle } from "./LocaleToggle/LocaleToggle";
import { LanguagesEnum } from "../../types/languges.enum";

import "./Header.scss";

interface Props {
    locale: LanguagesEnum;
    setLocale: (locale: LanguagesEnum) => void;
    setClickedMenuItem: (item: MenuItemsEnum | null) => void;
    isVisible: boolean;
    hasBackground: boolean;
    hasBigLogo: boolean;
}

export const Header = ({ locale, setLocale, setClickedMenuItem, isVisible, hasBackground, hasBigLogo }: Props) => {
    const { formatMessage } = useIntl();
    const getMenuItem = useCallback((content: ReactNode) => {
        return (
            <div className="menu-item">
                <div className="menu-item-divider">/</div>
                <div className="menu-content-container">
                    {content}
                </div>
            </div>
        )
    }, []);

    const styles = useSpring({
        transform: `translateY(${isVisible ? 0 : -88}px)`,
    });

    const backgroundStyles = useSpring({
        delay: 200,
        top: hasBackground ? "0px" : "20px",
        background: hasBackground ? "rgba(255, 255, 255, 0.8)" : "transparent",
        backdropFilter: hasBackground ? "blur(10px)" : "blur(0px)",
    });

    const stylesHeaderContent = useSpring({
        filter: hasBackground ? "invert(1)" : "invert(0)",
    });

    const logoStyles = useSpring({
        width: hasBigLogo ? "270px" : "190px",
        height: hasBigLogo ? "68px" : "48px",
    });

    return (
        <animated.div className="header" style={{...styles, ...backgroundStyles}}>
            <animated.div style={{...stylesHeaderContent, ...logoStyles}} className="header-logo" onClick={() => setClickedMenuItem(MenuItemsEnum.HOME)}/>
            <animated.div style={stylesHeaderContent} className="header-menu">
                {getMenuItem(<div onClick={() => setClickedMenuItem(MenuItemsEnum.ABOUT)}>{formatMessage({ id: "about" })}</div>)}
                {getMenuItem(<div onClick={() => setClickedMenuItem(MenuItemsEnum.PROJECTS)}>{formatMessage({ id: "projects" })}</div>)}
                {getMenuItem(<div onClick={() => setClickedMenuItem(MenuItemsEnum.CONTACTS)}>{formatMessage({ id: "contacts" })}</div>)}
                {getMenuItem(<LocaleToggle locale={locale} setLocale={setLocale}/>)}
            </animated.div>
        </animated.div>
    )
};