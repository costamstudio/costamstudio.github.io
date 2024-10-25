import { useEffect, useMemo } from "react";
import { IntlProvider } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Header } from "./pages/Header/Header";
import { flattenMessages } from "./utils/common";
import { Language } from "./enums/Language";
import { pl } from "./translations/pl";
import { en } from "./translations/en";
import { Project } from "./pages/Project/Project";
import { useInitCommonAssets } from "./hooks/useInitCommonAssets";
import { useAppSelector } from "./store/hooks";

import './App.scss';

export const App = () => {
    const { locale } = useAppSelector(({ common }) => common);
    const { initCommonAssets } = useInitCommonAssets();
    const messages = useMemo(() => locale === Language.PL ? pl : en, [locale]);

    useEffect(() => {
        document.title = "COŚ TAM";
        initCommonAssets();
    }, []);

    return (
        <div className="app">
            <IntlProvider messages={flattenMessages(messages)} locale={locale} defaultLocale={Language.PL}>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/project/:id" element={<Project/>}/>
                    <Route path='*' element={<Navigate to="/"/>}/>
                </Routes>


            </IntlProvider>
        </div>
    );
}
