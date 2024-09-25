import { useIntl } from "react-intl";
import { useMemo } from "react";
import Carousel from 'react-multi-carousel';

import { Preview } from "../Preview/Preview";
import { PROJECTS } from "../../constants/projects";
import { CAROUSEL_RESPONSIVE_CONFIG } from "./contants";
import { CarouselButtons } from "../../components/CarouselButtons/CarouselButtons";

import "./Projects.scss";

export const Projects = () => {
    const { formatMessage } = useIntl();

    const projectsToMainPreviews = useMemo(() => {
        return PROJECTS.filter(project => project.isShownInMainPreviews);
    }, []);

    const projectsToPreviewCarousel = useMemo(() => {
        return PROJECTS.filter(project => !project.isShownInMainPreviews);
    }, []);

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
                <Carousel
                    swipeable={true}
                    draggable={false}
                    responsive={CAROUSEL_RESPONSIVE_CONFIG}
                    arrows={false}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<CarouselButtons />}
                >
                    {projectsToPreviewCarousel.map(project => (
                        <Preview
                            key={project.id}
                            project={project}
                            isCarouselPreview={true}
                        />
                    ))}
                </Carousel>
            </div>

        </div>
    );
};