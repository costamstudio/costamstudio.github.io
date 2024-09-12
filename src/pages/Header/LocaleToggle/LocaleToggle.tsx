import { useCallback } from "react";
import { useIntl } from "react-intl";

import { Language } from "../../../enums/Language";
import { Languages } from "./constants";

import "./LocaleToggle.scss";

interface Props {
    locale: Language;
    setLocale: (locale: Language) => void;
}

export const LocaleToggle = ({ locale, setLocale }: Props) => {
    const { formatMessage } = useIntl();

    const isSelected = useCallback((id: Language) => {
        return locale === id;
    }, [locale]);

    return (
        <div
            className="locale-toggle"
            onClick={() => setLocale(locale === Language.PL ? Language.EN : Language.PL)}
        >
            {Languages.map(language => (
                <div key={language.id} className={`locale-toggle-item${isSelected(language.id) ? " selected" : ""}`}>
                    {formatMessage({ id: language.titleId })}
                </div>
            ))}
        </div>
    );
}