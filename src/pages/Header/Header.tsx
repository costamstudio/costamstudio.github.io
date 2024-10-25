import { animated, useSpring } from "react-spring";
import { ReactNode, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { MenuItem } from "../../enums/MenuItem";
import { LocaleToggle } from "./LocaleToggle/LocaleToggle";
import { EMAIL_LINK, FACEBOOK_LINK, INSTAGRAM_LINK, LINKEDIN_LINK } from "../Contact/constants";
import { useResponsiveVariable } from "../../hooks/useResponsiveVariable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLocale } from "../../store/common";
import { setOpenedHomeSection } from "../../store/home";

import "./Header.scss";

export const Header = () => {
    const dispatch = useAppDispatch();
    const { locale } = useAppSelector(({ common }) => common);
    const { isHeaderVisible, hasHeaderBackground, hasHeaderBigLogo } = useAppSelector(({ header }) => header);
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
    const height = useResponsiveVariable(68, 68, 120);
    const topOffset = useResponsiveVariable(20, 20, 40);

    const getMenuItem = useCallback((content: ReactNode) => {
        return (
            <>
                <div className="menu-item-divider">/</div>
                <div className="menu-item">
                    <div className="menu-content-container">
                        {content}
                    </div>
                </div>
            </>
        )
    }, []);

    const onMenuItemClicked = useCallback((menuItem: MenuItem) => {
        navigate("/");
        dispatch(setOpenedHomeSection(menuItem));
    }, []);

    const onBurgerMenuItemClicked = useCallback((menuItem: MenuItem) => {
        navigate("/");
        setIsBurgerMenuOpened(false);
        dispatch(setOpenedHomeSection(menuItem));
    }, []);

    const openNewTabLink = useCallback((link: string) => {
        window.open(link, "_blank");
    }, []);

    const styles = useSpring({
        transform: `translateY(${isHeaderVisible ? 0 : -(height + topOffset)}px)`,
    });

    const backgroundStyles = useSpring({
        delay: 200,
        top: hasHeaderBackground || isMobile ? "0px" : `${topOffset}px`,
        background: hasHeaderBackground ? "rgba(255, 255, 255, 0.8)" : "transparent",
        backdropFilter: hasHeaderBackground ? "blur(10px)" : "blur(0px)",
    });

    const stylesHeaderContent = useSpring({
        filter: hasHeaderBackground ? "invert(1)" : "invert(0)",
    });

    const logoStyles = useSpring({
        transform: `scale(${hasHeaderBigLogo && !isMobile ? 1.4 : 1})`,
    });

    return (
        <>
            <animated.div
                className={`header${isMobile ? " mobile" : ""}${isBurgerMenuOpened ? " opened-burger-menu" : ""}`}
                style={{ ...styles, ...backgroundStyles }}>
                <animated.div style={{ ...stylesHeaderContent, ...logoStyles }} className="header-logo"
                              onClick={() => onMenuItemClicked(MenuItem.HOME)}/>
                <animated.div style={stylesHeaderContent} className="header-menu">
                    {getMenuItem(<div onClick={() => onMenuItemClicked(MenuItem.ABOUT)}>{formatMessage({ id: "about" })}</div>)}
                    {getMenuItem(<div onClick={() => onMenuItemClicked(MenuItem.PROJECTS)}>{formatMessage({ id: "projects" })}</div>)}
                    {getMenuItem(<div onClick={() => onMenuItemClicked(MenuItem.CONTACTS)}>{formatMessage({ id: "contacts" })}</div>)}
                    {getMenuItem(<LocaleToggle locale={locale} setLocale={locale => dispatch(setLocale(locale))}/>)}
                </animated.div>
                <animated.div
                    style={stylesHeaderContent}
                    className={`header-burger-menu${isBurgerMenuOpened ? " opened" : ""}`}
                    onClick={() => setIsBurgerMenuOpened(!isBurgerMenuOpened)}
                />
            </animated.div>
            {isBurgerMenuOpened && isMobile && (
                <div className="burger-menu-content-container">
                    <div className="header-menu">
                        {getMenuItem(<div
                            onClick={() => onBurgerMenuItemClicked(MenuItem.ABOUT)}>{formatMessage({ id: "about" })}</div>)}
                        {getMenuItem(<div
                            onClick={() => onBurgerMenuItemClicked(MenuItem.PROJECTS)}>{formatMessage({ id: "projects" })}</div>)}
                        {getMenuItem(<div
                            onClick={() => onBurgerMenuItemClicked(MenuItem.CONTACTS)}>{formatMessage({ id: "contacts" })}</div>)}
                        {getMenuItem(<LocaleToggle locale={locale} setLocale={locale => dispatch(setLocale(locale))}/>)}
                    </div>
                    <div className="contact-content-image-container">
                        <div className="contact-content-image-title">/ {formatMessage({ id: "socialMedia" })}</div>
                        <div className="contact-content-image-socials">
                            <div className="contact-content-social-links">
                                <div
                                    className="contact-content-instagram social-link-icon"
                                    onClick={() => openNewTabLink(INSTAGRAM_LINK)}
                                />
                                <div
                                    className="contact-content-facebook social-link-icon"
                                    onClick={() => openNewTabLink(FACEBOOK_LINK)}
                                />
                                <div
                                    className="contact-content-linkedin social-link-icon"
                                    onClick={() => openNewTabLink(LINKEDIN_LINK)}
                                />
                                <div
                                    className="contact-content-email social-link-icon"
                                    onClick={() => openNewTabLink(EMAIL_LINK)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
    }
;