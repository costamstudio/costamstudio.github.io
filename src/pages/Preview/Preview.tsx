import { useIntl } from "react-intl";
import { useMemo } from "react";

import { Project } from "../../types/Project";
import { GlitchContainer } from "../../components/GlitchContainer/GlitchContainer";

import "./Preview.scss";

interface Props {
    project: Project
    isCarouselPreview?: boolean;
}

export const Preview = ({ project, isCarouselPreview }: Props) => {
    const { formatMessage } = useIntl();
    const projects = require.context('../../assets/images/projects', true);

    const templateClass = useMemo(() => {
        return isCarouselPreview ? "carousel-preview" : project.previewType.toLowerCase().replace("_", "-");
    }, [isCarouselPreview, project]);

    return (
        <div className={`preview-container ${templateClass}`}>
            <GlitchContainer>
                <img className="preview-image" src={projects(`./${project.id}/preview.png`)}/>
            </GlitchContainer>
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