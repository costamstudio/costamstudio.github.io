import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { isMobile } from "react-device-detect";
import { Reveal } from "react-awesome-reveal";

import { PROJECTS } from "../../constants/projects";
import { ProjectSection } from "../ProjectSection/ProjectSection";
import { Contact } from "../Contact/Contact";
import { BOTTOM_OPACITY_ANIMATION_PROPS, LEFT_RIGHT_ANIMATION_PROPS } from "../../constants/animations";
import { useInitProjectAssets } from "../../hooks/useInitProjectAssets";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Spinner } from "../../components/Spinner/Spinner";
import { setHasHeaderBackground, setHasHeaderBigLogo, setIsHeaderVisible } from "../../store/header";

import "./Project.scss";
import { MenuItem } from "../../enums/MenuItem";
import { setIsBottomContainerOpened, setIsRightContainerOpened } from "../../store/home";

export const Project = () => {
    const dispatch = useAppDispatch();
    const { id = "" } = useParams();
    const { loadedProjects, isCommonAssetsLoaded } = useAppSelector(({ assets }) => assets);
    const { openedSection } = useAppSelector(({ common }) => common);
    const { initProjectAssets } = useInitProjectAssets();
    const { formatMessage } = useIntl();
    const projectRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const [scrollTop, setScrollTop] = useState(0);

    const projectMedia = require.context('../../assets/project-media', true);

    const project = useMemo(() => {
        return PROJECTS.find(project => project.id === id);
    }, [id]);

    const onScroll = useCallback(() => {
        if (projectRef.current) {
            const { scrollTop: newScrollTop } = projectRef.current;
            setScrollTop(newScrollTop);
            dispatch(setIsHeaderVisible(newScrollTop === 0 || scrollTop - newScrollTop > 0));
            dispatch(setHasHeaderBackground(newScrollTop !== 0));
            dispatch(setHasHeaderBigLogo(newScrollTop === 0));
        }
    }, [projectRef, scrollTop]);

    useEffect(() => {
        switch (openedSection) {
            case MenuItem.CONTACTS:
                contactRef.current?.scrollIntoView({ behavior: "smooth" });
                dispatch(setIsBottomContainerOpened(true));
                dispatch(setIsRightContainerOpened(true));
                dispatch(setHasHeaderBigLogo(false));
                return;
            default:
                return;
        }
    }, [openedSection]);

    useEffect(() => {
        initProjectAssets(id);
        dispatch(setIsHeaderVisible(true));
        dispatch(setHasHeaderBackground(false));
        dispatch(setHasHeaderBigLogo(true));
    }, []);

    return (
        <>
            <div ref={projectRef} className={`project-container${isMobile ? " mobile" : ""}`} onScroll={onScroll}>
                <div className="project-header-container">
                    <img className="project-thumbnail" src={projectMedia(`./${id}/thumbnail.png`)}/>
                    <div className="project-header-content">
                        <Reveal {...BOTTOM_OPACITY_ANIMATION_PROPS}>
                            <div className="project-tags">
                                {formatMessage({ id: `projectContent.${id}.tags` }).split(",").map((item, index) => (
                                    <div key={`project-tag-${index}`} className="project-tag">
                                        {`/ ${item}`}
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                        <Reveal {...LEFT_RIGHT_ANIMATION_PROPS}>
                            <div className="project-title"> {formatMessage({ id: `projectContent.${id}.title` })}</div>
                        </Reveal>
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
                <div ref={contactRef}>
                    <Contact/>
                </div>
            </div>
            <Spinner isVisible={!loadedProjects[id] || !isCommonAssetsLoaded}/>
        </>
    );
};