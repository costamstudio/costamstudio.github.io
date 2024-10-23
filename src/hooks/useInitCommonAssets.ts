import { useCallback } from 'react';
import WebFont from 'webfontloader';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadImages, loadVideos } from '../utils/common';
import { setIsCommonAssetsLoaded } from '../store/assets';

const FONTS = ["SigmundPro-UltraLight", "SigmundPro-Regular", "T1Korium"];

export const useInitCommonAssets = () => {
  const dispatch = useAppDispatch();
  const { isCommonAssetsLoaded } = useAppSelector(({ assets }) => assets);

  const commonMedia = require.context(`../assets`, true);

  const initCommonAssets = useCallback(async() => {
    if (isCommonAssetsLoaded) {
      return;
    }

    await Promise.all([
      loadImages([
        commonMedia(`./images/logo.svg`),
        commonMedia(`./images/menu.png`),
        commonMedia(`./images/opened-menu.png`),
        commonMedia(`./images/contact-pl-vector.png`),
        commonMedia(`./images/contact-en-vector.png`),
        commonMedia(`./images/logo-footer.png`),
        commonMedia(`./images/email-icon.png`),
        commonMedia(`./images/facebook-icon.png`),
        commonMedia(`./images/instagram-icon.png`),
        commonMedia(`./images/linkedin-icon.png`),
        commonMedia(`./images/instagram-qr.svg`),
      ]),
      loadVideos([
        commonMedia(`./videos/contact-background.mp4`),
      ]),
      new Promise((resolve) => {
        WebFont.load({
          custom: { families: FONTS },
          active: () => resolve(true),
        });
      })
    ])
    dispatch(setIsCommonAssetsLoaded(true));
  }, [isCommonAssetsLoaded]);

  return { initCommonAssets };
};