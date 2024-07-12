// local
import { AnswerTypes } from "../../stores/AnswerStore";
import { isArray, isNumber, isString } from "../typeChecking";

export const logicTypeContainsOnly = (
  answerToCheckValue: AnswerTypes,
  answerValues: string[],
) => {
  if (isArray(answerToCheckValue)) {
    return answerToCheckValue.every((answer) => answerValues.includes(answer));
  }
  throw new Error(
    `logicTypeContainsOnly: answerToCheckValue must be an array, got ${typeof answerToCheckValue}`,
  );
};

export const logicTypeEqual = (
  answerToCheckValue: AnswerTypes | undefined,
  answerValue: string,
) => {
  if (isNumber(answerToCheckValue)) {
    return answerToCheckValue === parseFloat(answerValue);
  }
  if (isArray(answerToCheckValue)) {
    return (
      answerToCheckValue.includes(answerValue) &&
      answerToCheckValue.length === 1
    );
  }
  if (isString(answerToCheckValue)) {
    return answerToCheckValue === answerValue;
  }
  if (answerToCheckValue === undefined) {
    return answerValue === "undefined";
  }
  throw new Error(
    `logicTypeEqual: answerToCheckValue must be a string, number, array, or undefined, got ${typeof answerToCheckValue}`,
  );
};

export const logicTypeLessThan = (
  answerToCheckValue: AnswerTypes | undefined,
  answerValue: string,
) => {
  if (isString(answerToCheckValue)) {
    return answerToCheckValue < answerValue;
  }
  if (isNumber(answerToCheckValue)) {
    return answerToCheckValue < parseFloat(answerValue);
  }
  if (answerToCheckValue === undefined) {
    return true;
  }
  throw new Error(
    `logicTypeLessThan: answerToCheckValue must be a string, number, or undefined, got ${typeof answerToCheckValue}`,
  );
};

export const logicTypeGreaterThan = (
  answerToCheckValue: AnswerTypes | undefined,
  answerValue: string,
) => {
  if (isString(answerToCheckValue)) {
    return answerToCheckValue > answerValue;
  }
  if (isNumber(answerToCheckValue)) {
    return answerToCheckValue > parseFloat(answerValue);
  }
  throw new Error(
    `logicTypeGreaterThan: answerToCheckValue must be a string, or number, got ${typeof answerToCheckValue}`,
  );
};
