import { Project } from '../types/Project';
import { PreviewTemplateId } from '../enums/PreviewTemplateId';
import { SectionTemplateId } from '../enums/SectionTemplateId';
import { SectionType } from '../enums/SectionType';

export const PROJECTS: Project[] = [
  {
    id: "a79a22a4-5d13-448b-9f71-585146b6a368",
    previewType: PreviewTemplateId.FULL_M_IL_TR,
    sections: [
      {
        templateId: SectionTemplateId.FULL_S_IL_TR,
        type: SectionType.IMAGE,
      },
      {
        templateId: SectionTemplateId.PART_M_L,
        type: SectionType.VIDEO,
      },
      {
        templateId: SectionTemplateId.PART_S_R,
        type: SectionType.IMAGE,
      },
      {
        templateId: SectionTemplateId.FULL_XXL_IC_TB,
        type: SectionType.IMAGE,
      },
      {
        templateId: SectionTemplateId.FULL_L_IR_TL,
        type: SectionType.VIDEO,
      },
      {
        templateId: SectionTemplateId.FULL_S_IC_TB,
        type: SectionType.IMAGE,
      },
    ],
    isShownInMainPreviews: true,
  },
  {
    id: "613e6f66-34be-468f-9da4-4ee387aaf7e4",
    previewType: PreviewTemplateId.FULL_S_IL_TR,
    sections: [],
    isShownInMainPreviews: true,
  },
  {
    id: "cac17a19-de9c-43a7-903e-75319560726d",
    previewType: PreviewTemplateId.FULL_XL_IC_TB,
    sections: [],
    isShownInMainPreviews: true,
  },
  {
    id: "38178337-c403-49bd-b848-316eee8a4727",
    previewType: PreviewTemplateId.FULL_S_IR_TL,
    sections: [],
    isShownInMainPreviews: true,
  },
  {
    id: "6824cc6b-ef17-45a5-be24-b9547312b8ac",
    previewType: PreviewTemplateId.FULL_XL_IC_TB,
    sections: [],
  },
  {
    id: "7fe36b44-a1af-446b-abe2-d2ad2ccef992",
    previewType: PreviewTemplateId.FULL_XXL_IC_TB,
    sections: [],
  },
  {
    id: "24de7f54-66a4-4ef5-b0c7-2763662fd3e6",
    previewType: PreviewTemplateId.FULL_L_IR_TB,
    sections: [],
  },
  {
    id: "f8550e11-c724-4a45-9335-3a70e069aab6",
    previewType: PreviewTemplateId.FULL_M_IL_TB,
    sections: [],
  },
];