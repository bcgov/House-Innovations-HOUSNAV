import testCase999 from "../walkthroughs/9.9.9.json";

type Walkthroughs = "9.9.9";

interface UseWalkthroughDataProps {
  /*
   * ID of the data to get
   */
  id: string;
}

export type AnswerValueTypes = string;

interface PossibleAnswer {
  answerDisplayText: string;
  answerValueDisplay?: string;
  answerValue: AnswerValueTypes;
}

export interface NextNavigationLogic {
  nextLogicType: string;
  answerToCheck?: string;
  answerValue?: AnswerValueTypes;
  answerValues?: AnswerValueTypes[];
  valuesToCheck?: NextNavigationLogic[];
  nextNavigateTo?: string;
}

interface VariableValueLogic {
  variableValueLogicType: string;
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

interface VariableToSet {
  variableType: string;
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
  walkthroughItemType: string,
) => walkthroughItemType === WalkthroughItemTypeMultiChoiceMultiple;
export interface QuestionMultipleChoiceSelectMultipleData
  extends QuestionBaseData {
  walkthroughItemType: typeof WalkthroughItemTypeMultiChoiceMultiple | string;
  possibleInvalidAnswers: PossibleInvalidAnswer[];
}

export const WalkthroughItemTypeVariable = "variable";
export const isWalkthroughItemTypeVariable = (walkthroughItemType: string) =>
  walkthroughItemType === WalkthroughItemTypeVariable;
export interface QuestionVariableData {
  walkthroughItemType: typeof WalkthroughItemTypeVariable | string;
  variableToSet: VariableToSet;
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

export type StartingSectionIdType = string;
export type QuestionDisplayData =
  | QuestionMultipleChoiceData
  | QuestionMultipleChoiceSelectMultipleData;
export interface WalkthroughJSONType {
  info: {
    title: string;
    startingSectionId: StartingSectionIdType;
  };
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

const WalkthroughJSONData: Record<Walkthroughs, WalkthroughJSONType> = {
  "9.9.9": testCase999,
};

export default function useWalkthroughData({ id }: UseWalkthroughDataProps) {
  // check if passed id is a key in WalkthroughJSONData
  if (!Object.prototype.hasOwnProperty.call(WalkthroughJSONData, id)) {
    throw new Error(`No data found for walkthrough ${id}`);
  } else {
    return WalkthroughJSONData[id as Walkthroughs];
  }
}
