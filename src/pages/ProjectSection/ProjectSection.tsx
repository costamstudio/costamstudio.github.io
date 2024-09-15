import { useMemo } from "react";
import { useIntl } from "react-intl";

import { Section } from "../../types/Section";
import { SectionType } from "../../enums/SectionType";

import "./ProjectSection.scss";

interface Props {
    projectId: string;
    sectionIndex: number;
    section: Section;
}

export const ProjectSection = ({ projectId, sectionIndex, section }: Props) => {
    const projectMedia = require.context('../../assets/project-media', true);
    const intl = useIntl();
    const { formatMessage } = intl;

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
        <div className={`section-container ${section.templateId.toLowerCase().replace("_", "-")}`}>
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
                <div className="section-text-container">
                    {hasTitle && <div className="section-title">{formatMessage({ id: `${sectionPath}.title` })}</div>}
                    {hasDescription && <div className="section-description">{formatMessage({ id: `${sectionPath}.description` })}</div>}
                </div>
            )}
        </div>
    );
};