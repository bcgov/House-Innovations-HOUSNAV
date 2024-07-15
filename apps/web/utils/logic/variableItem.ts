// repo
import {
  VariableToSet,
  VariableToSetType,
  VariableValueLogic,
  VariableValueLogicType,
  VariableValuesToCheckType,
  VariableValueType,
} from "@repo/data/useWalkthroughData";
// local
import { AnswerToCheckValueFn, AnswerTypes } from "../../stores/AnswerStore";
import { isArray, isNumber, isString } from "../typeChecking";
import {
  logicTypeContainsOnly,
  logicTypeEqual,
  logicTypeGreaterThan,
  logicTypeLessThan,
} from "./sharedLogic";
import { calculateVariableValueToSet } from "../calculations";
// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./variableItem";

export const getVariableItemValue = (
  variableToSet: VariableToSet,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): AnswerTypes => {
  switch (variableToSet.variableType) {
    case VariableToSetType.Copy:
      return ThisModule.getVariableCopy(variableToSet, getAnswerToCheckValue);
    case VariableToSetType.Object:
      return ThisModule.getVariableItemValueObject(
        variableToSet.variableValue,
        getAnswerToCheckValue,
      );
    case VariableToSetType.Number:
      return ThisModule.getVariableItemValueNumber(
        variableToSet.variableValue,
        getAnswerToCheckValue,
      );
  }

  throw new Error("Invalid variableType");
};

export const getVariableCopy = (
  variableToSet: VariableToSet,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): AnswerTypes => {
  if (isString(variableToSet.variableValue)) {
    const answerToCheckValue = getAnswerToCheckValue(
      variableToSet.variableValue,
    );

    if (answerToCheckValue) {
      return answerToCheckValue;
    }
  }

  throw new Error(
    "getVariableCopy: variableValue must be a string and return an answer.",
  );
};

