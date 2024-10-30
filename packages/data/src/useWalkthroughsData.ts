// repo
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
  STR_BUILDING_TYPE_ANALYSIS_ID,
} from "@repo/constants/src/constants";
// local
import buildingTypeAnalysisData from "../json/building-types/wt-building-type-analysis.json";
import singleDwelling999 from "../json/building-types/single-dwelling/wt-single-dwelling-9.9.9.json";
import singleDwelling91014 from "../json/building-types/single-dwelling/wt-single-dwelling-9.10.14.json";
import multiDwelling999 from "../json/building-types/multi-dwelling/wt-multi-dwelling-9.9.9.json";
import multiDwelling91014 from "../json/building-types/multi-dwelling/wt-multi-dwelling-9.10.14.json";

export const PropertyNameVariableToSet = "variableToSet";
export const PropertyNameQuestionText = "questionText";
export const PropertyNamePossibleAnswers = "possibleAnswers";
export const PropertyNameAnswerToUse = "answerToUse";
export const PropertyResultLogicItems = "resultLogicItems";
export const PropertyCalculationValueToUse = "calculationValueToUse";
export const PropertyDefaultValue = "defaultValue";
export type AnswerValueTypes = string;

export enum ShowAnswerIfLogicType {
  Equals = "equals",
  GreaterThan = "greaterThan",
}

interface ShowAnswerIf {
  showAnswerLogicType: ShowAnswerIfLogicType | string;
  answerToCheck: string;
  answerValue: string;
}

export interface PossibleAnswer {
  answerDisplayText: string;
  answerValueDisplay?: string;
  answerValue: AnswerValueTypes;
  showAnswerIf?: boolean | ShowAnswerIf[];
}

export enum NextNavigationLogicType {
  Equal = "equal",
  NotEqual = "notEqual",
  DoesNotContain = "doesNotContain",
  ContainsAny = "containsAny",
  ContainsOnly = "containsOnly",
  And = "and",
  Or = "or",
  LessThan = "lessThan",
  GreaterThan = "greaterThan",
  Fallback = "fallback",
}

export interface NextValuesToCheckType {
  nextLogicType: NextNavigationLogicType | string;
  answerToCheck?: string;
  answerValue?: AnswerValueTypes;
  answerValues?: AnswerValueTypes[];
  valuesToCheck?: NextValuesToCheckType[];
}

export interface NextNavigationLogic extends NextValuesToCheckType {
  nextNavigateTo?: string;
}

export enum VariableValueCalculationType {
  Square = "square",
  Divide = "divide",
  Multiply = "multiply",
  MaxValue = "maxValue",
  Then = "then",
}

export interface VariableValueToSetItemCalculations {
  variableValueCalculationType: VariableValueCalculationType | string;
  calculationValueToUse?: number;
}

export interface VariableValueToSetCalculation
  extends VariableValueToSetItemCalculations {
  variableValueToSetItemCalculations?: VariableValueToSetItemCalculations[];
  answerToUse: string;
}

export enum VariableValueLogicType {
  Equals = "equals",
  And = "and",
  Or = "or",
  LessThan = "lessThan",
  GreaterThan = "greaterThan",
  ContainsOnly = "containsOnly",
  Fallback = "fallback",
}

export interface VariableValuesToCheckType {
  variableValueLogicType: VariableValueLogicType | string;
  answerToCheck?: string;
  answerValue?: AnswerValueTypes;
  valuesToCheck?: VariableValuesToCheckType[];
}

export interface VariableValueLogic extends VariableValuesToCheckType {
  answerValues?: AnswerValueTypes[];
  variableValueToSet?: string | number;
  variableValueToSetCalculation?: VariableValueToSetCalculation;
}

export interface InvalidAnswerLogic {
  invalidAnswerLogicType: string;
  invalidAnswerLogicValue: number;
}

export interface PossibleInvalidAnswer {
  invalidAnswerType: string;
  answerValue: AnswerValueTypes;
  invalidAnswerLogic: InvalidAnswerLogic[];
  errorMessage: string;
}

