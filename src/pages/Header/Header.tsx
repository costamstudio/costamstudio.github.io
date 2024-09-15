import { animated, useSpring } from "react-spring";
import { ReactNode, useCallback } from "react";
import { useIntl } from "react-intl";

import { MenuItem } from "../../enums/MenuItem";
import { LocaleToggle } from "./LocaleToggle/LocaleToggle";
import { Language } from "../../enums/Language";

import "./Header.scss";
import { useNavigate } from "react-router-dom";

interface Props {
    locale: Language;
    setLocale: (locale: Language) => void;
    setClickedMenuItem: (item: MenuItem | null) => void;
    isVisible: boolean;
    hasBackground: boolean;
    hasBigLogo: boolean;
}

export const Header = ({ locale, setLocale, setClickedMenuItem, isVisible, hasBackground, hasBigLogo }: Props) => {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();

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

    const onMenuItemClicked = useCallback((menuItem: MenuItem) => {
        navigate("/");
        setTimeout(() => setClickedMenuItem(menuItem), 300);
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
            <animated.div style={{...stylesHeaderContent, ...logoStyles}} className="header-logo" onClick={() => onMenuItemClicked(MenuItem.HOME)}/>
            <animated.div style={stylesHeaderContent} className="header-menu">
                {getMenuItem(<div onClick={() => onMenuItemClicked(MenuItem.ABOUT)}>{formatMessage({ id: "about" })}</div>)}
                {getMenuItem(<div onClick={() => onMenuItemClicked(MenuItem.PROJECTS)}>{formatMessage({ id: "projects" })}</div>)}
                {getMenuItem(<div onClick={() => onMenuItemClicked(MenuItem.CONTACTS)}>{formatMessage({ id: "contacts" })}</div>)}
                {getMenuItem(<LocaleToggle locale={locale} setLocale={setLocale}/>)}
            </animated.div>
        </animated.div>
    )
};