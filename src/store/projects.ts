import { createSlice } from '@reduxjs/toolkit';

interface ProjectsState {
  loadedProjects: Record<string, boolean>;
}

const initialState: ProjectsState = {
  loadedProjects: {}
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.loadedProjects = { ...state.loadedProjects, [action.payload]: true };
    },
  },
});

export const { addProject } = projectsSlice.actions;

export default projectsSlice.reducer;