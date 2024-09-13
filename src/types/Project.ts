import { PreviewTemplateId } from '../enums/PreviewTemplateId';
import { Section } from './Section';

export interface Project {
  id: string;
  previewType: PreviewTemplateId;
  sections: Section[];
  isShownInMainPreviews?: boolean;
}