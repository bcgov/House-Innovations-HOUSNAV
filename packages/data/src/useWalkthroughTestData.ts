import testCase999 from "../json/9.9.9.json";
import {
  QuestionDisplayData,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
  QuestionVariableData,
  WalkthroughItemTypeMultiChoice,
  WalkthroughItemTypeMultiChoiceMultiple,
  WalkthroughJSONType,
} from "./useWalkthroughData";

export function getMultiChoiceQuestion() {
  // find the first question that is a multi-choice question
  const questions: {
    [key: string]: QuestionDisplayData | QuestionVariableData;
  } = testCase999.questions;
  const questionKey = Object.keys(questions).find((questionId) => {
    const question = questions[questionId] as QuestionDisplayData;
    return question.walkthroughItemType === WalkthroughItemTypeMultiChoice;
  });

  if (!questionKey || !questions[questionKey]) {
    throw new Error("No multiChoice question info");
  }

  return {
    questionKey,
    questionData: questions[questionKey] as QuestionMultipleChoiceData,
  };
}

export function getQuestion(questionId: string) {
  // find the question for the given questionId
  const questions: {
    [key: string]: QuestionDisplayData | QuestionVariableData;
  } = testCase999.questions;
  const question = questions[questionId] as QuestionDisplayData;

  if (!question) {
    throw new Error("No question info");
  }

  return {
    questionKey: questionId,
    questionData: question,
  };
}

export function getMultiChoiceMultipleQuestion() {
  // find the first question that is a multi-choice multiple question
  const questions: {
    [key: string]: QuestionDisplayData | QuestionVariableData;
  } = testCase999.questions;
  const questionKey = Object.keys(questions).find((questionId) => {
    const question = questions[questionId] as QuestionDisplayData;
    return (
      question.walkthroughItemType === WalkthroughItemTypeMultiChoiceMultiple
    );
  });

  if (!questionKey || !questions[questionKey]) {
    throw new Error("No multiChoiceMultiple question info");
  }

  return {
    questionKey,
    questionData: questions[
      questionKey
    ] as QuestionMultipleChoiceSelectMultipleData,
  };
}

export default function useWalkthroughTestData() {
  // deep clone and return test data
  const testData = JSON.parse(JSON.stringify(testCase999));
  return testData as WalkthroughJSONType;
}
