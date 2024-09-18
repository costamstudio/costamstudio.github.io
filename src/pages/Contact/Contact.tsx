import { useIntl } from "react-intl";
import { useCallback } from "react";

import { Glass } from "../../components/Glass/Glass";
import contactVector from "../../assets/images/contact-vector.png";
import { EMAIL_LINK, FACEBOOK_LINK, LINKEDIN_LINK } from "./constants";

import "./Contact.scss";

interface Props {
    contactBackground: HTMLVideoElement | null;
}

export const Contact = ({ contactBackground }: Props) => {
    const { formatMessage } = useIntl();

    const openNewTabLink = useCallback((link: string) => {
        window.open(link, "_blank");
    }, []);

    return (
        <div className="contact-container">
            <video
                className="background-video"
                src={contactBackground?.src ?? ""}
                loop={true}
                autoPlay={true}
                muted={true}
            />
            <div className="contact-content-container">
                <img className="contact-vector" src={contactVector}/>
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
                            <div className="contact-content-instagram"/>
                            <div className="contact-content-social-links">
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