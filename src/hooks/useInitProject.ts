import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadImages, loadVideos } from '../utils/common';
import { PROJECTS } from '../constants/projects';
import { SectionType } from '../enums/SectionType';
import { Section } from '../types/Section';
import { addProject } from '../store/projects';

export const useInitProject = () => {
  const dispatch = useAppDispatch();
  const { loadedProjects } = useAppSelector(({ projects }) => projects);

  const projectMedia = require.context(`../assets/project-media`, true);

  const initProject = useCallback(async(id: string) => {
    const projectConfig = PROJECTS.find((project) => project.id === id);
    const isProjectLoaded = loadedProjects[id];
    if (!projectConfig || isProjectLoaded) {
      return;
    }

    await Promise.all([
      loadImages([
        projectMedia(`./${id}/thumbnail.png`),
        ...projectConfig.sections.reduce((result: string[], section: Section, index: number): string[] => {
          return section.type === SectionType.IMAGE ? [...result,  projectMedia(`./${id}/${index}.png`)] : result;
        }, []),
      ]),
      loadVideos([
        ...projectConfig.sections.reduce((result: string[], section: Section, index: number): string[] => {
          return section.type === SectionType.VIDEO ? [...result,  projectMedia(`./${id}/${index}.mp4`)] : result;
        }, []),
      ])
    ])
    dispatch(addProject(id));
  }, [projectMedia, loadedProjects]);

  return { initProject };
};