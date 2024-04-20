import React, { useCallback, useEffect, useState } from 'react';
import WebFont from "webfontloader";
import { useResizeDetector } from "react-resize-detector";
import { IntlProvider } from "react-intl";

import { Spinner } from "../Spinner/Spinner.component";
import { MainBrandArt } from "../MainBrandArt/MainBrandArt.component";
import { Header } from "../Header/Header.component";
import { Scrollbar } from "../Scrollbar/Scrollbar.component";
import { Home } from "../Home/Home.component";
import { FONTS, LOGO_IMAGES, OTHER_IMAGES, VIDEOS } from "./constants";
import { pl } from "../../translations/pl";
import { MAX_SCROLL_POSITION } from "../../constants/common";
import { loadImages, loadVideos } from "../../utils/common";

import './App.scss';

export const App = () => {
    const { width: appWidth, height: appHeight, ref } = useResizeDetector();

    const [logoImages, setLogoImages] = useState<HTMLImageElement[]>([]);
    const [cosTamVideo, setCosTamVideo] = useState<HTMLVideoElement | null>(null);
    const [cosVideo, setCosVideo] = useState<HTMLVideoElement | null>(null);

    const [isContentVisible, setIsContentVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isFontsLoaded, setIsFontsLoaded] = useState(false);
    const [isMediaLoaded, setIsMediaLoaded] = useState(false);
    const [isScrollBarRendered, setIsScrollBarRendered] = useState(false);

    const [scrollPosition, setScrollPosition] = useState(0);

    const loadAssets = useCallback(async () => {
        WebFont.load({
            custom: { families: FONTS },
            active: () => setIsFontsLoaded(true),
        });
        const [logoArtImages, otherImages, [cosTamVideoElement, cosVideosElement]] = await Promise.all([
            loadImages(LOGO_IMAGES),
            loadImages(OTHER_IMAGES),
            loadVideos(VIDEOS),
        ]);
        setIsMediaLoaded(true);
        setLogoImages(logoArtImages);
        setCosTamVideo(cosTamVideoElement);
        setCosVideo(cosVideosElement);
    }, [])

    const onWheel = useCallback((event: React.WheelEvent) => {
        if (!isScrollBarRendered) {
            return;
        }

        const newScrollPosition = scrollPosition + event.deltaY / 100;
        if (newScrollPosition >= 0 && newScrollPosition <= MAX_SCROLL_POSITION) {
            setScrollPosition(newScrollPosition);
        }
        if (newScrollPosition < 0) {
            setScrollPosition(0);
        }
        if (newScrollPosition > MAX_SCROLL_POSITION) {
            setScrollPosition(MAX_SCROLL_POSITION);
        }
    }, [scrollPosition, isScrollBarRendered]);

    useEffect(() => {
        document.title = "COŚ TAM";
        loadAssets();
    }, []);

    useEffect(() => {
        if (isMediaLoaded && isFontsLoaded) {
            setIsLoading(false);
        }
    }, [isFontsLoaded, isMediaLoaded]);

    return isContentVisible
        ? (
            <div ref={ref} className="app" onWheel={onWheel}>
                <IntlProvider messages={pl} locale="pl" defaultLocale="pl">
                    <Scrollbar
                        scrollPosition={scrollPosition}
                        appHeight={appHeight ?? 0}
                        onScrollBarRendered={() => setIsScrollBarRendered(true)}
                    />
                    <MainBrandArt
                        logoImages={logoImages}
                        scrollPosition={scrollPosition}
                        appHeight={appHeight ?? 0}
                        appWidth={appWidth ?? 0}
                    />
                    <Header
                        scrollPosition={scrollPosition}
                        setScrollPosition={setScrollPosition}
                        appHeight={appHeight ?? 0}
                        appWidth={appWidth ?? 0}
                    />
                    <Home
                        scrollPosition={scrollPosition}
                        appHeight={appHeight ?? 0}
                        appWidth={appWidth ?? 0}
                        cosTamVideo={cosTamVideo}
                        cosVideo={cosVideo}
                    />
                </IntlProvider>
            </div>
        )
        : (
            <Spinner isLoading={isLoading} hideSpinner={() => setIsContentVisible(true)}/>
        );
}
