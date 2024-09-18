import { useIntl } from "react-intl";

import { Glass } from "../../components/Glass/Glass";

import "./About.scss";

interface Props {
    isVisible: boolean;
}

export const About = ({ isVisible }: Props) => {
    const { formatMessage } = useIntl();

    return (
        <div className="about">
            <Glass/>
            <div className="about-content-container">
                <div className="about-content-item left">
                    <div className="about-title">{formatMessage({ id: "mission" })}</div>
                    <div className="about-text">{formatMessage({ id: "missionContent" })}</div>
                    <div className="about-text">{formatMessage({ id: "missionContentTwo" })}</div>
                </div>
                <div className="about-content-item right">
                    <div className="about-title">{formatMessage({ id: "whatDo" })}</div>
                    <div className="about-tags">
                        {formatMessage({ id: "whatDoTags" }).split(",").map((item, index) => (
                            <div key={`tag-${index}`} className="about-tag">
                                {`/ ${item}`}
                            </div>
                        ))}
                    </div>
                    <div className="about-text">{formatMessage({ id: "whatDoContent" })}</div>
                </div>
            </div>
        </div>
    );
};