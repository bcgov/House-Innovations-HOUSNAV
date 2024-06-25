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
  definition: string; // The definition of the term in HTML format
  cleanDefinition: string; // The definition of the term in plain text format
  definitionList?: string[]; // A list of definitions for the term to be in a bulleted list
  hideTerm?: boolean; // A boolean to hide the term from the glossary (Used for major occupancy groups currently)
};

export type ArticleType = {
  section: string; // The section of the glossary (Used for the anchor link)
  header?: string;
  content: ArticleContentType | GlossaryContentType;
};

export type BuildingGlossaryJSONType = {
  [term: string]: GlossaryContentType;
};

const GlossaryJSONData = glossary as unknown as BuildingGlossaryJSONType;

// TODO: (ANY) Move to useBuildingCodeData
export const BuildingCodeJSONData = buildingCode as unknown as ArticleType[];

export default function transformGlossaryData(
  data: BuildingGlossaryJSONType,
): ArticleType[] {
  return Object.entries(data).map(([term, content]) => ({
    section: term.toLocaleLowerCase(),
    header: undefined,
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

export const ModalGlossaryData = transformGlossaryData(GlossaryJSONData);
export const TooltipGlossaryData = setMappedGlossaryData(GlossaryJSONData);
