import { useIntl } from "react-intl";
import { useMemo, useState } from "react";

import { Preview } from "../Preview/Preview";
import { PROJECTS } from "../../constants/projects";
import { CAROUSEL_MAX_ITEM_LENGTH } from "./contants";

import "./Projects.scss";

export const Projects = () => {
    const { formatMessage } = useIntl();
    const [carouselPage, setCarouselPage] = useState(0);

    const projectsToMainPreviews = useMemo(() => {
        return PROJECTS.filter(project => project.isShownInMainPreviews);
    }, [PROJECTS]);

    const projectsToPreviewCarousel = useMemo(() => {
        return PROJECTS.filter(project => !project.isShownInMainPreviews);
    }, [PROJECTS]);

    const carouselMaxPage = useMemo(() => {
        return Math.ceil(projectsToPreviewCarousel.length / CAROUSEL_MAX_ITEM_LENGTH) - 1;
    }, [projectsToPreviewCarousel.length]);

    const visiblePreviewCarouselProjects = useMemo(() => {
        const startItemIndex = carouselPage * CAROUSEL_MAX_ITEM_LENGTH;
        const endItemIndex = startItemIndex + CAROUSEL_MAX_ITEM_LENGTH;
        return projectsToPreviewCarousel.slice(startItemIndex, endItemIndex);
    }, [projectsToPreviewCarousel, carouselPage]);

    return (
        <div className="projects">
            <div className="projects-title-container">
                <div className="projects-title">{formatMessage({ id: "somethingInspiring" })}</div>
                <div className="projects-title-description">{formatMessage({ id: "ourCreativeProjects" })}</div>
            </div>
            <div className="previews-container">
                {projectsToMainPreviews.map(project => <Preview key={project.id} project={project}/>)}
            </div>
            <div className="preview-carousel-container">
                <div className="preview-carousel">
                    {visiblePreviewCarouselProjects.map(project => (
                        <Preview
                            key={project.id}
                            project={project}
                            isCarouselPreview={true}
                        />
                    ))}
                </div>
                <div style={{ display: "flex", gap: "20px", color: "white", cursor: "pointer" }}>
                    <div onClick={() => carouselPage !== 0 && setCarouselPage(carouselPage - 1)}>PREV</div>
                    <div onClick={() => carouselPage < carouselMaxPage && setCarouselPage(carouselPage + 1)}>NEXT</div>
                </div>
            </div>

        </div>
    );
};