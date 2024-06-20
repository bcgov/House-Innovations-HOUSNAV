import glossary from "../json/terms.json";
import buildingCode from "../json/buildingCode.json";

export enum ModalSideDataEnum {
  GLOSSARY = "glossary",
  BUILDING_CODE = "buildingCode",
}

export type SubClauseType = {
  description: string;
  subClauses?: string[];
  imagePath?: string;
  imageDescription?: string;
};

export type ClauseType = {
  description: string;
  subsections?: SubClauseType[];
};

export type ArticleContentType = {
  clauses: ClauseType[];
};

export type GlossaryContentType = {
  definition: string;
  cleanDefinition: string;
  hideTerm: boolean;
};

export type ArticleType = {
  section: string;
  header?: string;
  content: ArticleContentType | GlossaryContentType;
};

export type BuildingGlossaryJSONType = {
  [term: string]: GlossaryContentType;
};

const GlossaryJSONData = glossary as unknown as BuildingGlossaryJSONType;
export const BuildingCodeJSONData = buildingCode as unknown as ArticleType[];

export default function transformGlossaryData(
  data: BuildingGlossaryJSONType
): ArticleType[] {
  return Object.entries(data).map(([term, content]) => ({
    section: term.toLocaleLowerCase(),
    header: undefined,
    content,
  }));
}

function setMappedGlossaryData(
  data: BuildingGlossaryJSONType
): Map<string, string> {
  return new Map(
    Object.entries(data).map(([term, content]) => [
      term.toLowerCase(),
      content.cleanDefinition,
    ])
  );
}

export const ModalGlossaryData = transformGlossaryData(GlossaryJSONData);
export const TooltipGlossaryData = setMappedGlossaryData(GlossaryJSONData);
