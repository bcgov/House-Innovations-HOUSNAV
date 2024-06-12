import testCase999 from "../walkthroughs/9.9.9.json";

export const Walkthroughs = ["9.9.9"];

interface UseWalkthroughDataProps {
  /*
   * ID of the data to get
   */
  id: string;
}

export const VariableToSetPropertyName = "variableToSet";
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
  And = "and",
  Or = "or",
  LessThan = "lessThan",
  Fallback = "fallback",
}

export interface ValuesToCheckType {
  nextLogicType: NextNavigationLogicType | string;
  answerToCheck?: string;
  answerValue?: AnswerValueTypes;
  valuesToCheck?: ValuesToCheckType[];
}

export interface NextNavigationLogic extends ValuesToCheckType {
  answerValues?: AnswerValueTypes[];
  nextNavigateTo?: string;
}

export enum VariableValueLogicType {
  Equals = "equals",
  Fallback = "fallback",
}
interface VariableValueLogic {
  variableValueLogicType: VariableValueLogicType | string;
  answerToCheck?: string;
  answerValue?: AnswerValueTypes;
  variableValueToSet: string;
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
}
export interface VariableToSet {
  variableType: VariableToSetType | string;
  variableName: string;
  variableValue: {
    [key: string]: VariableValueLogic[];
  };
}

type QuestionCodeReferenceType = {
  displayString: string;
  codeNumber: string;
};

interface QuestionBaseData {
  questionText: string;
  questionCodeReference?: QuestionCodeReferenceType;
  possibleAnswers: PossibleAnswer[];
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
  walkthroughItemType: string
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
  [VariableToSetPropertyName]: VariableToSet;
  nextNavigationLogic: NextNavigationLogic[];
}

export interface ResultData {
  needsAnswerValue?: boolean;
  resultDisplayMessage: string;
}

interface SectionData {
  sectionTitle: string;
  sectionQuestions: string[];
}

export interface WalkthroughInfo {
  title: string;
  subtitle: string;
  description: string;
  startingSectionId: StartingSectionIdType;
}

export type StartingSectionIdType = string;
export type QuestionDisplayData =
  | QuestionMultipleChoiceData
  | QuestionMultipleChoiceSelectMultipleData;
export interface WalkthroughJSONType {
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

export const WalkthroughJSONData: Record<string, WalkthroughJSONType> = {
  "9.9.9": testCase999,
};

export default function useWalkthroughData({
  id,
}: UseWalkthroughDataProps): WalkthroughJSONType {
  if (!id) {
    throw new Error("No id provided");
  }

  const data = WalkthroughJSONData[id];
  if (!data) {
    throw new Error(`No data found for walkthrough ${id}`);
  }

  return data;
}