export enum VariableToSetType {
  Object = "object",
  Number = "number",
  Copy = "copy",
}
export type VariableValueType =
  | {
      [key: string]: VariableValueLogic[];
    }
  | VariableValueLogic[]
  | number
  | string;
export interface VariableToSet {
  variableType: VariableToSetType | string;
  variableName: string;
  variableValue: VariableValueType;
}

type QuestionCodeReferenceType = {
  displayString: string;
  codeNumber: string;
};

export interface QuestionBaseData {
  [PropertyNameQuestionText]: string;
  questionSubtext?: string;
  questionCodeReference?: QuestionCodeReferenceType;
  [PropertyNamePossibleAnswers]: PossibleAnswer[];
  nextNavigationLogic: NextNavigationLogic[];
}

export const WalkthroughItemTypeMultiChoice = "multiChoice";
export const isWalkthroughItemTypeMultiChoice = (walkthroughItemType: string) =>
  walkthroughItemType === WalkthroughItemTypeMultiChoice;
export interface QuestionMultipleChoiceData extends QuestionBaseData {
  walkthroughItemType: typeof WalkthroughItemTypeMultiChoice | string;
}

export const WalkthroughItemTypeMultiChoiceMultiple = "multiChoiceMultiple";
export const isWalkthroughItemTypeMultiChoiceMultiple = (
  walkthroughItemType: string,
) => walkthroughItemType === WalkthroughItemTypeMultiChoiceMultiple;
export interface QuestionMultipleChoiceSelectMultipleData
  extends QuestionBaseData {
  walkthroughItemType: typeof WalkthroughItemTypeMultiChoiceMultiple | string;
  possibleInvalidAnswers?: PossibleInvalidAnswer[];
  answersAreDynamic?: boolean;
  storeAnswerAsObject?: boolean;
  isNotRequired?: boolean;
}

export const WalkthroughItemTypeVariable = "variable";
export const isWalkthroughItemTypeVariable = (walkthroughItemType: string) =>
  walkthroughItemType === WalkthroughItemTypeVariable;
export interface QuestionVariableData {
  walkthroughItemType: typeof WalkthroughItemTypeVariable | string;
  [PropertyNameVariableToSet]: VariableToSet;
  nextNavigationLogic: NextNavigationLogic[];
}

export const WalkthroughItemTypeNumberFloat = "numberFloat";
export const isWalkthroughItemTypeNumberFloat = (walkthroughItemType: string) =>
  walkthroughItemType === WalkthroughItemTypeNumberFloat;
export interface QuestionNumberFloatData
  extends Omit<QuestionBaseData, typeof PropertyNamePossibleAnswers> {
  walkthroughItemType: typeof WalkthroughItemTypeNumberFloat | string;
  placeholder: string;
  unit?: string;
}

export enum ResultCalculationType {
  MaxBetween = "maxBetween",
  MinBetween = "minBetween",
  Divide = "divide",
  Multiply = "multiply",
  Minus = "minus",
  Square = "square",
  Answer = "answer",
  Number = "number",
  Logic = "logic",
}

export enum ResultLogicTypes {
  Fallback = "fallback",
  GreaterThanOrEqual = "greaterThanOrEqual",
}

export interface ResultLogicItem {
  resultLogicType: ResultLogicTypes | string;
  answerToCheck?: string;
  answerValue?: number;
  valueToUse: number;
}

interface ResultCalculationBase {
  resultCalculationType: ResultCalculationType | string;
  calculationValuesToUse?: ResultCalculationValue[];
}

export interface ResultCalculationValue extends ResultCalculationBase {
  [PropertyNameAnswerToUse]?: string;
  [PropertyCalculationValueToUse]?: number | ResultCalculationValue;
  [PropertyDefaultValue]?: number;
  [PropertyResultLogicItems]?: ResultLogicItem[];
}

export interface ResultCalculation extends ResultCalculationBase {
  id: string;
  calculationValuesToUse: ResultCalculationValue[];
}

export interface ResultData {
  resultDisplayMessage: string;
  resultCalculations?: ResultCalculation[];
  relatedBuildingType?: string;
}

export interface SectionData {
  sectionTitle: string;
  sectionQuestions: string[];
}

