import glossary from "../json/terms.json";
import buildingCode from "../json/buildingCode.json";

export enum ModalSideDataEnum {
  GLOSSARY = "glossary",
  BUILDING_CODE = "buildingCode",
}

export type ImageModalType = {
  numberReference: string;
  fileName: string;
  tableName: string;
  title: string;
  imageReference: string;
  imageLabel: string;
  imageNotes?: string;
};

export type PartType = {
  numberReference: string;
  title: string;
  sections: SectionType[];
};

export type SectionType = {
  numberReference: string;
  title: string;
  subsections: SubsectionType[];
};

export type SubsectionType = {
  numberReference: string;
  title: string;
  articles: ArticleType[];
};

export type ArticleType = {
  numberReference: string;
  title?: string;
  sentences: SentenceType[];
};

export type SentenceType = {
  numberReference: string;
  description: string;
  clauses?: SubClauseType[];
  image?: ImageModalType;
};

export type SubClauseType = {
  numberReference: string;
  description: string;
  subClauses?: string[];
};

export type GlossaryType = {
  reference: string; // The reference of the glossary (Used for the anchor link)
  content: GlossaryContentType;
};

export type GlossaryContentType = {
  definition: string; // The definition of the term in HTML format
  cleanDefinition: string; // The definition of the term in plain text format
  definitionList?: string[]; // A list of definitions for the term to be in a bulleted list
  hideTerm?: boolean; // A boolean to hide the term from the glossary (Used for major occupancy groups currently)
};

export type BuildingGlossaryJSONType = {
  [term: string]: GlossaryContentType;
};

export type ModalSideDataType = {
  [ModalSideDataEnum.GLOSSARY]: GlossaryType[];
  [ModalSideDataEnum.BUILDING_CODE]: PartType[];
};

const GlossaryJSONData = glossary as unknown as BuildingGlossaryJSONType;

export const BuildingCodeJSONData = buildingCode as unknown as PartType[];

export default function transformGlossaryData(
  data: BuildingGlossaryJSONType,
): GlossaryType[] {
  return Object.entries(data).map(([term, content]) => ({
    reference: term.toLocaleLowerCase(),
    content,
  }));
}

function setMappedGlossaryData(
  data: BuildingGlossaryJSONType,
): Map<string, string> {
  return new Map(
    Object.entries(data).map(([term, content]) => [
      term.toLowerCase(),
      content.cleanDefinition,
    ]),
  );
}

function setStaticData(): ModalSideDataType {
  return {
    [ModalSideDataEnum.GLOSSARY]: transformGlossaryData(GlossaryJSONData),
    [ModalSideDataEnum.BUILDING_CODE]: BuildingCodeJSONData,
  };
}

export const ModalGlossaryData = transformGlossaryData(GlossaryJSONData);
export const TooltipGlossaryData = setMappedGlossaryData(GlossaryJSONData);
export const StaticData = setStaticData();
