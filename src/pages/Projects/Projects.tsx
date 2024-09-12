import { useIntl } from "react-intl";

import { Preview } from "../Preview/Preview";
import { PROJECTS } from "../../constants/projects";

import "./Projects.scss";

export const Projects = () => {
    const { formatMessage } = useIntl();

    return (
        <div className="projects">
            <div className="projects-title-container">
                <div className="projects-title">{formatMessage({ id: "somethingInspiring" })}</div>
                <div className="projects-title-description">{formatMessage({ id: "ourCreativeProjects" })}</div>
            </div>
            <div className="previews-container">
                {PROJECTS.map(project => <Preview project={project}/>)}
            </div>
        </div>
    );
};