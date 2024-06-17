// repo
import {
  PossibleAnswer,
  ShowAnswerIfLogicType,
} from "@repo/data/useWalkthroughData";
// local
import { AnswerTypes, AnswerToCheckValueFn } from "../../stores/AnswerStore";
import { isArray, isString } from "../typeChecking";
// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./showAnswer";

export const getPossibleAnswers = (
  possibleAnswers: PossibleAnswer[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
) => {
  return possibleAnswers.filter((possibleAnswer) => {
    // if no showAnswerIf property or it's equal to true, show answer
    // showAnswerIf will never just be false, even thought it's a boolean
    // this is because the difference in types between TypeScript and the JSON data
    if (!possibleAnswer.showAnswerIf || possibleAnswer.showAnswerIf === true)
      return true;

    return possibleAnswer.showAnswerIf.some((showAnswerIf) => {
      const answerToCheck = getAnswerToCheckValue(showAnswerIf.answerToCheck);
      if (!answerToCheck) return false;

      switch (showAnswerIf.showAnswerLogicType) {
        case ShowAnswerIfLogicType.Equals:
          return ThisModule.showAnswerTypeEquals(
            answerToCheck,
            showAnswerIf.answerValue,
          );
        case ShowAnswerIfLogicType.GreaterThan:
          return ThisModule.showAnswerTypeGreaterThan(
            answerToCheck,
            showAnswerIf.answerValue,
          );
      }

      throw new Error(
        `getPossibleAnswers: showAnswerLogicType not recognized: ${showAnswerIf.showAnswerLogicType}`,
      );
    });
  });
};

export const showAnswerTypeEquals = (
  answerToCheck: AnswerTypes,
  answerValue: string,
) => {
  if (isArray(answerToCheck)) {
    return answerToCheck.includes(answerValue) && answerToCheck.length === 1;
  }
  if (isString(answerToCheck)) {
    return answerToCheck === answerValue;
  }
  throw new Error(
    `showAnswerTypeEquals: answerToCheck must be a string or array, got ${typeof answerToCheck}`,
  );
};

export const showAnswerTypeGreaterThan = (
  answerToCheck: AnswerTypes,
  answerValue: string,
) => {
  if (!isString(answerToCheck)) {
    throw new Error(
      `showAnswerTypeGreaterThan: answerToCheck must be a string, got ${typeof answerToCheck}`,
    );
  }
  return answerToCheck > answerValue;
};
