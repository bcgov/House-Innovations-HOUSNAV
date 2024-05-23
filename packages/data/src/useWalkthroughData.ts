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
  answerValue: AnswerValueTypes;
}

interface NextNavigationLogic {
  nextLogicType: string;
  answerValue?: AnswerValueTypes;
  answerValues?: AnswerValueTypes[];
  nextNavigateTo: string;
}

interface InvalidAnswerLogic {
  invalidAnswerLogicType: string;
  invalidAnswerLogicValue: number;
}

interface PossibleInvalidAnswer {
  invalidAnswerType: string;
  answerValue: AnswerValueTypes;
  invalidAnswerLogic: InvalidAnswerLogic[];
  errorMessage: string;
}

interface QuestionBaseData {
  questionText: string;
  questionCodeReference?: string;
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

interface ResultData {
  needsAnswerValue?: boolean;
  resultDisplayMessage: string;
}

export type StartingQuestionId = string;
export type QuestionData =
  | QuestionMultipleChoiceData
  | QuestionMultipleChoiceSelectMultipleData;
export interface WalkthroughJSONType {
  info: {
    title: string;
    startingQuestionId: StartingQuestionId;
  };
  questions: {
    [key: string]: QuestionData;
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
