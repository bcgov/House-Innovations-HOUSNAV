// repo
import {
  PossibleInvalidAnswer,
  InvalidAnswerLogic,
} from "@repo/data/useWalkthroughsData";
// local
import { AnswerTypes } from "../../stores/AnswerStore";
import { isArray } from "../typeChecking";
// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./possibleInvalidAnswers";

export const isValidAnswerOrErrorMessage = (
  currentAnswer: AnswerTypes,
  possibleInvalidAnswers: PossibleInvalidAnswer[],
): true | string => {
  // default to valid answer
  const validAnswerOrErrorMessage: true | string = true;

  // cycle through possible invalid answers
  for (const possibleInvalidAnswer of possibleInvalidAnswers) {
    switch (possibleInvalidAnswer.invalidAnswerType) {
      case "contains":
        // invalidAnswerType contains
        // check if the answer contains the invalid answer to check
        if (
          isArray(currentAnswer) &&
          currentAnswer.includes(possibleInvalidAnswer.answerValue)
        ) {
          // cycle through invalidAnswerLogic
          const isValidAnswer = ThisModule.checkInvalidAnswerLogic(
            currentAnswer,
            possibleInvalidAnswer.invalidAnswerLogic,
          );

          // if the answer is invalid, return the error message
          if (!isValidAnswer) {
            return possibleInvalidAnswer.errorMessage;
          }
        }
        break;
    }
  }

  return validAnswerOrErrorMessage;
};

export const checkInvalidAnswerLogic = (
  currentAnswer: AnswerTypes,
  invalidAnswerLogic: InvalidAnswerLogic[],
) => {
  // default to valid answer
  let validAnswer = true;

  // cycle through invalidAnswerLogic
  for (const invalidAnswerLogicItem of invalidAnswerLogic) {
    switch (invalidAnswerLogicItem.invalidAnswerLogicType) {
      case "maxNumberOfAnswers":
        // invalidAnswerLogicType maxNumberOfAnswers
        // check if the answer is more than the max number of answers
        if (
          isArray(currentAnswer) &&
          currentAnswer.length > invalidAnswerLogicItem.invalidAnswerLogicValue
        ) {
          validAnswer = false;
        }
        break;
    }
  }

  return validAnswer;
};
