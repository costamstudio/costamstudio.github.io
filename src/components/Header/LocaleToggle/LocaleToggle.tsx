import { useCallback } from "react";
import { useIntl } from "react-intl";

import { LanguagesEnum } from "../../../types/languges.enum";
import { Languages } from "./constants";

import "./LocaleToggle.scss";

interface Props {
    locale: LanguagesEnum;
    setLocale: (locale: LanguagesEnum) => void;
}

export const LocaleToggle = ({ locale, setLocale }: Props) => {
    const { formatMessage } = useIntl();

    const isSelected = useCallback((id: LanguagesEnum) => {
        return locale === id;
    }, [locale]);

    return (
        <div
            className="locale-toggle"
            onClick={() => setLocale(locale === LanguagesEnum.PL ? LanguagesEnum.EN : LanguagesEnum.PL)}
        >
            {Languages.map(language => (
                <div key={language.id} className={`locale-toggle-item${isSelected(language.id) ? " selected" : ""}`}>
                    {formatMessage({ id: language.titleId })}
                </div>
            ))}
        </div>
    );
}