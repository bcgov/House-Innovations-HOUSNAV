// repo
import {
  VariableToSet,
  VariableToSetType,
  VariableValueLogicType,
} from "@repo/data/useWalkthroughData";
// local
import { AnswerToCheckValueFn, AnswerTypes } from "../../stores/AnswerStore";
import { isArray, isObject, isString } from "../typeChecking";
// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./variableItem";

export const getVariableItemValue = (
  variableToSet: VariableToSet,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): AnswerTypes => {
  if (variableToSet.variableType === VariableToSetType.Object) {
    return ThisModule.getVariableItemValueObject(
      variableToSet,
      getAnswerToCheckValue,
    );
  }

  throw new Error("Invalid variableType");
};

export const getVariableItemValueObject = (
  variableToSet: VariableToSet,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): Record<string, string> => {
  const newObjectVariable: Record<string, string> = {};

  Object.entries(variableToSet.variableValue).forEach(
    ([key, variableValueLogic]) => {
      for (const variableValueLogicItem of variableValueLogic) {
        // if fallback item is found, set value to fallback item
        // paradigms dictate that the fallback item should be the last item in the array
        if (
          variableValueLogicItem.variableValueLogicType ===
          VariableValueLogicType.Fallback
        ) {
          newObjectVariable[key] = variableValueLogicItem.variableValueToSet;
          break;
        }

        if (variableValueLogicItem.answerToCheck === undefined) continue;

        const answerToCheckValue = getAnswerToCheckValue(
          variableValueLogicItem.answerToCheck,
        );

        if (
          variableValueLogicItem.variableValueLogicType ===
          VariableValueLogicType.Equals
        ) {
          if (
            answerToCheckValue &&
            isString(answerToCheckValue) &&
            answerToCheckValue === variableValueLogicItem.answerValue
          ) {
            newObjectVariable[key] = variableValueLogicItem.variableValueToSet;
            break;
          }
          if (
            answerToCheckValue === undefined &&
            variableValueLogicItem.answerValue === "undefined"
          ) {
            break;
          }
        }
      }
    },
  );

  return newObjectVariable;
};

export const answerValuesAreNotEqual = (
  newAnswerValue: AnswerTypes,
  currentAnswerValue: AnswerTypes,
): boolean => {
  if (isArray(newAnswerValue) && isArray(currentAnswerValue)) {
    return !newAnswerValue.every((value) => currentAnswerValue.includes(value));
  } else if (isString(newAnswerValue) && isString(currentAnswerValue)) {
    return newAnswerValue !== currentAnswerValue;
  } else if (isObject(newAnswerValue) && isObject(currentAnswerValue)) {
    return !Object.entries(newAnswerValue).every(
      ([key, value]) => currentAnswerValue[key] === value,
    );
  }

  throw new Error("Invalid types");
};
