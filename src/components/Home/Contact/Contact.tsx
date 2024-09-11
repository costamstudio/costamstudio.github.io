import { useResizeDetector } from "react-resize-detector";

import { Glass } from "../../Glass/Glass";
import contactVector from "../../../assets/images/contact-vector.png";

import "./Contact.scss";
import { FormattedMessage, useIntl } from "react-intl";

interface Props {
    contactBackground: HTMLVideoElement | null;
}

export const Contact = ({ contactBackground }: Props) => {
    const { formatMessage } = useIntl();
    const { width, ref } = useResizeDetector();

    return (
        <div ref={ref} className="contact-container">
            <video
                className="background-video"
                src={contactBackground?.src ?? ""}
                loop={true}
                autoPlay={true}
                muted={true}
            />
            <div className="contact-content-container">
                <img className="contact-vector" src={contactVector}/>
                <Glass width={width ?? 0}/>
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
                        <div className="contact-content-image"/>
                    </div>
                </div>
            </div>
        </div>
    );
};