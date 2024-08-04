import "./Header.scss";
import { ReactNode, useCallback } from "react";
import { MenuItemsEnum } from "../../types/menu-items.enum";
import { useIntl } from "react-intl";
import { LocaleToggle } from "./LocaleToggle/LocaleToggle";
import { LanguagesEnum } from "../../types/languges.enum";

interface Props {
    locale: LanguagesEnum;
    setLocale: (locale: LanguagesEnum) => void;
    setClickedMenuItem: (item: MenuItemsEnum | null) => void;
}

export const Header = ({ locale, setLocale, setClickedMenuItem }: Props) => {
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

    return (
        <div className="header">
            <div className="header-logo" onClick={() => setClickedMenuItem(MenuItemsEnum.HOME)}/>
            <div className="header-menu">
                {getMenuItem(<div onClick={() => setClickedMenuItem(MenuItemsEnum.ABOUT)}>{formatMessage({ id: "about" })}</div>)}
                {getMenuItem(<div onClick={() => setClickedMenuItem(MenuItemsEnum.PROJECTS)}>{formatMessage({ id: "projects" })}</div>)}
                {getMenuItem(<div onClick={() => setClickedMenuItem(MenuItemsEnum.CONTACTS)}>{formatMessage({ id: "contacts" })}</div>)}
                {getMenuItem(<LocaleToggle locale={locale} setLocale={setLocale}/>)}
            </div>
        </div>
    )
};