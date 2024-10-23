import { useEffect, useMemo, useRef, useState } from "react";
import { IntlProvider } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Header } from "./pages/Header/Header";
import { MenuItem } from "./enums/MenuItem";
import { flattenMessages } from "./utils/common";
import { Language } from "./enums/Language";
import { pl } from "./translations/pl";
import { en } from "./translations/en";
import { Project } from "./pages/Project/Project";
import { useInitCommonAssets } from "./hooks/useInitCommonAssets";

import './App.scss';

export const App = () => {
    const [locale, setLocale] = useState(Language.PL);
    const [clickedMenuItem, setClickedMenuItem] = useState<MenuItem | null>(null);

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [hasHeaderBackground, setHasHeaderBackground] = useState(false);
    const [hasHeaderBigLogo, setHasHeaderBigLogo] = useState(true);

    const appRef = useRef<HTMLDivElement | null>(null);

    const { initCommonAssets } = useInitCommonAssets();

    const messages = useMemo(() => {
        return locale === Language.PL ? pl : en;
    }, [locale]);

    useEffect(() => {
        document.title = "COŚ TAM";
        initCommonAssets();
    }, []);

    return (
        <div ref={appRef} className="app">
            <IntlProvider messages={flattenMessages(messages)} locale={locale} defaultLocale={Language.PL}>
                <Header
                    locale={locale}
                    setClickedMenuItem={setClickedMenuItem}
                    setLocale={setLocale}
                    isVisible={isHeaderVisible}
                    hasBackground={hasHeaderBackground}
                    hasBigLogo={hasHeaderBigLogo}
                />
                <Routes>
                    <Route path="/" element={
                        <Home
                            locale={locale}
                            clickedMenuItem={clickedMenuItem}
                            setClickedMenuItem={setClickedMenuItem}
                            setIsHeaderVisible={setIsHeaderVisible}
                            setHasHeaderBackground={setHasHeaderBackground}
                            setHasHeaderBigLogo={setHasHeaderBigLogo}
                        />
                    }/>
                    <Route path="/project/:id" element={
                        <Project
                            locale={locale}
                            setIsHeaderVisible={setIsHeaderVisible}
                            setHasHeaderBackground={setHasHeaderBackground}
                            setHasHeaderBigLogo={setHasHeaderBigLogo}
                        />
                    }/>
                    <Route path='*' element={<Navigate to="/"/>}/>
                </Routes>


            </IntlProvider>
        </div>
    );
}
