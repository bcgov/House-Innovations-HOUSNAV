import testCase999 from "../json/9.9.9.json";
import testCase91014 from "../json/9.10.14.json";
import {
  QuestionDisplayData,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
  QuestionNumberFloatData,
  QuestionVariableData,
  ResultData,
  WalkthroughItemTypeMultiChoice,
  WalkthroughItemTypeMultiChoiceMultiple,
  WalkthroughItemTypeNumberFloat,
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

export function getNumberFloatQuestion() {
  // find the first question that is a number float question
  const questions: {
    [key: string]: QuestionDisplayData | QuestionVariableData;
  } = testCase91014.questions;
  const questionKey = Object.keys(questions).find((questionId) => {
    const question = questions[questionId] as QuestionDisplayData;
    return question.walkthroughItemType === WalkthroughItemTypeNumberFloat;
  });

  if (!questionKey || !questions[questionKey]) {
    throw new Error("No numberFloat question info");
  }

  return {
    questionKey,
    questionData: questions[questionKey] as QuestionNumberFloatData,
  };
}

export function getFirstResult() {
  // find the first result
  const results: {
    [key: string]: ResultData;
  } = testCase999.results;
  const resultKey = Object.keys(results)[0];

  if (!resultKey || !results[resultKey]) {
    throw new Error("No result info");
  }

  return {
    resultKey,
    resultData: results[resultKey] as ResultData,
  };
}

export default function useWalkthroughTestData() {
  // deep clone and return test data
  const testData = JSON.parse(JSON.stringify(testCase999));
  return testData as WalkthroughJSONType;
}
