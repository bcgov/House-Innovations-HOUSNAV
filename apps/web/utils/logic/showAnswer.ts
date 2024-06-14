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
    if (!possibleAnswer.showAnswerIf || possibleAnswer.showAnswerIf === true)
      return true;

    // cycle through showAnswerIf and check by showAnswerLogicType
    return possibleAnswer.showAnswerIf.some((showAnswerIf) => {
      // setup vars to check
      const answerToCheck = getAnswerToCheckValue(showAnswerIf.answerToCheck);

      // check if answerToCheck exists
      if (!answerToCheck) return false;

      // check witch showAnswerLogicType to use
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

      // if showAnswerLogicType is not recognized, throw an error
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
  // setup showAnswer variable
  let showAnswer = false;

  // check answerToCheck type
  if (isArray(answerToCheck)) {
    // check if answerToCheck only has answerValue
    if (answerToCheck.includes(answerValue) && answerToCheck.length === 1) {
      showAnswer = true;
    }
  } else if (isString(answerToCheck)) {
    // check if answerToCheck value is equal to answerValue
    if (answerToCheck === answerValue) {
      showAnswer = true;
    }
  } else {
    // if answerToCheck is not an array or string, throw an error
    throw new Error(
      `showAnswerTypeEquals: answerToCheck must be a string or array, got ${typeof answerToCheck}`,
    );
  }

  return showAnswer;
};

export const showAnswerTypeGreaterThan = (
  answerToCheck: AnswerTypes,
  answerValue: string,
) => {
  // if answer to check isn't a string, throw an error
  if (!isString(answerToCheck)) {
    throw new Error(
      `showAnswerTypeGreaterThan: answerToCheck must be a string, got ${typeof answerToCheck}`,
    );
  }
  // Return true if answerToCheck is greater than answerValue, otherwise false
  return answerToCheck > answerValue;
};
