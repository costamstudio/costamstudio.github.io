import { useIntl } from "react-intl";

import { Project } from "../../types/Project";

import "./Preview.scss";

interface Props {
    project: Project
}

export const Preview = ({ project }: Props) => {
    const { formatMessage } = useIntl();
    const projects = require.context('../../assets/images/projects', true);

    return (
        <div className={`preview-container ${project.previewType.toLowerCase().replace("_", "-")}`}>
            <img className="preview-image" src={projects(`./${project.id}/preview.png`)}/>
            <div className="preview-text-container">
                <div className="preview-title">{formatMessage({ id: `projectContent.${project.id}.title` })}</div>
                <div className="preview-description">{formatMessage({ id: `projectContent.${project.id}.description` })}</div>
                <div className="preview-tags">
                    {formatMessage({ id: `projectContent.${project.id}.tags` }).split(",").map((item, index) => (
                        <div key={`preview-tag-${index}`} className="preview-tag">
                            {`/ ${item}`}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};