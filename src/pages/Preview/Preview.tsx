import { useIntl } from "react-intl";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Reveal } from "react-awesome-reveal";

import { Project } from "../../types/Project";
import { BOTTOM_OPACITY_ANIMATION_PROPS, LEFT_RIGHT_ANIMATION_PROPS } from "../../constants/animations";

import "./Preview.scss";

interface Props {
    project: Project
    isCarouselPreview?: boolean;
}

export const Preview = ({ project, isCarouselPreview }: Props) => {
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const projectMedia = require.context('../../assets/project-media', true);

    const templateClass = useMemo(() => {
        return isCarouselPreview ? "carousel-preview" : project.previewType.toLowerCase().replaceAll("_", "-");
    }, [isCarouselPreview, project]);

    return (
        <div className={`preview-container ${templateClass}${isMobile ? " mobile" : ""}`}>
            <div className="preview-image-container">
                <img
                    className="preview-image"
                    src={projectMedia(`./${project.id}/preview.png`)}
                    onClick={() => navigate(`/project/${project.id}`)}
                />
            </div>
            <div className="preview-text-container">
                <Reveal {...LEFT_RIGHT_ANIMATION_PROPS}>
                    <div className="preview-title">
                        {formatMessage({ id: `projectContent.${project.id}.title` })}
                    </div>
                </Reveal>
                <Reveal {...BOTTOM_OPACITY_ANIMATION_PROPS}>
                    <div className="preview-description">
                        {formatMessage({ id: `projectContent.${project.id}.description` })}
                    </div>
                    <div className="preview-tags">
                        {formatMessage({ id: `projectContent.${project.id}.tags` }).split(",").map((item, index) => (
                            <div key={`preview-tag-${index}`} className="preview-tag">
                                {`/ ${item}`}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </div>
    );
};