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
      const answerToCheckValue = getAnswerToCheckValue(
        showAnswerIf.answerToCheck,
      );
      if (!answerToCheckValue) return false;

      switch (showAnswerIf.showAnswerLogicType) {
        case ShowAnswerIfLogicType.Equals:
          return ThisModule.showAnswerTypeEquals(
            answerToCheckValue,
            showAnswerIf.answerValue,
          );
        case ShowAnswerIfLogicType.GreaterThan:
          return ThisModule.showAnswerTypeGreaterThan(
            answerToCheckValue,
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
  answerToCheckValue: AnswerTypes,
  answerValue: string,
) => {
  if (isArray(answerToCheckValue)) {
    return (
      answerToCheckValue.includes(answerValue) &&
      answerToCheckValue.length === 1
    );
  }
  if (isString(answerToCheckValue)) {
    return answerToCheckValue === answerValue;
  }
  throw new Error(
    `showAnswerTypeEquals: answerToCheckValue must be a string or array, got ${typeof answerToCheckValue}`,
  );
};

export const showAnswerTypeGreaterThan = (
  answerToCheckValue: AnswerTypes,
  answerValue: string,
) => {
  if (!isString(answerToCheckValue)) {
    throw new Error(
      `showAnswerTypeGreaterThan: answerToCheckValue must be a string, got ${typeof answerToCheckValue}`,
    );
  }
  return answerToCheckValue > answerValue;
};
