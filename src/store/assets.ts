import { createSlice } from '@reduxjs/toolkit';

interface AssetsState {
  loadedProjects: Record<string, boolean>;
  isCommonAssetsLoaded: boolean;
  isHomeAssetsLoaded: boolean;
  isLogoArtImagesLoaded: boolean;
  isLogoArtVideoLoaded: boolean;
}

const initialState: AssetsState = {
  loadedProjects: {},
  isCommonAssetsLoaded: false,
  isHomeAssetsLoaded: false,
  isLogoArtImagesLoaded: false,
  isLogoArtVideoLoaded: false,
};

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.loadedProjects = { ...state.loadedProjects, [action.payload]: true };
    },
    setIsCommonAssetsLoaded: (state, action) => {
      state.isCommonAssetsLoaded = action.payload;
    },
    setIsHomeAssetsLoaded: (state, action) => {
      state.isHomeAssetsLoaded = action.payload;
    },
    setIsLogoArtImagesLoaded: (state, action) => {
      state.isLogoArtImagesLoaded = action.payload;
    },
    setIsLogoArtVideoLoaded: (state, action) => {
      state.isLogoArtVideoLoaded = action.payload;
    },
  },
});

export const {
  addProject,
  setIsCommonAssetsLoaded,
  setIsHomeAssetsLoaded,
  setIsLogoArtImagesLoaded,
  setIsLogoArtVideoLoaded,
} = assetsSlice.actions;

export default assetsSlice.reducer;