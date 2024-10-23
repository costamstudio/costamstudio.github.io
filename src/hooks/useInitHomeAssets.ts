import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadImages, loadVideos } from '../utils/common';
import { setIsHomeAssetsLoaded } from '../store/assets';
import { PROJECTS } from '../constants/projects';

export const useInitHomeAssets = () => {
  const dispatch = useAppDispatch();
  const { isHomeAssetsLoaded } = useAppSelector(({ assets }) => assets);

  const commonMedia = require.context(`../assets`, true);

  const initHomeAssets = useCallback(async() => {
    if (isHomeAssetsLoaded) {
      return;
    }
    await Promise.all([
      loadImages([
        commonMedia(`./images/arrow.png`),
        commonMedia(`./images/logo-studio.svg`),
        ...PROJECTS.map(({ id }) => commonMedia(`./project-media/${id}/preview.png`)),
      ]),
      loadVideos([
        commonMedia(`./videos/logo-art-background.mp4`),
      ]),
    ])
    dispatch(setIsHomeAssetsLoaded(true));
  }, [isHomeAssetsLoaded]);

  return { initHomeAssets };
};