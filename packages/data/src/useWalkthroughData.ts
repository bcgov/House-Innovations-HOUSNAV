import testCase999 from "../walkthroughes/9.9.9.json";

type Walkthroughes = "9.9.9";

interface UseWalkthroughDataProps {
  /*
   * ID of the data to get
   */
  id: Walkthroughes;
}

type AnswerValueTypes = string | boolean;

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

const WalkthroughItemTypeMultiChoice = "multiChoice";
export const isWalkthroughItemTypeMultiChoice = (walkthroughItemType: string) =>
  walkthroughItemType === WalkthroughItemTypeMultiChoice;
export interface QuestionMultipleChoice {
  walkthroughItemType: typeof WalkthroughItemTypeMultiChoice | string;
  questionText: string;
  possibleAnswers: PossibleAnswer[];
  nextNavigationLogic: NextNavigationLogic[];
}

const WalkthroughItemTypeMultiChoiceMultiple = "multiChoiceMultiple";
export const isWalkthroughItemTypeMultiChoiceMultiple = (
  walkthroughItemType: string,
) => walkthroughItemType === WalkthroughItemTypeMultiChoiceMultiple;
export interface QuestionMultipleChoiceSelectMultiple {
  walkthroughItemType: typeof WalkthroughItemTypeMultiChoiceMultiple | string;
  questionText: string;
  possibleAnswers: PossibleAnswer[];
  possibleInvalidAnswers: PossibleInvalidAnswer[];
  nextNavigationLogic: NextNavigationLogic[];
}

const WalkthroughItemTypeBoolean = "boolean";
export const isWalkthroughItemTypeBoolean = (walkthroughItemType: string) =>
  walkthroughItemType === WalkthroughItemTypeBoolean;
export interface QuestionBoolean {
  walkthroughItemType: typeof WalkthroughItemTypeBoolean | string;
  questionText: string;
  possibleAnswers: PossibleAnswer[];
  nextNavigationLogic: NextNavigationLogic[];
}

interface Result {
  needsAnswerValue?: boolean;
  resultDisplayMessage: string;
}

interface WalkthroughJSONType {
  info: {
    title: string;
    startingQuestionId: string;
  };
  questions: {
    [key: string]:
      | QuestionMultipleChoice
      | QuestionMultipleChoiceSelectMultiple
      | QuestionBoolean;
  };
  results: {
    [key: string]: Result;
  };
}

const WalkthroughJSONData: Record<Walkthroughes, WalkthroughJSONType> = {
  "9.9.9": testCase999,
};

export default function useWalkthroughData({ id }: UseWalkthroughDataProps) {
  return WalkthroughJSONData[id];
}
