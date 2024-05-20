import testCase999 from "../walkthroughes/9.9.9.json";
import {
  QuestionData,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
  WalkthroughItemTypeMultiChoice,
  WalkthroughItemTypeMultiChoiceMultiple,
} from "./useWalkthroughData";

export function getMultiChoiceQuestion() {
  // find the first question that is a multi-choice question
  const questions: { [key: string]: QuestionData } = testCase999.questions;
  const questionKey = Object.keys(questions).find((questionId) => {
    const question = questions[questionId] as QuestionData;
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

export function getMultiChoiceMultipleQuestion() {
  // find the first question that is a multi-choice multiple question
  const questions: { [key: string]: QuestionData } = testCase999.questions;
  const questionKey = Object.keys(questions).find((questionId) => {
    const question = questions[questionId] as QuestionData;
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
  return testCase999;
}
