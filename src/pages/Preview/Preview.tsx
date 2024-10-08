import { useIntl } from "react-intl";
import { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { Project } from "../../types/Project";
import { useOnScreen } from "../../hooks/useOnScreen";

import "./Preview.scss";

interface Props {
    project: Project
    isCarouselPreview?: boolean;
}

export const Preview = ({ project, isCarouselPreview }: Props) => {
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const ref = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(ref);
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
            <div ref={ref} className="preview-text-container">
                <div
                    className={`preview-title${isOnScreen ? " visible" : ""}`}>{formatMessage({ id: `projectContent.${project.id}.title` })}</div>
                <div
                    className={`preview-description${isOnScreen ? " visible" : ""}`}>{formatMessage({ id: `projectContent.${project.id}.description` })}</div>
                <div className={`preview-tags${isOnScreen ? " visible" : ""}`}>
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