export interface WalkthroughInfo {
  title: string;
  walkthroughTitle: string;
  subtitle: string;
  description: string;
  startingSectionId: StartingSectionIdType;
}

export type StartingSectionIdType = string;
export type QuestionDisplayData =
  | QuestionMultipleChoiceData
  | QuestionMultipleChoiceSelectMultipleData
  | QuestionNumberFloatData;
export interface WalkthroughJSONInterface {
  info: WalkthroughInfo;
  sections: {
    [key: string]: SectionData;
  };
  questions: {
    [key: string]: QuestionDisplayData | QuestionVariableData;
  };
  results: {
    [key: string]: ResultData;
  };
}

export interface WalkthroughsDataInterface<
  T extends string = EnumWalkthroughIds,
> {
  startingWalkthroughId: T;
  walkthroughOrder: T[];
  walkthroughsById: Record<T, WalkthroughJSONInterface>;
  resultsDisplay?: {
    hideRelatedItems?: boolean;
    hidePDF?: boolean;
    hideBanner?: boolean;
    showReturnToHome?: boolean;
  };
}

export const BuildingTypeAnalysisJSONData: WalkthroughJSONInterface =
  buildingTypeAnalysisData;

export const WalkthroughJSONData: Record<
  EnumBuildingTypes,
  Record<EnumWalkthroughIds, WalkthroughJSONInterface>
> = {
  [EnumBuildingTypes.SINGLE_DWELLING]: {
    [EnumWalkthroughIds._9_9_9]: singleDwelling999,
    [EnumWalkthroughIds._9_10_14]: singleDwelling91014,
  },
  [EnumBuildingTypes.MULTI_DWELLING]: {
    [EnumWalkthroughIds._9_9_9]: multiDwelling999,
    [EnumWalkthroughIds._9_10_14]: multiDwelling91014,
  },
};

interface UseWalkthroughsDataProps {
  /*
   * walkthrough IDs of the data to get
   */
  wtIds: string[];
  /*
   * building type of the data to get
   */
  buildingType: string;
}

export default function useWalkthroughsData({
  wtIds,
  buildingType,
}: UseWalkthroughsDataProps): WalkthroughsDataInterface {
  const data = { walkthroughsById: {} } as WalkthroughsDataInterface;
  const startingWalkthroughId = wtIds[0];

  if (!buildingType || !startingWalkthroughId) {
    throw new Error("No building type or ids provided");
  }

  // the starting walkthrough will be the first one in the list
  data.startingWalkthroughId = startingWalkthroughId as EnumWalkthroughIds;

  // the order of the walkthroughs will be the order of the IDs
  data.walkthroughOrder = wtIds as EnumWalkthroughIds[];

  // iterate through the walkthrough IDs and merge the data
  wtIds.forEach((wtId) => {
    const wtData =
      WalkthroughJSONData[buildingType as EnumBuildingTypes][
        wtId as EnumWalkthroughIds
      ];
    if (!wtData) {
      throw new Error(`No data found for walkthrough ${wtId}`);
    }

    data.walkthroughsById[wtId as EnumWalkthroughIds] = wtData;
  });

  return data;
}

export function useBuildingTypeAnalysisData(): WalkthroughsDataInterface<string> {
  return {
    walkthroughOrder: [STR_BUILDING_TYPE_ANALYSIS_ID],
    startingWalkthroughId: STR_BUILDING_TYPE_ANALYSIS_ID,
    walkthroughsById: {
      [STR_BUILDING_TYPE_ANALYSIS_ID]: BuildingTypeAnalysisJSONData,
    },
    resultsDisplay: {
      hideRelatedItems: true,
      hidePDF: true,
      hideBanner: true,
      showReturnToHome: true,
    },
  };
}

export const findSectionTitleByQuestionId = (
  questionId: string,
  sections: { [key: string]: SectionData },
) => {
  if (!sections) {
    return null;
  }

  for (const sectionKey in sections) {
    if (sections[sectionKey]?.sectionQuestions.includes(questionId)) {
      return sections[sectionKey]?.sectionTitle || null;
    }
  }
  return null;
};
