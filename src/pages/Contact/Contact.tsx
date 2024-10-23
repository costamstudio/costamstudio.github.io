import { useIntl } from "react-intl";
import { useCallback } from "react";
import { isMobile, isMobileOnly } from "react-device-detect";

import { Glass } from "../../components/Glass/Glass";
import contactPlVector from "../../assets/images/contact-pl-vector.png";
import contactEnVector from "../../assets/images/contact-en-vector.png";
import { EMAIL_LINK, FACEBOOK_LINK, INSTAGRAM_LINK, LINKEDIN_LINK } from "./constants";
import { Language } from "../../enums/Language";

import "./Contact.scss";

interface Props {
    locale: Language;
}

export const Contact = ({ locale }: Props) => {
    const { formatMessage } = useIntl();
    const assets = require.context('../../assets', true);

    const openNewTabLink = useCallback((link: string) => {
        window.open(link, "_blank");
    }, []);

    return (
        <div className={`contact-container${isMobile ? " mobile" : ""}`}>
            <video
                className="background-video"
                src={assets("./videos/contact-background.mp4")}
                loop={true}
                autoPlay={true}
                muted={true}
            />
            <div className="contact-content-container">
                <img className="contact-vector" src={locale === Language.PL ? contactPlVector : contactEnVector}/>
                <Glass/>
                <div className="footer">
                    <div className="logo"/>
                    <div className="footer-content">{formatMessage({ id: "footerContent" })}</div>
                    <div className="footer-policy">{formatMessage({ id: "policy" })}</div>
                </div>
                <div className="contact-content">
                    <div className="contact-content-text">
                        <div className="contact-content-item">
                            <div className="contact-content-title">/ {formatMessage({ id: "address" })}</div>
                            <div className="contact-content-value">{formatMessage({ id: "addressValue" })}</div>
                        </div>
                        <div className="contact-content-item">
                            <div className="contact-content-title">/ {formatMessage({ id: "email" })}</div>
                            <div className="contact-content-value">{formatMessage({ id: "emailValue" })}</div>
                        </div>
                    </div>
                    <div  className="contact-content-image-container">
                        <div className="contact-content-image-title">/ {formatMessage({ id: "socialMedia" })}</div>
                        <div className="contact-content-image-socials">
                            {!isMobileOnly && (
                                <div className="contact-content-instagram-qr"/>
                            )}
                            <div className="contact-content-social-links">
                                {isMobileOnly && (
                                    <div
                                        className="contact-content-instagram social-link-icon"
                                        onClick={() => openNewTabLink(INSTAGRAM_LINK)}
                                    />
                                )}
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
            </div>
        </div>
    );
};