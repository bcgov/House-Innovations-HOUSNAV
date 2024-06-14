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
  // check variableType
  if (variableToSet.variableType === VariableToSetType.Object) {
    return ThisModule.getVariableItemValueObject(
      variableToSet,
      getAnswerToCheckValue,
    );
  }

  // throw error if variableType is not valid
  throw new Error("Invalid variableType");
};

export const getVariableItemValueObject = (
  variableToSet: VariableToSet,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): Record<string, string> => {
  // create new object variable
  const newObjectVariable: Record<string, string> = {};

  // cycle through variableValue object by keys
  Object.entries(variableToSet.variableValue).forEach(
    ([key, variableValueLogic]) => {
      let valueHasBeenSet = false;

      // cycle through variableValueLogic array
      for (const variableValueLogicItem of variableValueLogic) {
        // if fallback item is found, set value to fallback item
        // paradigms dictate that the fallback item should be the last item in the array
        if (
          variableValueLogicItem.variableValueLogicType ===
          VariableValueLogicType.Fallback
        ) {
          valueHasBeenSet = true;
          newObjectVariable[key] = variableValueLogicItem.variableValueToSet;
        }

        // check if variableValueLogicItem.answerToCheck exists
        if (variableValueLogicItem.answerToCheck === undefined) continue;

        // get answerToCheck value
        const answerToCheckValue = getAnswerToCheckValue(
          variableValueLogicItem.answerToCheck,
        );

        // check witch variableValueLogicType to use
        switch (variableValueLogicItem.variableValueLogicType) {
          case VariableValueLogicType.Equals:
            // check if answerToCheckValue is a string
            if (answerToCheckValue && isString(answerToCheckValue)) {
              // check if answerToCheckValue is equal to answerValue
              if (answerToCheckValue === variableValueLogicItem.answerValue) {
                valueHasBeenSet = true;
                newObjectVariable[key] =
                  variableValueLogicItem.variableValueToSet;
              }
            } else if (
              answerToCheckValue === undefined &&
              variableValueLogicItem.answerValue === "undefined"
            ) {
              valueHasBeenSet = true;
            }
            break;
        }

        // check if value has been set, if so break out of loop
        if (valueHasBeenSet) break;
      }
    },
  );

  return newObjectVariable;
};

export const answerValuesAreNotEqual = (
  newAnswerValue: AnswerTypes,
  currentAnswerValue: AnswerTypes,
): boolean => {
  // check if they are arrays
  if (isArray(newAnswerValue) && isArray(currentAnswerValue)) {
    // check if newAnswerValue and currentAnswerValue are not equal
    return !newAnswerValue.every((value) => currentAnswerValue.includes(value));
  } else if (isString(newAnswerValue) && isString(currentAnswerValue)) {
    // check if newAnswerValue and currentAnswerValue are not equal
    return newAnswerValue !== currentAnswerValue;
  } else if (isObject(newAnswerValue) && isObject(currentAnswerValue)) {
    // verify object keys and values are the same
    return !Object.entries(newAnswerValue).every(
      ([key, value]) => currentAnswerValue[key] === value,
    );
  }

  // throw error if types are not valid
  throw new Error("Invalid types");
};
