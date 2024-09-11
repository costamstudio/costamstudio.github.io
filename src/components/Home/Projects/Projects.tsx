import "./Projects.scss";
import { useIntl } from "react-intl";

export const Projects = () => {
    const { formatMessage } = useIntl();

    return (
        <div className="projects">
            <div className="projects-title-container">
                <div className="projects-title">{formatMessage({ id: "somethingInspiring" })}</div>
                <div className="projects-title-description">{formatMessage({ id: "ourCreativeProjects" })}</div>
            </div>
        </div>
    );
};