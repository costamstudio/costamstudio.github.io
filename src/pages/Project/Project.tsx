import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { isMobile } from "react-device-detect";

import { PROJECTS } from "../../constants/projects";
import { ProjectSection } from "../ProjectSection/ProjectSection";
import { Contact } from "../Contact/Contact";

import "./Project.scss";
import { Language } from "../../enums/Language";

interface Props {
    locale: Language;
    setIsHeaderVisible: (isHeaderVisible: boolean) => void;
    setHasHeaderBackground: (hasHeaderBackground: boolean) => void;
    setHasHeaderBigLogo: (hasHeaderBigLogo: boolean) => void;
    contactBackground: HTMLVideoElement | null;
}

export const Project = ({ locale, setIsHeaderVisible, setHasHeaderBackground, setHasHeaderBigLogo, contactBackground }: Props) => {
    const { id } = useParams();
    const { formatMessage } = useIntl();
    const projectRef = useRef<HTMLDivElement>(null);

    const [scrollTop, setScrollTop] = useState(0);

    const projectMedia = require.context('../../assets/project-media', true);

    const project = useMemo(() => {
        return PROJECTS.find(project => project.id === id);
    }, [id]);

    const onScroll = useCallback(() => {
        if (projectRef.current) {
            const { scrollTop: newScrollTop } = projectRef.current;
            const isHeaderVisible = newScrollTop === 0 || scrollTop - newScrollTop > 0;
            setScrollTop(newScrollTop);
            setIsHeaderVisible(isHeaderVisible);
            setHasHeaderBackground(newScrollTop !== 0);
            setHasHeaderBigLogo(newScrollTop === 0);
        }
    }, [projectRef, scrollTop]);

    useEffect(() => {
        setIsHeaderVisible(true);
        setHasHeaderBackground(false);
        setHasHeaderBigLogo(true);
    }, []);

    return (
        <div ref={projectRef} className={`project-container${isMobile ? " mobile" : ""}`} onScroll={onScroll}>
                <div className="project-header-container">
                    <img className="project-thumbnail" src={projectMedia(`./${id}/preview.png`)}/>
                    <div className="project-header-content">
                        <div className="project-tags">
                            {formatMessage({ id: `projectContent.${id}.tags` }).split(",").map((item, index) => (
                                <div key={`project-tag-${index}`} className="project-tag">
                                    {`/ ${item}`}
                                </div>
                            ))}
                        </div>
                        <div className="project-title">{formatMessage({ id: `projectContent.${id}.title` })}</div>
                    </div>
                </div>
                <div className="project-sections-container">
                    {project?.sections.map((section, index) => (
                        <ProjectSection
                            key={`${id}-${index}`}
                            projectId={id ?? ""}
                            sectionIndex={index}
                            section={section}
                        />
                    ))}
                </div>
                <Contact locale={locale} contactBackground={contactBackground}/>
        </div>
    );
};