export const getVariableItemValueObject = (
  variableValue: VariableValueType,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): Record<string, string> => {
  const newObjectVariable: Record<string, string> = {};

  Object.entries(variableValue).forEach(([key, variableValueLogic]) => {
    for (const variableValueLogicItem of variableValueLogic) {
      // if fallback item is found, set value to fallback item
      // paradigms dictate that the fallback item should be the last item in the array
      if (
        variableValueLogicItem.variableValueLogicType ===
          VariableValueLogicType.Fallback &&
        variableValueLogicItem.variableValueToSet
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
          VariableValueLogicType.Equals &&
        variableValueLogicItem.variableValueToSet
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
  });

  return newObjectVariable;
};

export const getVariableItemValueNumber = (
  variableValue: VariableValueType,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): number => {
  if (isNumber(variableValue)) return variableValue;

  if (isArray(variableValue)) {
    for (const variableValueLogicItem of variableValue) {
      if (
        ThisModule.variableValueLogicItemIsTrue(
          variableValueLogicItem,
          getAnswerToCheckValue,
        )
      ) {
        if (variableValueLogicItem.variableValueToSetCalculation) {
          const answerToUseValue = getAnswerToCheckValue(
            variableValueLogicItem.variableValueToSetCalculation.answerToUse,
          );

          if (answerToUseValue && isNumber(answerToUseValue)) {
            return calculateVariableValueToSet(
              answerToUseValue,
              variableValueLogicItem.variableValueToSetCalculation,
            );
          }

          throw new Error(
            "variableValueToSetCalculation: No answerToUseValue found, or it was not a number.",
          );
        }
        if (isNumber(variableValueLogicItem.variableValueToSet)) {
          return variableValueLogicItem.variableValueToSet;
        }

        throw new Error(
          "variableValueLogicItem: must have variableValueToSetCalculation or variableValueToSet as a number.",
        );
      }
    }
  }

  throw new Error(
    `getVariableItemValueString: variableValue must be a number, or array, got ${typeof variableValue}`,
  );
};

export const variableValueLogicItemIsTrue = (
  variableValueLogicItem: VariableValueLogic,
  getAnswerToCheckValue: AnswerToCheckValueFn,
) => {
  // if fallback item is found, set variableValue to fallback item
  // paradigms dictate that the fallback item should be the last item in the array
  if (
    variableValueLogicItem.variableValueLogicType ===
    VariableValueLogicType.Fallback
  ) {
    return true;
  }

  if (variableValueLogicItem.valuesToCheck) {
    /*
     * NOTE: This logic is only for and/or logic
     * there is no support for other types of logic in this section currently
     */
    switch (variableValueLogicItem.variableValueLogicType) {
      case VariableValueLogicType.Or:
        return ThisModule.variableLogicTypeOr(
          variableValueLogicItem.valuesToCheck,
          getAnswerToCheckValue,
        );
      case VariableValueLogicType.And:
        return ThisModule.variableLogicTypeAnd(
          variableValueLogicItem.valuesToCheck,
          getAnswerToCheckValue,
        );
    }

    throw new Error(
      `variableLogicType ${variableValueLogicItem.variableValueLogicType} is not supported for valuesToCheck property.`,
    );
  } else if (variableValueLogicItem.answerToCheck) {
    const answerToCheckValue = getAnswerToCheckValue(
      variableValueLogicItem.answerToCheck,
    );

    if (answerToCheckValue) {
      if (variableValueLogicItem.answerValue) {
        /*
         * NOTE: This logic is only for single answerValue strings
         * there is no support for multiple answers to check in this section
         */
        switch (variableValueLogicItem.variableValueLogicType) {
          case VariableValueLogicType.Equals:
            return logicTypeEqual(
              answerToCheckValue,
              variableValueLogicItem.answerValue,
            );
          case VariableValueLogicType.LessThan:
            return logicTypeLessThan(
              answerToCheckValue,
              variableValueLogicItem.answerValue,
            );
          case VariableValueLogicType.GreaterThan:
            return logicTypeGreaterThan(
              answerToCheckValue,
              variableValueLogicItem.answerValue,
            );
        }

        throw new Error(
          `variableLogicType ${variableValueLogicItem.variableValueLogicType} is not supported when answerToCheckValue exists and property answerValue exists.`,
        );
      } else if (variableValueLogicItem.answerValues) {
        /*
         * NOTE: This logic is only for answerValues arrays only
         */
        switch (variableValueLogicItem.variableValueLogicType) {
          case VariableValueLogicType.ContainsOnly:
            return logicTypeContainsOnly(
              answerToCheckValue,
              variableValueLogicItem.answerValues,
            );
        }

        throw new Error(
          `variableLogicType ${variableValueLogicItem.variableValueLogicType} is not supported when answerToCheckValue exists and property answerValues exists.`,
        );
      }
    } else {
      /*
       * NOTE: This logic is only for single answerValue strings when answerToCheckValue is undefined
       * there is no support for multiple answers to check in this section
       */
      if (variableValueLogicItem.answerValue) {
        switch (variableValueLogicItem.variableValueLogicType) {
          case VariableValueLogicType.Equals:
            return logicTypeEqual(
              answerToCheckValue,
              variableValueLogicItem.answerValue,
            );
          case VariableValueLogicType.LessThan:
            return logicTypeLessThan(
              answerToCheckValue,
              variableValueLogicItem.answerValue,
            );
        }

        throw new Error(
          `variableLogicType ${variableValueLogicItem.variableValueLogicType} is not supported when answerToCheckValue is undefined and property answerValue exists.`,
        );
      }

      throw new Error(
        "when answerToCheckValue is undefined, answerValue must exist, there is no case for answerValues.",
      );
    }
  }

  throw new Error(
    "variableValueLogicItem must contain either valuesToCheck or answerToCheck",
  );
};

export const variableLogicTypeOr = (
  valuesToCheck: VariableValuesToCheckType[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
): boolean => {
  // loop through valuesToCheck to see if any are true
  return valuesToCheck.some((valueToCheck) => {
    return ThisModule.variableValueLogicItemIsTrue(
      valueToCheck,
      getAnswerToCheckValue,
    );
  });
};

export const variableLogicTypeAnd = (
  valuesToCheck: VariableValuesToCheckType[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
): boolean => {
  // loop through valuesToCheck to see if all are true
  return valuesToCheck.every((valueToCheck) => {
    return ThisModule.variableValueLogicItemIsTrue(
      valueToCheck,
      getAnswerToCheckValue,
    );
  });
};
