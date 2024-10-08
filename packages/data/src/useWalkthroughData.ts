import testCase999 from "../json/walkthroughs/single-dwelling-9.9.9.json";
import testCase91014 from "../json/walkthroughs/single-dwelling-9.10.14.json";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";

interface UseWalkthroughDataProps {
  /*
   * walkthrough ID of the data to get
   */
  id: string;
  /*
   * building type of the data to get
   */
  buildingType: string;
}

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
  valuesToCheck?: NextValuesToCheckType[];
}

export interface NextNavigationLogic extends NextValuesToCheckType {
  answerValues?: AnswerValueTypes[];
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

// TODO - HOUSNAV-191
// export type RelatedWalkthroughsType = string[] | Walkthroughs[];
export type StartingSectionIdType = string;
export type QuestionDisplayData =
  | QuestionMultipleChoiceData
  | QuestionMultipleChoiceSelectMultipleData
  | QuestionNumberFloatData;
export interface WalkthroughJSONType {
  info: WalkthroughInfo;
  sections: {
    [key: string]: SectionData;
  };
  questions: {
    [key: string]: QuestionDisplayData | QuestionVariableData;
  };
  // relatedWalkthroughs: RelatedWalkthroughsType;
  results: {
    [key: string]: ResultData;
  };
}

export const WalkthroughJSONData: Record<
  EnumBuildingTypes,
  Record<EnumWalkthroughIds, WalkthroughJSONType>
> = {
  [EnumBuildingTypes.SINGLE_DWELLING]: {
    [EnumWalkthroughIds._9_9_9]: testCase999,
    [EnumWalkthroughIds._9_10_14]: testCase91014,
  },
  // TODO - HOUSNAV-200
  [EnumBuildingTypes.MULTI_DWELLING]: {
    [EnumWalkthroughIds._9_9_9]: testCase999,
    [EnumWalkthroughIds._9_10_14]: testCase91014,
  },
};

export default function useWalkthroughData({
  id,
  buildingType,
}: UseWalkthroughDataProps): WalkthroughJSONType {
  const data =
    WalkthroughJSONData[buildingType as EnumBuildingTypes][
      id as EnumWalkthroughIds
    ];
  if (!data) {
    throw new Error(`No data found for walkthrough ${id}`);
  }

  return data;
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
