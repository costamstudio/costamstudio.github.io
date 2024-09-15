import { SectionTemplateId } from '../enums/SectionTemplateId';
import { SectionType } from '../enums/SectionType';

export interface Section {
  type: SectionType;
  templateId: SectionTemplateId;
}