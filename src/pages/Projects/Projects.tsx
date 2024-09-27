import { useIntl } from "react-intl";
import { useCallback, useMemo, useRef } from "react";
import Carousel from 'react-multi-carousel';
import { isMobile } from "react-device-detect";

import { Preview } from "../Preview/Preview";
import { PROJECTS } from "../../constants/projects";
import { CAROUSEL_RESPONSIVE_CONFIG } from "./contants";
import { CarouselButtons } from "../../components/CarouselButtons/CarouselButtons";

import "./Projects.scss";
import { useOnScreen } from "../../hooks/useOnScreen";

export const Projects = () => {
    const { formatMessage } = useIntl();
    const ref = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(ref);

    const projectsToMainPreviews = useMemo(() => {
        return PROJECTS.filter(project => project.isShownInMainPreviews);
    }, []);

    const projectsToPreviewCarousel = useMemo(() => {
        return PROJECTS.filter(project => !project.isShownInMainPreviews);
    }, []);

    return (
        <div className={`projects${isMobile ? " mobile" : ""}`}>
            <div ref={ref} className={`projects-title-container${isOnScreen ? " visible" : ""}`}>
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