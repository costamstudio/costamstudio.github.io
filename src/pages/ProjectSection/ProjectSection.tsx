import { useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import { isMobile } from "react-device-detect";

import { Section } from "../../types/Section";
import { SectionType } from "../../enums/SectionType";

import "./ProjectSection.scss";
import { useOnScreen } from "../../hooks/useOnScreen";

interface Props {
    projectId: string;
    sectionIndex: number;
    section: Section;
}

export const ProjectSection = ({ projectId, sectionIndex, section }: Props) => {
    const projectMedia = require.context('../../assets/project-media', true);
    const intl = useIntl();
    const { formatMessage } = intl;
    const ref = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(ref);

    const sectionPath = useMemo(() => {
        return `projectContent.${projectId}.sections.${sectionIndex}`;
    }, [projectId, sectionIndex]);

    const hasTitle = useMemo(() => {
        return !!intl.messages[`${sectionPath}.title`];
    }, [sectionPath, intl]);

    const hasDescription = useMemo(() => {
        return !!intl.messages[`${sectionPath}.description`];
    }, [sectionPath, intl]);

    return (
        <div className={`section-container ${section.templateId.toLowerCase().replaceAll("_", "-")}${isMobile ? " mobile" : ""}`}>
            <div className="section-media">
                {section.type === SectionType.IMAGE ? (
                    <img className="section-media" src={projectMedia(`./${projectId}/${sectionIndex}.png`)}/>
                ) : (
                    <video
                        className="section-media"
                        src={projectMedia(`./${projectId}/${sectionIndex}.mp4`)}
                        loop={true}
                        autoPlay={true}
                        muted={true}
                    />
                )}
            </div>
            {(hasTitle || hasDescription) && (
                <div ref={ref} className="section-text-container">
                    {hasTitle &&
                        <div className={`section-title${isOnScreen ? " visible" : ""}`}>{formatMessage({ id: `${sectionPath}.title` })}</div>}
                    {hasDescription && <div
                        className={`section-description${isOnScreen ? " visible" : ""}`}>{formatMessage({ id: `${sectionPath}.description` })}</div>}
                </div>
            )}

        </div>
    );
};