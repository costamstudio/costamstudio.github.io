import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WebFont from "webfontloader";
import { IntlProvider } from "react-intl";

import { Home } from "../Home/Home";
import { Header } from "../Header/Header";
import { MenuItemsEnum } from "../../types/menu-items.enum";
import { FONTS, LOGO_IMAGES, OTHER_IMAGES, VIDEOS } from "./constants";
import { loadImages, loadVideos } from "../../utils/common";
import { LanguagesEnum } from "../../types/languges.enum";
import { pl } from "../../translations/pl";
import { en } from "../../translations/en";

import './App.scss';

export const App = () => {
    const [locale, setLocale] = useState(LanguagesEnum.PL);
    const [clickedMenuItem, setClickedMenuItem] = useState<MenuItemsEnum | null>(null);

    const [logoImages, setLogoImages] = useState<HTMLImageElement[]>([]);
    const [logoArtBackground, setLogoArtBackground] = useState<HTMLVideoElement | null>(null);
    const [contactBackground, setContactBackground] = useState<HTMLVideoElement | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isFontsLoaded, setIsFontsLoaded] = useState(false);
    const [isMediaLoaded, setIsMediaLoaded] = useState(false);

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [hasHeaderBackground, setHasHeaderBackground] = useState(false);
    const [hasHeaderBigLogo, setHasHeaderBigLogo] = useState(true);

    const appRef = useRef<HTMLDivElement | null>(null);

    const messages = useMemo(() => {
        if (locale === LanguagesEnum.PL) {
            return pl;
        }
        return en;
    }, [locale]);

    const loadAssets = useCallback(async () => {
        WebFont.load({
            custom: { families: FONTS },
            active: () => setIsFontsLoaded(true),
        });
        const [logoArtImages, otherImages, [logoArtBackground, contactBackground]] = await Promise.all([
            loadImages(LOGO_IMAGES),
            loadImages(OTHER_IMAGES),
            loadVideos(VIDEOS),
        ]);
        setIsMediaLoaded(true);
        setLogoImages(logoArtImages);
        setLogoArtBackground(logoArtBackground);
        setContactBackground(contactBackground);
    }, []);

    useEffect(() => {
        document.title = "COŚ TAM";
        loadAssets();
    }, []);

    useEffect(() => {
        if (isMediaLoaded && isFontsLoaded) {
            setIsLoading(false);
        }
    }, [isFontsLoaded, isMediaLoaded]);

    return !isLoading
        ? (
            <div ref={appRef} className="app">
                <IntlProvider messages={messages} locale={locale} defaultLocale={LanguagesEnum.PL}>
                    <Header
                        locale={locale}
                        setClickedMenuItem={setClickedMenuItem}
                        setLocale={setLocale}
                        isVisible={isHeaderVisible}
                        hasBackground={hasHeaderBackground}
                        hasBigLogo={hasHeaderBigLogo}
                    />
                    <Home
                        clickedMenuItem={clickedMenuItem}
                        setClickedMenuItem={setClickedMenuItem}
                        setIsHeaderVisible={setIsHeaderVisible}
                        setHasHeaderBackground={setHasHeaderBackground}
                        setHasHeaderBigLogo={setHasHeaderBigLogo}
                        logoImages={logoImages}
                        logoArtBackground={logoArtBackground}
                        contactBackground={contactBackground}
                    />
                </IntlProvider>
            </div>
        )
        : (
            <></>
        );
}
