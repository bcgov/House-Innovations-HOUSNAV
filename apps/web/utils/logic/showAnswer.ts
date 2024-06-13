// repo
import { PossibleAnswer } from "@repo/data/useWalkthroughData";
// local
import { AnswerTypes, AnswerToCheckValueFn } from "../../stores/AnswerStore";
import { isArray } from "../typeChecking";

export const getPossibleAnswers = (
  possibleAnswers: PossibleAnswer[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
) => {
  return possibleAnswers.filter((possibleAnswer) => {
    if (!possibleAnswer.showAnswerIf) return true;

    // if showAnswerIf is equal to true, show answer
    if (possibleAnswer.showAnswerIf === true) return true;

    // cycle through showAnswerIf and check by showAnswerLogicType
    return possibleAnswer.showAnswerIf.some((showAnswerIf) => {
      // setup vars to check
      const answerToCheck = getAnswerToCheckValue(showAnswerIf.answerToCheck);

      // check if answerToCheck exists
      if (!answerToCheck) return false;

      // check witch showAnswerLogicType to use
      switch (showAnswerIf.showAnswerLogicType) {
        case "equals":
          return showAnswerTypeEquals(answerToCheck, showAnswerIf.answerValue);
        case "greaterThan":
          return showAnswerTypeGreaterThan(
            answerToCheck,
            showAnswerIf.answerValue,
          );
      }

      return false;
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
  } else {
    // check if answerToCheck value is equal to answerValue
    if (answerToCheck === answerValue) {
      showAnswer = true;
    }
  }

  return showAnswer;
};

export const showAnswerTypeGreaterThan = (
  answerToCheck: AnswerTypes,
  answerValue: string,
) => {
  // setup showAnswer variable
  let showAnswer = false;

  // check if answerToCheck is greater than answerValue
  if (answerToCheck > answerValue) {
    showAnswer = true;
  }

  return showAnswer;
};
